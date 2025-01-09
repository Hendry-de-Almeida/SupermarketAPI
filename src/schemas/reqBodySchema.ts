import { z } from 'zod';

const body = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
});
 
export type Body = z.infer<typeof body>;
