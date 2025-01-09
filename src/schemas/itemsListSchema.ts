import { z } from 'zod';

const items = z.object({
  product: z.string(),
  price: z.number(),
  quantity: z.number().int(),
})

const items_list = z.object({
  items: z.array(items)
});
 
export type ItemsList = z.infer<typeof items_list>;
