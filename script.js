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
		this.filteredGoods = [];
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
			this.filteredGoods = catalogItems;
		} else {
			alert('Ошибка соединения с сервером');
		}
	}

	/**
	 * Отрисовать на странице блоки с товарами.
	 */
	renderToHtml() {
		let listHtml = '';
		this.filteredGoods.forEach(product => {
			const productItem = new GoodsItem(product.id_product, product.product_name, product.price);
			listHtml += productItem.makeHtmlElem();
		});
		document.querySelector('.goods-list').innerHTML = listHtml + `${this.goods.length ? 
															`<br><p class="goods-total-price">${this.getTotalPrice()}</p>`
															 : ''}`;
	}

	/**
	 * Вычислить общую стоимость товаров.
	 */
	getTotalPrice() {
		let totalPrice = 0;
		this.filteredGoods.forEach(product => {
			totalPrice += product.price;
		})
		return `Общая стоимость товаров: ${totalPrice}`;
	}

	/**
	 * Получить список товаров.
	 * @return {object} Массив товаров.
	 */
	getAllGoods() {
		return this.goods;
	}

	/**
	 * Получить список отфильтрованных товаров.
	 * @return {object} Массив отфильтрованных товаров.
	 */
	getFilteredGoods() {
		return this.filteredGoods;
	}

	/**
	 * Получить объект товара по его id.
	 * @param  {integer} productId Id товара.
	 * @return {object}  Объект товара.
	 */
	getElementById(productId) {
		return this.filteredGoods.find(product => product.id_product == productId);
	}

	/**
	 * Отфильтровать массив товаров по переданному значению.
	 * @param  {string} value Название строки по которой будет происходить фильтрация.
	 */
	filterGoods(value) {
		let regexp = new RegExp(value, 'i');
		this.filteredGoods = this.goods.filter(product => regexp.test(product.product_name));
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
		return `<div class='basket-item'>
					<h3 class='basket-product-name'>${this.product.product_name}</h3>
					<p class='basket-product-price'>${this.getTotalPriceForItem()}</p>
					<p class='basket-product-quantity'>Количество:</p>
					<input name=${this.product.id_product} type="number" value=${this.quantity}><br><br>
					<button name=${this.product.id_product} class="btn btn-danger btn-sm remove-basket-btn">Удалить</button>
				</div>`;
	}

	/**
	 * Получить общую стоимость на одну позицию элемента корзины.
	 * @return {string} Строка с общей стоимостью элемента корзины.
	 */
	getTotalPriceForItem() {
		return `Цена: ${this.product.price * this.quantity}`;
	}

	/**
	 * Обновить количество товара в корзине.
	 * @param  {integer} quantity Новое кол-во товара.
	 */
	updateQuantity(quantity) {
		this.quantity = quantity;
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
		if (this.goodsArr.length) {
			this.goodsArr.forEach(basketProduct => {
				listHtml += basketProduct.makeHtmlElem();
			});
		}else {
			listHtml = this.getMessageOfEmtpyBasket();
		}
		document.querySelector('.modal-body').innerHTML = listHtml + `${this.goodsArr.length ? `<p class="basket-total-price">${this.getTotalPrice()}</p>` : ''}`; 
	}

	/**
	 * Получить объект товара по id.
	 * @param  {integer} productId id товара.
	 * @return {object} Объект товара.
	 */
	getElementById(productId) {
		return this.goodsArr.find(basketProduct => basketProduct.product.id_product == productId);
	}

	/**
	 * Получить сообщение о пустой корзине.
	 * @return {string} Строка с сообщением.
	 */
	getMessageOfEmtpyBasket() {
		return 'Товаров в корзине пока нет.';
	}

	/**
	 * Получить общую стоимость товаров в корзине.
	 * @return {string} Строка с общей стоимостью товаров в корзине.
	 */
	getTotalPrice() {
		let totalPrice = 0;
		this.goodsArr.forEach(basketProduct => {
			totalPrice += basketProduct.quantity * basketProduct.product.price;
		})
		return `Общая стоимость товаров: ${totalPrice}`;
	}	
}

// Добавление спиннера при загрузке страницы
/*let loadIcon = document.createElement('i');
	loadIcon.classList.add('fas', 'fa-spinner', 'fa-spin');
	document.querySelector('.main-container').insertAdjacentElement('afterbegin', loadIcon);

	window.addEventListener('load', event => {
		loadIcon.style.display = 'none';
	})*/

const init = async () => {
	const goodsObj = new GoodsList;
	await goodsObj.fetchGoods();
	goodsObj.renderToHtml();

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
		basketListObj.getTotalPrice();

		let removeBasketBtns = document.querySelectorAll('.remove-basket-btn');
		removeBasketBtns.forEach(btn => {
			btn.addEventListener('click', event => {
				const basketItem = basketListObj.getElementById(event.target.name);
				basketListObj.removeProduct(basketItem);
				let basketItemElem = event.target.parentNode;
				basketItemElem.style.display = 'none';
				if (!basketListObj.getBasketArr().length) {
					basketItemElem.parentNode.innerText = basketListObj.getMessageOfEmtpyBasket();
				}
				basketItemElem.parentNode.querySelector('.basket-total-price').innerText = basketListObj.getTotalPrice();
			})
		})

		
		let basketItemInputs = document.querySelectorAll('.basket-item');
		basketItemInputs.forEach(inputItem => {
			inputItem.addEventListener('change', event => {
				const basketItem = basketListObj.getElementById(event.target.name);
				let currentQuantity = +event.target.value;
				if (currentQuantity <= 0) {
					basketListObj.removeProduct(basketItem);
					let basketItemElem = event.target.parentNode;
					basketItemElem.style.display = 'none';
				}else {
					basketItem.updateQuantity(+event.target.value);
				}
				event.path[1].querySelector('.basket-product-price').innerText = basketItem.getTotalPriceForItem();
				event.currentTarget.parentNode.querySelector('.basket-total-price').innerText = basketListObj.getTotalPrice();
			})
		})
	})

	let searchBtnElem = document.querySelector('.search-btn');
	searchBtnElem.addEventListener('click', event => {
		let goodsListElems = document.querySelectorAll('.goods-item');
		goodsListElems.forEach(el => {
			el.style.display = 'block';
		})
		let value = searchBtnElem.parentNode.querySelector('.search-field').value;
		goodsObj.filterGoods(value);
		let filteredGoods = goodsObj.getFilteredGoods();
		
		goodsListElems.forEach(el => {
			let isExists = filteredGoods.find(product => product.id_product === +el.querySelector('.add-basket-btn').name);
			if (!isExists) {
				el.style.display = 'none';
			}
		})
		document.querySelector('.goods-total-price').innerHTML = goodsObj.getTotalPrice();

	})

	let searchFieldElem = document.querySelector('.search-field');
	searchFieldElem.addEventListener('keydown', event => {
		if (event.key === 'Enter') {
			let goodsListElems = document.querySelectorAll('.goods-item');
			goodsListElems.forEach(el => {
				el.style.display = 'block';
			})

			let value = event.target.value;
			goodsObj.filterGoods(value);
			let filteredGoods = goodsObj.getFilteredGoods();
		
			goodsListElems.forEach(el => {
				let isExists = filteredGoods.find(product => product.id_product === +el.querySelector('.add-basket-btn').name);
				if (!isExists) {
					el.style.display = 'none';
				}
			})
		document.querySelector('.goods-total-price').innerHTML = goodsObj.getTotalPrice();
			event.preventDefault();
		}
		
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
