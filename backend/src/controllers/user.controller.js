import { PrismaClient } from '../generated/prisma/index.js';
const prisma = new PrismaClient();

// GET /api/users/profile
export const getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        // Exclude password
      },
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
};

// GET /api/users/items
export const getMyItems = async (req, res) => {
  try {
    const items = await prisma.item.findMany({
      where: {
        ownerId: req.user.id,
      },
    });

    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch your items' });
  }
};
