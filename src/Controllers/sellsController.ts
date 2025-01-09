import { PrismaClient } from "@prisma/client";
import { ItemsList } from "../schemas/itemsListSchema";
import { FastifyReply, FastifyRequest } from "fastify";
import { SellsList, CreatedSell } from "../schemas/sellsSchema";

const prisma = new PrismaClient();

export class Sells {
  async createSell(request: FastifyRequest, response: FastifyReply) {
    try {
      const { items } = request.body as ItemsList;

      if (items.length == 0)
        return response
          .status(400)
          .send("Precisa inserir itens para serem registados.");

      const total = items.reduce((acc, product) => {
        return acc + product.price * product.quantity;
      }, 0);

      const sell = await prisma.sells.create({
        data: {
          sellerID: request.user?.id,
          sellerName: request.user?.name,
          total: total,
          items: {
            create: items,
          },
        },
        select: {
          id: true,
          sellerName: true,
          total: true,
          registedAt: true,
        },
      });

      const created_sell: CreatedSell = {
        ...sell,
        registedAt: sell.registedAt.toLocaleString(),
      };

      return response.status(201).send(created_sell);
    } catch (error) {
      throw new Error("Erro na criação.");
    }
  }

  async viewSellsList(request: FastifyRequest, response: FastifyReply) {
    try {
      const sells = await prisma.sells.findMany({
        select: {
          id: true,
          items: {
            select: {
              product: true,
              quantity: true,
              price: true,
            },
          },
          total: true,
          registedAt: true,
        },
      });

      if (sells.length == 0)
        return response.status(200).send("Sem vendas registadas.");

      const sells_list: Array<SellsList> = sells.map(
        (sell): SellsList => ({
          ...sell,
          registedAt: sell.registedAt.toLocaleString(),
        })
      );

      return response.status(200).send(sells_list);
    } catch (error) {
      throw new Error("Erro de consulta.");
    }
  }
}
