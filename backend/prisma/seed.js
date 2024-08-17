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
const prisma = new PrismaClient();

async function main() {
  try {
    const user = await prisma.user.update({
      where: {
        email: ' principal@classroom.com', 
      },
      data: {
        name: 'PrinciPal_Admin', 
      },
    });
    console.log('User updated successfully:', user);
  } catch (e) {
    console.error('Error updating user:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
