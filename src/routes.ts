import { FastifyInstance } from "fastify";
import { Admin } from "./Controllers/adminController";
import { Login } from "./Controllers/loginController";
import { Sells } from "./Controllers/sellsController";
import authMidleware from "./midlewares/authMidleware"; 

export default function Routes(fastify: FastifyInstance) {

  fastify.post("/auth/login", new Login().login);
  fastify.post("/auth/registerAdmin", new Admin().signAdmin);

  fastify.post("/balconistas", { preHandler: authMidleware("ADMIN") }, new Admin().createSeller);
  fastify.get("/balconistas", { preHandler: authMidleware("ADMIN") }, new Admin().checkSellersList);
  fastify.delete("/balconistas/:id", { preHandler: authMidleware("ADMIN") }, new Admin().deleteSeller);
  fastify.get("/vendas", { preHandler: authMidleware("ADMIN") }, new Sells().viewSellsList);
  
  fastify.post("/vendas", { preHandler: authMidleware("SELLER") }, new Sells().createSell);
};
