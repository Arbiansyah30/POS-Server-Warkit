import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("poswarkit123", 10);
  await prisma.user.create({
    data: {
      email: "leonardmanoza@gmail.com",
      id: "0aefa638-f669-4e45-87eb-fe130cfb9978",
      name: "Leonard Manoza",
      password,
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
