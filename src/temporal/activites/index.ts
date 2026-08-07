import { regenerateHostSlots as runSlotGeneration,RegenerateHostSlotsInput } from "../../services/slot.service.js";

export async function regenerateHostSlotsActivity(input: RegenerateHostSlotsInput) {
    await runSlotGeneration(input); //calling slotservice function and this actvity should acts as proxy now for temporal
}