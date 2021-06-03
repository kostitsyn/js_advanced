class GoodsItem {
	constructor(id_product, product_name, price) {
		this.id_product = id_product;
		this.product_name = product_name;
		this.price = price;

	}

	/**
	 * Сгенерировать блок товара для отображения на странице.
	 * @return {string} Блок товара в строковом предствалении.
	 */
	makeHtmlElem() {
		return `<div class='goods-item p-3 bg-light border-warning mx-3'>
					<h3>${this.product_name}</h3>
					<p>${this.price}</p>
					<button name=${this.id_product} class="btn btn-danger btn-sm">В корзину</button>
				</div>`;
	}
}

class GoodsList {
	constructor() {
		this.goods = [];
	}

	/**
	 * Получить данные о товарах с сервера
	 */
	async fetchGoods() {
		const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';
		const response = await fetch(`${API_URL}/catalogData.json`);
		if (response.ok) {
			const catalogItems = await response.json();
			this.goods = catalogItems;
		} else {
			alert('Ошибка соединения с сервером');
		}
	}

	/**
	 * Отрисовать на странице блоки с товарами.
	 */
	renderToHtml() {
		let listHtml = '';
		this.goods.forEach(good => {
			const goodItem = new GoodsItem(good.id_product, good.product_name, good.price);
			listHtml += goodItem.makeHtmlElem();
		});
		document.querySelector('.goods-list').innerHTML = listHtml; 
	}

	/**
	 * Вычислить общую стоимость товаров.
	 */
	countTotalPrice() {
		let totalPrice = 0;
		this.goods.forEach(good => {
			totalPrice += good.price;
		})
		let goodsElem = document.querySelector('.goods-list');
		goodsElem.insertAdjacentHTML('afterend', `<p>Общая стоимость товаров ${totalPrice}</p>`);  
	}

	/**
	 * Получить список товаров.
	 * @return {object} Массив товаров.
	 */
	getAllGoods() {
		return this.goods;
	}
}

class BasketItem {
	constructor(product, quantity) {
		this.product = product;
		this.quantity = quantity;
		this.add_datetime = new Date();  
	}
}

class BasketList {
	constructor() {
		this.goodsArr = [];
	}

	/**
	 * Добавить товар в корзину.
	 * @param {object} product объект товара.
	 */
	addProduct(newProduct) {
		let isExists = false;
		this.goodsArr.forEach(productBasket => {
			if (productBasket.product.id_product === newProduct.id_product) {
				productBasket.quantity += 1;
				isExists = true;
			}
		})
		if (!isExists) {
			const newProductBasket = new BasketItem(newProduct, 1);
			this.goodsArr.push(newProductBasket);
		}	
	}

	/**
	 * Удалить товар из корзины.
	 * @param  {object} basketItemObj Товар в корзине.
	 */
	removeProduct(basketItemObj) {
		this.goodsArr.splice(this.goodsArr.indexOf(basketItemObj), 1);
	}

	/**
	 * Получить список товаров в корзине.
	 * @return {object} Массив товаров.
	 */
	getBasketArr() {
		return this.goodsArr;
	}

}

const init = async () => {
	const goodsObj = new GoodsList;
	await goodsObj.fetchGoods();
	goodsObj.renderToHtml();
	goodsObj.countTotalPrice();

	const basketListObj = new BasketList;

	let goodsListElem = document.querySelector('.goods-list');
	goodsListElem.addEventListener('click', event => {
		if (event.target.tagName === 'BUTTON') {
			const productItem = goodsObj.getAllGoods().find(product => product.id_product == event.target.name);
			basketListObj.addProduct(productItem);
		}
		
	})

	let basketButton = document.querySelector('button[name=basket-btn]');
	console.log(basketButton); 
}

window.onload = init;
