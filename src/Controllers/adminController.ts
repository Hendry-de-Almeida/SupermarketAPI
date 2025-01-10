import { Body } from "../schemas/reqBodySchema";
import { Params } from "../schemas/reqParamsSchema";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../utils/hashing";
import { FastifyRequest, FastifyReply } from "fastify";

const prisma = new PrismaClient();

export class Admin {
  async signAdmin(request: FastifyRequest, response: FastifyReply) {
    try {
      const { username, email, password } = request.body as Body;

      if (!username || !email || !password)
        return response
          .status(400)
          .send(
            "Preencha os campos username, email e password para prosseguir."
          );

      const userDB = await prisma.users.findUnique({
        where: {
          email: email,
        },
      });

      if (userDB)
        return response
          .status(401)
          .send("Não foi possivel cadastrar este usuário.");

      const hashedPassword = hashPassword(password);

      await prisma.users.create({
        data: {
          name: username,
          email: email,
          password: hashedPassword,
          role: "ADMIN",
        },
      });

      return response.status(201).send("Administrador criado com sucesso!");
    } catch (error) {
      throw new Error("Acesso negado.");
    }
  }

  async checkSellersList(request: FastifyRequest, response: FastifyReply) {
    try {
      const sellers = await prisma.users.findMany({
        where: {
          role: "SELLER",
        },
        select: {
          id: true,
          name: true,
          email: true,
          password: false,
          role: false,
        },
      });

      if (sellers.length == 0)
        return response.status(200).send("Sem balconistas registados");

      return response.status(200).send(sellers);
    } catch (error) {
      throw new Error("Erro de consulta.");
    }
  }

  async deleteSeller(request: FastifyRequest, response: FastifyReply) {
    try {
      const { id } = request.params as Params;

      const seller = await prisma.users.findUnique({
        where: {
          id: id,
        },
      });

      if (!seller)
        return response
          .status(404)
          .send("O usuário que quer deletar não existe.");

      await prisma.users.delete({
        where: {
          id: id,
        },
      });

      return response.status(200).send(`Balconista removido com sucesso`);
    } catch (error) {
      throw new Error("Erro ao deletar.");
    }
  }

  async createSeller(request: FastifyRequest, response: FastifyReply) {
    try {
      const { username, email, password } = request.body as Body;

      if (!username || !email || !password)
        return response
          .status(400)
          .send(
            "Preencha os campos username, email e password para cadastrar balconistas."
          );

      const userDB = await prisma.users.findUnique({
        where: {
          email: email,
        },
      });

      if (userDB)
        response.status(401).send("Não foi possivel cadastrar este usuário.");

      const hashedPassword = hashPassword(password);

      const created_seller = await prisma.users.create({
        data: {
          name: username,
          email: email,
          password: hashedPassword,
          role: "SELLER",
        },
        select: {
          id: true,
          name: true,
        },
      });

      response.status(201).send(created_seller);
    } catch (error) {
      throw new Error("Acesso negado.");
    }
  }
}
