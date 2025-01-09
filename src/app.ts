import fastify from "fastify";
import Routes from "./routes";
import { User } from "./schemas/userSchema";

const app = fastify();

declare module "fastify" {
  interface FastifyRequest {
    user: User;
  }
}

app.register(Routes);

app.listen(
  {
    host: "0.0.0.0",
    port: process.env.PORT ? Number(process.env.Port) : 3000,
  },
  (err, addres) => {
    if (err) {
      console.error(err.message);
      process.exit(1);
    } else {
      console.log(`Server running on address: ${addres}`);
    }
  }
);
