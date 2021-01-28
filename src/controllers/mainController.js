const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	root: (req, res) => {
		let inSale = products.filter(product => {
			return product.category == "in-sale"
		})

		let visited = products.filter(product => {
			return product.category == "visited"
		})

		res.render("index", {
			visited,
			inSale,
			toThousand
		})
	},
	search: (req, res) => {
		const result = products.filter(product => {
			return product.name.toLowerCase().includes(req.query.keywords.toLowerCase().trim())
		})

		res.render("results", {
			result,
			search: req.query.keywords,
			toThousand
		})
	},
};

module.exports = controller;
