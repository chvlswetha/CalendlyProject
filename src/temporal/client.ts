import { TEMPORAL_ENABLED, TEMPORAL_TASK_QUEUE } from "../config/env.js";
import { getTemporalClient } from "../config/temporal.js"

async function startWorkflow(
    workflowName: string,
    workflowId: string,
    args: unknown[]
){
    if(!TEMPORAL_ENABLED){
        console.warn('[temporal] Temporal is not enabled, skipping workflow start');
        return null;
    }

    try {
         const client = await Promise.race([
            getTemporalClient(),
            new Promise<never>((_,reject) => setTimeout(() => reject(new Error('Temproal Cleint Connection timeout')),5000)),
         ]);

         const handle = await client.workflow.start(workflowName, {
            taskQueue: TEMPORAL_TASK_QUEUE,
            workflowId,
            args,
    });

    return handle.workflowId;
         
    } catch (err){

        console.error(`[temporal] Error Starting Workflow: ${workflowName} with id: ${workflowId}, error: ${err}`);
        return null;
    }
}