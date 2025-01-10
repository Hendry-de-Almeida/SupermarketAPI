import jwt from "jsonwebtoken";
import { User } from "../schemas/userSchema";
import { PrismaClient } from "@prisma/client";
import { FastifyRequest, FastifyReply } from "fastify";

const prisma = new PrismaClient();

export default function authMidleware(role: string) {
  return async (request: FastifyRequest, response: FastifyReply) => {
    try {
      const { authorization } = request.headers;

      if (!authorization) return response.status(401).send("Acesso negado.");
      const token = authorization?.split(" ")[1];

      const user = jwt.verify(token, process.env.JWT_SECRET || "") as User;

      request.user = user;

      if (request.user.role !== role)
        return response.status(403).send("Acesso negado.");
    } catch (error) {
      throw new Error("Acesso negado.");
    }
  };
}
