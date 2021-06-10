const app = new Vue({
	el: '#app',
	data: {
		goods: [],
		filteredGoods: [],
		searchLine: '',
		basketGoods: []

	},
	methods: {
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
		},

		/**
		 * Вычислить общую стоимость товаров.
		 * @return {string} Строка с общей стоимостью товаров.
		 */
		getTotalPrice() {
			let totalPrice = 0;
			this.filteredGoods.forEach(product => {
				totalPrice += product.price;
			})
			return `Общая стоимость товаров: ${totalPrice}`;
		},

		/**
		 * Получить общую стоимость товаров в корзине.
		 * @return {string} Строка с общей стоимостью товаров в корзине.
		 */
		getTotalBasketPrice() {
			let totalPrice = 0;
			this.basketGoods.forEach(basketProduct => {
				totalPrice += basketProduct.price;
			})
			return `Общая стоимость товаров в корзине: ${totalPrice}`;
		},	

		/**
		 * Отфильтровать массив товаров по переданному значению в searchLine.
		 */
		filterGoods() {
			let regexp = new RegExp(this.searchLine, 'i');
			this.filteredGoods = this.goods.filter(product => regexp.test(product.product_name));
		},

		/**
		 * Добавить товар в корзину.
		 */
		addProductInBasket(event) {
			/*let isExists = false;*/
			const newProduct = this.getProductById(+event.target.name);
			this.basketGoods.push(newProduct);
			/*this.basketGoods.forEach(productBasket => {
				if (productBasket.id_product === newProduct.id_product) {
					productBasket.quantity += 1;
					isExists = true;
				}
			})
			if (!isExists) {
				newProduct.quantity = 0;
				this.basketGoods.push(newProduct);
			console.log(newProduct);
			}	*/
		},

		/**
		 * Получить объект товара по id.
		 * @param  {integer} productId id товара.
		 * @return {object} Объект товара.
		 */
		getProductById(productId) {
			return this.filteredGoods.find(product => product.id_product == productId);
		},

		/**
		 * Получить объект товара в корзине по id.
		 * @param  {integer} productId id товара в корзине.
		 * @return {object} Объект товара в корзине.
		 */
		getBasketProductById(productId) {
			return this.basketGoods.find(product => product.id_product == productId);
		},

		/**
		 * Удалить товар из корзины.
		 */
		removeProductInBasket(event) {
			const basketItemObj = this.getBasketProductById(+event.target.name);
			this.basketGoods.splice(this.basketGoods.indexOf(basketItemObj), 1);
		},

		/**
		 * Добавляет анимацию на элемент при наведении.
		 */
		mouseOver(event) {
			event.target.classList.add('pulse');
		},

		/**
		 * Удаляет анимацию на блок товара при уходе курсора с элемента.
		 */
		mouseOut(event) {
			event.target.classList.remove('pulse');
		},
	},

	async mounted() {
		await this.fetchGoods();
	}, 
});




