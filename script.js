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
		 * Вычислить общую стоимость товаров в корзине.
		 * @return {string} Строка с общей стоимостью товаров.
		 */
		getTotalPriceInBasket() {
			let totalPrice = 0;
			this.basketGoods.forEach(product => {
				totalPrice += product.price * product.quantity;
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
			const currentProduct = this.getProductById(+event.target.name, this.filteredGoods);
			let isExists = this.checkIfExistsInBasket(currentProduct);
			if (isExists) {
				const basketProduct = this.getProductById(+event.target.name, this.basketGoods);
				basketProduct.quantity++;
			}else {
				const basketProduct = {...currentProduct};
				basketProduct.quantity = 1;
				this.basketGoods.push(basketProduct);
			}
		},

		checkIfExistsInBasket(product) {
			/*return this.basketGoods.includes(product);*/
			return Boolean(this.basketGoods.find(item => item.id_product == product.id_product));
		},

		/**
		 * Получить объект товара по id.
		 * @param  {integer} productId id товара.
		 * @return {object} Объект товара.
		 */
		getProductById(productId, array) {
			return array.find(product => product.id_product == productId);
		},

		/**
		 * Удалить товар из корзины.
		 */
		removeProductInBasket(event) {
			const basketItemObj = this.getProductById(+event.target.name, this.basketGoods);
			this.basketGoods.splice(this.basketGoods.indexOf(basketItemObj), 1);
		},

		/**
		 * Получить общую стоимость на одну позицию элемента корзины.
		 * @return {string} Строка с общей стоимостью элемента корзины.
		 */
		getTotalPriceForItem(product) {
			return `Цена: ${product.price * product.quantity}`;
		},

		/**
		 * Обновить количество товара в корзине.
		 * @param  {integer} quantity Новое кол-во товара.
		 */
		updateQuantity(event) {
			const currentProduct = this.getProductById(event.target.name, this.basketGoods);
			currentProduct.quantity = event.target.value;
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




