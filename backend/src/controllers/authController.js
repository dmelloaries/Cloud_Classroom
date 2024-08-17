const prisma = require('../utils/prismaClient');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findFirst({
    where: {
      email,
      password,  
    },
  });
  if (user) {
    res.json({ message: 'Login successful', role: user.role });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};
