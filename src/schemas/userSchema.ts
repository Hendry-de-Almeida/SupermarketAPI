import { z } from 'zod';

const user = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
});
 
export type User = z.infer<typeof user>;
