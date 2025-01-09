import { z } from 'zod';

const login = z.object({
  email: z.string().email(),
  password: z.string(),
});
 
export type LoginForm = z.infer<typeof login>;
