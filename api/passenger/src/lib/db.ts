import { PrismaClient } from "@prisma/client";

export class DB {
  private static prisma: PrismaClient;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static client(): PrismaClient {
    if (this.prisma) {
      return this.prisma;
    }

    this.prisma = new PrismaClient();

    return this.client();
  }
}
