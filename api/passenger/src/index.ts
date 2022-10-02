import express from "express";
import { PassengerRouter } from "./route/passenger";

const environment = process.env.NODE_ENV;
const port = process.env.PORT ?? 3000;

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get("/", (_, res) => res.status(200).send());
server.use("/passenger", PassengerRouter);

server.listen(port, () => {
  console.log(`${environment} server running on port ${port}`);
});
