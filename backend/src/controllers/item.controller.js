import { PrismaClient } from "../generated/prisma/index.js";
const prisma = new PrismaClient();

export const getItems = async (req, res) => {
  try {
    const items = await prisma.item.findMany({
      where: { hostelId: req.params.hostelId },
      include: { hostel: true },
    });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch items" });
  }
};

export const addItem = async (req, res) => {
  const { name, description, price } = req.body;
  const { hostelId } = req.params;

  try {
    const newItem = await prisma.item.create({
      data: {
        name,
        description,
        price,
        hostelId: hostelId,
      },
    });
    res.status(201).json(newItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add item" });
  }
};

export const updateItem = async (req, res) => {
  const { itemId } = req.params;
  const { name, description, price } = req.body;

  try {
    const updatedItem = await prisma.item.update({
      where: { id: parseInt(itemId) },
      data: { name, description, price },
    });
    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(500).json({ message: "Failed to update item" });
  }
};

export const deleteItem = async (req, res) => {
  const { itemId } = req.params;

  try {
    await prisma.item.delete({
      where: { id: parseInt(itemId) },
    });
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete item" });
  }
};
