import { FastifyInstance } from "fastify";
import { Admin } from "./Controllers/adminController";
import { Login } from "./Controllers/loginController";
import { Sells } from "./Controllers/sellsController";
import authMidleware from "./midlewares/authMidleware"; 

const admin = new Admin();
const login = new Login();
const sells = new Sells();

export default function Routes(fastify: FastifyInstance) {

  fastify.post("/auth/login", login.login);
  fastify.post("/auth/registerAdmin", admin.signAdmin);

  fastify.post("/balconistas", { preHandler: authMidleware("ADMIN") }, admin.createSeller);
  fastify.get("/balconistas", { preHandler: authMidleware("ADMIN") }, admin.checkSellersList);
  fastify.delete("/balconistas/:id", { preHandler: authMidleware("ADMIN") }, admin.deleteSeller);
  fastify.get("/vendas", { preHandler: authMidleware("ADMIN") }, sells.viewSellsList);
  
  fastify.post("/vendas", { preHandler: authMidleware("SELLER") }, sells.createSell);
};
