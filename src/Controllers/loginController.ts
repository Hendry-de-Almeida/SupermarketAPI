import jwt from "jsonwebtoken";
import { User } from "../schemas/userSchema";
import { LoginForm } from "../schemas/loginSchema";
import { PrismaClient } from "@prisma/client";
import { comparePassword } from "../utils/hashing";
import { FastifyReply, FastifyRequest } from "fastify";

const prisma = new PrismaClient();

export class Login {
  async login(request: FastifyRequest, response: FastifyReply) {
    try {
      const { email, password } = request.body as LoginForm;

      if (!email || !password)
        return response
          .status(400)
          .send("Insira um email e password para fazer login.");

      const userDB = await prisma.users.findUnique({
        where: {
          email: email,
        },
      });

      if (!userDB) return response.status(401).send("Acesso negado.");

      const isValid = comparePassword(password, userDB.password);
      if (!isValid) return response.status(401).send("Acesso negado.");

      const payload: User = {
        id: userDB.id,
        name: userDB.name,
        role: userDB.role,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET || "");

      return response.status(200).send(token);
    } catch (error) {
      throw new Error("Não foi possivel fazer login.");
    }
  }
}
