const goods = [
	{title: 'Shirt', price: 150 },
	{title: 'Socks', price: 50 },
	{title: 'Jacket', price: 350 },
	{title: 'Shoes', price: 250 },
];

const renderGoodsItem = (title = 'Default', price = 0) => `<div class='goods-item p-3 bg-light border border-warning mx-3'><h3>${title}</h3><br><p>${price}</p></div>`;

const renderGoodsList = list => {
	let goodsList = list.map(item => renderGoodsItem(item.title, item.price));
	document.querySelector('.goods-list').innerHTML = goodsList.join(' ');
	let json = JSON.stringify(goods);
	console.log(typeof json);
	let value = JSON.parse(json);
	console.log(typeof value);
}

/*class GoodsItem {
	constructor(title, price) {
		self.title = title;
		self.price = price;
	}

	makeHtmlElem() {
		return `<div class='goods-item p-3 bg-light border-warning mx-3'><h3>${this.title}</h3><p>${this.price}</p></div>`;
	}
}

class GoodsList {
	constructor() {
		this.goods = [];
	}
	fetchGoods() {
		let a = 
	}
}*/


const init = () => {
	renderGoodsList(goods);
}

window.onload = init;