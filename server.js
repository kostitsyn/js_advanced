const portNumber = 3000;
/*const express = require('express');*/
import express from 'express';
const app = express();
/*const fs = require('fs');*/
import fs from 'fs';
/*const cors = require('cors');*/
import cors from 'cors';
/*const bodyParser = require('body-parser');*/
import bodyParser from 'body-parser';
/*const moment = require('moment');*/
import moment from 'moment';

app.use(bodyParser.json());
app.use(express.static('.'));
app.use(cors());

// API GET-запроса на получение товаров.
app.get('/catalogData', (req, res) => {
	fs.readFile('catalog.json', 'utf-8', (err, data) => {
		res.send(data);
	});
});

// API GET-запроса на получение товаров в корзине.
app.get('/basketData', (req, res) => {
	fs.readFile('basket.json', 'utf-8', (err, data) => {
		res.send(data);
	});
});

// API POST-запроса на сохранение статистических данных.
/*app.post('/static', (req, res) => {
	fs.readFile('stats.json', 'utf-8', (err, data) => {
		if (err) {
			res.send('{"result": 0}');
		} else {
			let statArr = JSON.parse(data);
			let statItem = req.body;
			statItem.date = moment().format('MMMM Do YYYY, h:mm:ss a');
			statArr.push(statItem);
			fs.writeFile('stats.json', JSON.stringify(statArr, null, 2), err => {
				if (err) {
					res.send('{"result": 0}');
				} else {
					res.send('{"result": 1}');
				}
			});
		}
	});
});*/

// API GET-запроса на сохранение статистических данных.
app.get('/static', (req, res) => {
	fs.readFile('stats.json', 'utf-8', (err, data) => {
		if (err) {
			res.send('{"result": 0}');
		} else {
			let statArr = JSON.parse(data);
			let statItem = req.query;
			statItem.date = moment().format('MMMM Do YYYY, h:mm:ss a');
			statArr.push(statItem);
			fs.writeFile('stats.json', JSON.stringify(statArr, null, 2), err => {
				if (err) {
					res.send('{"result": 0}');
				} else {
					res.send('{"result": 1}');
				}
			});
		}
	});
});

// API POST-запроса на добавление товара в корзину.
app.post('/addToBasket', (req, res) => {
	fs.readFile('catalog.json', 'utf-8', (err, data) => {
		if (err) {
			res.send('{"result": 0}');
		} else {
			let goods = JSON.parse(data);
			fs.readFile('basket.json', 'utf-8', (err, data) => {
				if (err) {
					res.send('{"result": 0}');
				} else {
					const basketGoods = JSON.parse(data);
					const productData = req.body;
					const productInBasket = basketGoods.find(item => item.id === +productData.id);
					if (productInBasket) {
						if ('quantity' in productData) {
							productInBasket.quantity = productData.quantity;
						} else {
							productInBasket.quantity++;
						}
						
					} else {
						const productInBasket = goods.find(item => item.id === +productData.id);
						basketGoods.push({...productInBasket, quantity: 1});
					}

					fs.writeFile('basket.json', JSON.stringify(basketGoods, null, 2), err => {
						if (err) {
							res.send('{"result": 0}');
						} else {
							res.send('{"result": 1}');
						}
					});
					console.log(basketGoods);
				}
			});
		}
	});
});

// API POST-запроса на удаление товара из корзины.
app.post('/removeToBasket', (req, res) => {
	fs.readFile('basket.json', 'utf-8', (err, data) => {
		if (err) {
			res.send('{"result": 0}');
		} else {
			const basketGoods = JSON.parse(data);
			const productData = req.body;
			const productInBasket = basketGoods.find(item => item.id === +productData.id);
			basketGoods.splice(basketGoods.indexOf(productInBasket), 1);

			fs.writeFile('basket.json', JSON.stringify(basketGoods, null, 2), err => {
			if (err) {
					res.send('{"result": 0}');
				} else {
					res.send('{"result": 1}');
				}
			});
			console.log(basketGoods);
		};
	});
});

// Устанавливаем номер порта сервера.
app.listen(portNumber, () => {
	console.log(`Server is running on port ${portNumber}!!!`)
});

