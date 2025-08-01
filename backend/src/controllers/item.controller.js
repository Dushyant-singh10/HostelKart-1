import { PrismaClient } from "../generated/prisma/index.js";
const prisma = new PrismaClient();

/**
 * GET all items by hostelId
 */
export const getItems = async (req, res) => {
  const { hostelId } = req.params;
  console.log(" Fetching items for hostelId:", hostelId, "| Type:", typeof hostelId);

  try {
    const items = await prisma.item.findMany({
      where: { hostelId: hostelId }, // hostelId is string
    });

    console.log("Items found:", items.length);
    res.status(200).json(items);
  } catch (err) {
    console.error(" Error fetching items:");
    console.error("Message:", err.message);
    console.error("Stack:", err.stack);
    console.error("Full:", JSON.stringify(err, null, 2));
    res.status(500).json({ message: "Failed to fetch items" });
  }
};

/**
 * POST: Add new item under a hostelId
 */
export const addItem = async (req, res) => {
  const { hostelId } = req.params;
  const { name, description, price } = req.body;

  console.log("  Received in addItem:");
  console.log("hostelId:", hostelId, "type:", typeof hostelId);
  console.log("name:", name, "| description:", description, "| price:", price);

  if (!name || !description || !price || !hostelId) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newItem = await prisma.item.create({
      data: {
        name,
        description,
        price: Number(price),
        hostelId,
      },
    });

    console.log("✅ Item created:", newItem);
    res.status(201).json(newItem);
  } catch (err) {
    console.error("❌ Error creating item:", err.message);
    console.error("📦 Full Error:", err);
    res.status(500).json({ message: "Failed to add item" });
  }
};


/**
 * PUT: Update an existing item by itemId
 */
export const updateItem = async (req, res) => {
  const { itemId } = req.params;
  const { name, description, price } = req.body;

  if (!name || !description || !price) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const updatedItem = await prisma.item.update({
      where: { id: (itemId) },
      data: {
        name,
        description,
        price: Number(price),
      },
    });

    res.status(200).json(updatedItem);
  } catch (err) {
    console.error(" Error updating item:", err.message);
    console.error("Stack:", err.stack);
    res.status(500).json({ message: "Failed to update item" });
  }
};

/**
 * DELETE: Delete item by itemId
 */


export const deleteItem = async (req, res) => {
  const { itemId } = req.params; // Changed from itemId to id
  console.log("Attempting to delete item with ID:", itemId, "Type:", typeof itemId);

  try {
    // Add validation for the ID
    if (!itemId) {
      return res.status(400).json({ message: "Item ID is required" });
    }

    const deletedItem = await prisma.item.delete({
      where: { id: itemId },
    });

    res.status(200).json({ 
      message: "Item deleted successfully",
      deletedItem: deletedItem 
    });
  } catch (err) {
    console.error("Error deleting item:", err.message);
    console.error("Stack:", err.stack);
    
    // More specific error handling
    if (err.code === 'P2025') {
      return res.status(404).json({ message: "Item not found" });
    }
    
    res.status(500).json({ message: "Failed to delete item" });
  }
};

