import { PrismaClient, type Role } from '@prisma/client';
import bcrypt from 'bcrypt';
import dummy from './dummy-data.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const [deleteOldPublications, deleteOldUsers] = await Promise.all([
    prisma.publication.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  console.log(`Deleted ${deleteOldUsers.count} old users`);
  console.log(`Deleted ${deleteOldPublications.count} old publications`);

  const seedUsers = await Promise.all(
    dummy.users.map(async (user) => {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(user.password, salt);
      const cmd = await prisma.user.create({
        data: {
          ...user,
          password,
          lastActivity: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
          role: user.role as Role,
        },
      });
      return cmd;
    }),
  );

  const seedPosts = await Promise.all(
    dummy.publications.map(async (publication, i) => {
      const cmd = await prisma.publication.create({
        data: {
          ...publication,
          authorId: seedUsers[i].id,
          title: publication.title || 'Default Title', // Ensure title is provided
          content: publication.content || 'Default Content', // Ensure content is provided
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
      return cmd;
    }),
  );

  console.log('Seed users: ', seedUsers);
  console.log('Seed posts: ', seedPosts);
  console.log('Seeding completed!');
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
