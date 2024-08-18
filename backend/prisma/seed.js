// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// async function main() {
//   await prisma.user.create({
//     data: {
//       name: 'PrinciPal_Admin',
//       email: ' principal@classroom.com',
//       password: 'Admin',  
//       role: 'admin',
//     },
//   });
// }

// main()
//   .catch((e) => console.error(e))
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash('Admin', 10);

  await prisma.user.create({
    data: {
      name: 'PrinciPal_Admin',
      email: 'principal@classroom.com',
      password: hashedPassword,  // Store the hashed password
      role: 'admin',
    },
  });
  console.log('Admin user created');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
