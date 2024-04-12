import express, { type Request, type Response } from "express";
import productRoute from "./routes/product.router";
import authRoute from "./routes/auth.router";
import cors from "cors";

const server = express();
server.use(express.json());
server.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);
const PORT = 3123;

server.use("/v1/product", productRoute);
server.use("/v1/auth", authRoute);

server.get("/product", (req: Request, res: Response) => {
  res.json({
    message: "SUCCESS",
  });
});

server.listen(PORT, () => {
  console.info(`server has started on PORT ${PORT}`);
});
