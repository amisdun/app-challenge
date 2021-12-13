const { MenuItem } = require("../models/menuItems");

const getAllMenuItems = async () => {
	const menuItems = await MenuItem.find({});
	return menuItems;
};

module.exports = { getAllMenuItems };
