class GoodsItem {
	constructor(title, price) {
		this.title = title;
		this.price = price;
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
		this.goods = [
			{title: 'Shirt', price: 150 },
			{title: 'Socks', price: 50 },
			{title: 'Jacket', price: 350 },
			{title: 'Shoes', price: 250 },
		];
	}
	renderToHtml() {
		let listHtml = '';
		this.goods.forEach(good => {
			const goodItem = new GoodsItem(good.title, good.price);
			listHtml += goodItem.makeHtmlElem();
		});
		document.querySelector('.goods-list').innerHTML = listHtml; 
	}
	countTotalPrice() {
		let totalPrice = 0;
		this.goods.forEach(good => {
			totalPrice += good.price;
		})
		let goodsElem = document.querySelector('.goods-list');
		goodsElem.insertAdjacentHTML('afterend', `<p>Общая стоимость товаров ${totalPrice}`);  
	}
}

class GoodsItemInBasket extends GoodsItem {

}

class GoodsListInBasket extends GoodsList {

}




const init = () => {
	const goodsObj = new GoodsList();
	goodsObj.fetchGoods();
	goodsObj.renderToHtml();
	goodsObj.countTotalPrice(); 
}

window.onload = init;