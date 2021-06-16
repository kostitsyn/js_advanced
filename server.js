const portNumber = 3000;
const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static('.'));
app.use(cors());

app.get('/catalogData', (req, res) => {
	fs.readFile('catalog.json', 'utf-8', (err, data) => {
		res.send(data);
	});
});

app.get('/basketData', (req, res) => {
	fs.readFile('basket.json', 'utf-8', (err, data) => {
		res.send(data);
	});
});

app.post('/addToBasket', (req, res) => {
	fs.readFile('basket.json', 'utf-8', (err, data) => {
		if (err) {
			res.send('{"result": 0}');
		} else {
			const basketArr = JSON.parse(data);
			const product = req.body;
			console.log(product)


			let isExists = Boolean(basketArr.find(item => item.id_product == product.id_product));
			if (isExists) {
				product.quantity++;
				console.log(product.quantity)
			}else {
				const product1 = {...product, quantity: 1};
				basketArr.push(product1);
			}


			fs.writeFile('basket.json', JSON.stringify(basketArr), err => {
				if (err) {
					res.send('{"result": 0}');
				} else {
					res.send('{"result": 1}');
				}
			});
		}
	});
});

app.listen(portNumber, () => {
	console.log(`Server is running on port ${portNumber}!!!`)
});

