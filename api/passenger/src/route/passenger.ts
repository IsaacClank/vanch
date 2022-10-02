import { Router } from "express";
import { ICreateUpdatePassenger } from "../dto/passenger";
import {
  createPassenger,
  deletePassenger,
  getPassengerById,
  updatePassenger,
} from "../service/passenger";
import { NotFoundError } from "@prisma/client/runtime";

export const PassengerRouter = Router();

PassengerRouter.get("/:id", async (req, res) => {
  try {
    const { id } = await getPassengerById(req.params.id);

    return res.json({ id });
  } catch (err) {
    if (err instanceof NotFoundError) {
      return res.status(404).json(err);
    }

    throw err;
  }
});

PassengerRouter.post("/", async (req, res) => {
  const dto: ICreateUpdatePassenger = req.body;

  const { id } = await createPassenger(dto);
  return res.json({ id });
});

PassengerRouter.delete("/:id", async (req, res) => {
  const { id } = await deletePassenger(req.params.id);
  return res.json({ id });
});

PassengerRouter.put("/:id", async (req, res) => {
  const dto: ICreateUpdatePassenger = req.body;

  const { id } = await updatePassenger(req.params.id, dto);
  return res.json({ id });
});
