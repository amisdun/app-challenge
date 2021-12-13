const menuItemsList = () => {
	return Object.freeze([
		{
			name: "MARGHERITA",
			itemDescription: "Tomato Sauce, mozzarella, and oregano",
			price: "25",
		},
		{
			name: "QUATTRO STAGIONI",
			itemDescription:
				"Tomato Sauce, mozzarella, and oregano, mushrooms,ham,olives",
			price: "30",
		},
		{
			name: "DIAVOLA",
			itemDescription: "Tomato Sauce, mozzarella, salami,chilli pepper",
			price: "65",
		},
		{
			name: "PARMIGIANA",
			itemDescription: "Tomato Sauce, mozzarella, eggplants, parmesan flakes",
			price: "45",
		},
		{
			name: "FRUTTI DI MARE",
			itemDescription: "Tomato Sauce, sea food",
			price: "55",
		},
	]);
};

module.exports = { menuItemsList };
