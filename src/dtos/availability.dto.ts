import { z } from "zod";

const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

export const createAvailabilityRuleBaseSchema = z.object({
    weekday: z.number().int().min(0).max(6),
    startTime: z.string().regex(timeRegex, "Start time must be in HH:MM format"),
    endTime: z.string().regex(timeRegex, "End time must be in HH:MM format"),
    isActive: z.boolean().default(true),
    timezone: z.string().default("UTC")
});

//custom rule start time < end time. So extendinmg BaseSchema with Refine method
export const createAvailabilityRuleSchema  = createAvailabilityRuleBaseSchema.refine(
    (rule) => rule.startTime < rule.endTime,
    {message: "Start time must be less than the End time"}
);

export const updateAvailabilityRuleSchema = createAvailabilityRuleBaseSchema.partial();

export type createAvailabilityRuleDto = z.infer<typeof createAvailabilityRuleSchema>;
export type updateAvailabilityRuleDto = z.infer<typeof updateAvailabilityRuleSchema>;

//custom rule for startTime and Endtime that should be available for non=-full day block.
// And  start time < end time. So extendinmg BaseSchema with superRefine method
//SuperEfine Methos adds the error mesages to the path specified(startime,endTime etc..)

export const createAvailabilityExceptionBaseSchema = z.object({
    date: z.string().regex(dateRegex,"Date must be in MMMM-YY-DD format"),
    type: z.enum(["BLOCK_FULL_DAY", "BLOCK_PARTIAL","Add_AVAILABILITY WINDOW"]),
    startTime: z.string().regex(timeRegex, "Start time must be in HH:MM format").optional(),
    endTime: z.string().regex(timeRegex, "End time must be in HH:MM format").optional(),
    timezone: z.string().default("UTC"),
    reason: z.string().min(0).max(500).optional()
});

export const createAvailabilityExceptionSchema = createAvailabilityExceptionBaseSchema.superRefine((data,ctx) => {
            if(data.type !== "BLOCK_FULL_DAY")
             {
                 if(!data.startTime)
                    ctx.addIssue({path: ['startTime'], code : "custom", message: "StartTime is required for Non-Full day Exception"})
                 if(!data.endTime)
                    ctx.addIssue({path: ['endTime'], code : "custom", message: "endime is required for Non-Full day Exception"})
                if(data.startTime && data.endTime && data.startTime >= data.endTime)
                    ctx.addIssue({path: ['endTime'], code : "custom", message: "StartTime should be before the End time"})
             }
});
                 

export const updateAvailabilityExceptionSchema = createAvailabilityExceptionBaseSchema.partial();

export type CreateAvailabilityExceptionDto = z.infer<typeof createAvailabilityExceptionSchema>;
export type updateAvailabilityExceptionDto = z.infer<typeof updateAvailabilityExceptionSchema>;