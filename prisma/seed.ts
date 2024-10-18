import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import dummy from "./dummy-data.json";

enum Role {
  USER = "USER",
  VIP = "VIP",
}

type DummyUser = {
  email: string;
  password: string;
  profile_img: string;
  name: string;
  phone: string;
  role: Role;
  address: string;
  cp: number;
  city: string;
  country: string;
  is_active: boolean;
};

type DummyPublication = {
  title: string;
  content: string;
  published: boolean;
};

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const [deleteOldPublications, deleteOldUsers] = await Promise.all([
    prisma.publications.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  console.log("Deleted " + deleteOldUsers.count + " old users");
  console.log("Deleted " + deleteOldPublications.count + " old publications");

  const { users, publications } = dummy as {
    users: DummyUser[];
    publications: DummyPublication[];
  };

  const seedUsers = await Promise.all(
    users.map(async (user) => {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(user.password, salt);
      const cmd = await prisma.user.create({
        data: {
          ...user,
          password,
          created_at: new Date(),
          updated_at: new Date(),
        },
      });
      return cmd;
    })
  );

  const seedPosts = await Promise.all(
    publications.map(async (publications, i) => {
      const cmd = await prisma.publications.create({
        data: {
          ...publications,
          author_id: seedUsers[i].id,
          created_at: new Date(),
          updated_at: new Date(),
        },
      });
      return cmd;
    })
  );

  console.log("Seed users: ", seedUsers);
  console.log("Seed posts: ", seedPosts);
  console.log("Seeding completed!");
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
