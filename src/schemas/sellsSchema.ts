import { z } from "zod";

const items = z.array(
  z.object({
    product: z.string(),
    price: z.number(),
    quantity: z.number().int(),
  })
);
const sells_list = z.object({
  id: z.string(),
  items: items,
  total: z.number(),
  registedAt: z.string(),
});

const created_sell = z.object({
  id: z.string(),
  sellerName: z.string(),
  total: z.number(),
  registedAt: z.string(),
});

export type SellsList = z.infer<typeof sells_list>;
export type CreatedSell = z.infer<typeof created_sell>;
