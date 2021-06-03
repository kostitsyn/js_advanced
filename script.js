class GoodsItem {
	constructor(id_product, product_name, price) {
		this.id_product = id_product;
		this.product_name = product_name;
		this.price = price;

	}

	makeHtmlElem() {
		return `<div class='goods-item p-3 bg-light border-warning mx-3' itemid=${this.id_product}><h3>${this.product_name}</h3><p>${this.price}</p></div>`;
	}
}

class GoodsList {
	constructor() {
		this.goods = [];
	}
	async fetchGoods() {
		const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';
		const response = await fetch(`${API_URL}/catalogData.json`);
		if (response.ok) {
			const catalogItems = await response.json();
			console.log(catalogItems);
			this.goods = catalogItems;
		} else {
			alert('Ошибка соединения с сервером');
		}
	}
	renderToHtml() {
		let listHtml = '';
		this.goods.forEach(good => {
			const goodItem = new GoodsItem(good.id_product, good.product_name, good.price);
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
		goodsElem.insertAdjacentHTML('afterend', `<p>Общая стоимость товаров ${totalPrice}</p>`);  
	}
}

class BasketItem {

}

class BasketList {

}

const init = async () => {
	const goodsObj = new GoodsList();
	await goodsObj.fetchGoods();
	goodsObj.renderToHtml();
	goodsObj.countTotalPrice(); 
}

window.onload = init;