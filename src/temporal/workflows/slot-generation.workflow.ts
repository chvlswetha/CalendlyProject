import { proxyActivities } from "@temporalio/workflow";
import type * as activites from "../activites/index.js";
import { RegenerateHostSlotsInput } from "../../services/slot.service.js";

//create proxy activities

const { regenerateHostSlotsActivity } = proxyActivities<typeof   activites>({
    retry: {maximumAttempts: 3},
    startToCloseTimeout: '10 minutes',
})

export async function regenerateHostSlotsWorkflow(input: RegenerateHostSlotsInput){
    await regenerateHostSlotsActivity(input);
}