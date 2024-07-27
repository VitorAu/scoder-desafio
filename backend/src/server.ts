import fastify from "fastify";
import { createTransaction } from "./routes/create-transaction";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { userRegister } from "./routes/user-register";
import { getTransactions } from "./routes/get-transaction";
import { userLogin } from "./routes/user-login";
import cors from '@fastify/cors';

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(cors, {
  origin: "*",
});

app.register(createTransaction);
app.register(userRegister);
app.register(getTransactions);
app.register(userLogin);

app.listen({ port: 4444 }).then(() => {
  console.log("Server running");
});
