import { z } from "zod";

const params = z.object({
  id: z.string().uuid(),
});

export type Params = z.infer<typeof params>
