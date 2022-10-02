import { DB } from "../lib/db";
import { ICreateUpdatePassenger } from "../dto/passenger";

export function getPassengerById(id: string) {
  return DB.client().passenger.findUniqueOrThrow({ where: { id: id } });
}

export function createPassenger(data: ICreateUpdatePassenger) {
  return DB.client().passenger.create({ data });
}

export function updatePassenger(id: string, data: ICreateUpdatePassenger) {
  return DB.client().passenger.update({ where: { id }, data });
}

export function deletePassenger(id: string) {
  return DB.client().passenger.delete({ where: { id } });
}
