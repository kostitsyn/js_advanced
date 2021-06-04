class GoodsItem {
	constructor(id_product, product_name, price) {
		this.id_product = id_product;
		this.product_name = product_name;
		this.price = price;

	}

	/**
	 * Сгенерировать блок товара для отображения на странице.
	 * @return {string} Блок товара в строковом представлении.
	 */
	makeHtmlElem() {
		return `<div class='goods-item p-3 bg-light border-warning mx-3 animated'>
					<h3 class='goods-name'>${this.product_name}</h3>
					<p class='goods-price'>${this.price}</p>
					<button name=${this.id_product} class="btn btn-danger btn-sm add-basket-btn">В корзину</button>
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
		this.goods.forEach(product => {
			const productItem = new GoodsItem(product.id_product, product.product_name, product.price);
			listHtml += productItem.makeHtmlElem();
		});
		document.querySelector('.goods-list').innerHTML = listHtml; 
	}

	/**
	 * Вычислить общую стоимость товаров.
	 */
	countTotalPrice() {
		let totalPrice = 0;
		this.goods.forEach(product => {
			totalPrice += product.price;
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

	getElementById(productId) {
		return this.goods.find(product => product.id_product == productId);
	}
}

class BasketItem {
	constructor(product, quantity) {
		this.product = product;
		this.quantity = quantity;
		this.add_datetime = new Date();  
	}

	/**
	 * Сгенерировать блок товара для отображения на странице корзины.
	 * @return {string} Блок товара в строковом представлении.
	 */
	makeHtmlElem() {
		return `<div class='goods-item'>
					<h3 class='goods-name'>${this.product.product_name}</h3>
					<p class='goods-price'>Цена: ${this.product.price * this.quantity}</p>
					<p class='goods-price'>Количество: ${this.quantity}</p>
					<input type="number" value=${this.quantity}>
					<button name=${this.product.id_product} class="btn btn-danger btn-sm remove-basket-btn">Удалить</button>
				</div>`;
	}

	updateQuantity(quantity) {

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

	/**
	 * Отрисовать на странице корзины блоки с товарами.
	 */
	renderToHtml() {
		let listHtml = '';
		this.goodsArr.forEach(basketProduct => {
			/*const goodItem = new GoodsItem(basketProduct.product, good.product_name, good.price);*/
			listHtml += basketProduct.makeHtmlElem();
		});
		document.querySelector('.modal-body').innerHTML = listHtml; 
	}

	getElementById(productId) {
		return this.goodsArr.find(basketProduct => basketProduct.product.id_product == productId);
	}
}


let loadIcon = document.createElement('i');
	loadIcon.classList.add('fas', 'fa-spinner', 'fa-spin');
	document.querySelector('.main-container').insertAdjacentElement('afterbegin', loadIcon);

	window.addEventListener('load', event => {
		loadIcon.style.display = 'none';
	})

const init = async () => {

	/*let mainContainerEl = document.querySelector('.main-container');*/

	

	const goodsObj = new GoodsList;
	await goodsObj.fetchGoods();
	goodsObj.renderToHtml();
	goodsObj.countTotalPrice();

	const basketListObj = new BasketList;

	let addBasketBtns = document.querySelectorAll('.add-basket-btn');
	addBasketBtns.forEach(btn => {
		btn.addEventListener('click', event => {
			const productItem = goodsObj.getElementById(event.target.name);
			basketListObj.addProduct(productItem);
		})
	})


	let basketButton = document.getElementsByName('basket-btn')[0];
	basketButton.addEventListener('click', event => {
		basketListObj.renderToHtml();

		let removeBasketBtns = document.querySelectorAll('.remove-basket-btn');
		removeBasketBtns.forEach(btn => {
			btn.addEventListener('click', event => {
				const productItem = basketListObj.getElementById(event.target.name);
				basketListObj.removeProduct(productItem);
				basketListObj.renderToHtml();
			})
		})
	})



	let goodsListElems = document.querySelectorAll('.goods-item');
	goodsListElems.forEach(el => {
		el.addEventListener('mouseover', event => {
			event.target.classList.add('pulse');
		})

		el.addEventListener('mouseout', event => {
			event.target.classList.remove('pulse');
		})
	})
}

window.onload = init;
