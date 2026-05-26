const inventoryService = require("./inventory-items.service");

// create a new item
exports.createItem = async (req, res) => {
  try {
    const { item_name, description, quantity, unit_price, category_id } =
      req.body;

    // ensures that the item name has been provided
    if (!item_name) {
      return res.status(400).json({
        success: false,
        message: "Item_name is required",
      });
    }

    const item = await inventoryService.createItem(
      item_name,
      description,
      quantity,
      unit_price,
      category_id,
    );

    res.status(201).json({
      success: true,
      message: "Item created successfully",
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// getting all items
exports.getItems = async (req, res) => {
  try {
    const items = await inventoryService.getItems();

    res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get a single item
exports.getItemById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await inventoryService.getItemById(id);

    // checking if the item is available
    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Item found successfully",
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// update an item
exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { item_name, description, quantity, unit_price, category_id } =
      req.body;

    // new values of the updated item
    const updatedItem = await inventoryService.updateItem(
      id,
      item_name,
      description,
      quantity,
      unit_price,
      category_id,
    );

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Item updated successfully",
      data: updatedItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// deleting an item
exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await inventoryService.deleteItem(id);

    // checks if the item is available
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
