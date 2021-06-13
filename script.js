let bus = new Vue({});

Vue.component('goods-list', {
	props: ['goods'],
	template: `<div class="goods-list row-cols-lg-5 d-flex justify-content-center mb-5 flex-wrap">
			       <goods-item v-for="goodItem in goods" :product="goodItem"></goods-item>
			   </div>`,

});

Vue.component('goods-item', {
	props: ['product'],
	template: `<div class="goods-item" @click="$emit('lorem-ipsum', $event)">
			       <h3 class='goods-name'>{{ product.product_name }}</h3>
				   <p class='goods-price'>{{ product.price }}</p>
				   <button :name="product.id_product" class="btn btn-danger btn-sm add-basket-btn" @click="clickHandler($event)">В корзину</button>
		       </div>`,
	methods: {
		clickHandler(event) {
			bus.$emit('add-basket-product', event);
		}
	}
});

Vue.component('search-block', {
	props: ['searchLine'],
	template: `<form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" @submit.prevent="filterGoods">
		          <input type="search" class="form-control form-control-dark  border-0 rounded-0 rounded-start search-field" placeholder="Search..." aria-label="Search" v-model="searchLine">
		          <button type="button" class="btn btn-light border-0 rounded-0 rounded-end bg-white search-btn"><i class="fad fa-search"></i></button>
		          
		        </form>`,
});

Vue.component('basket-list', {
	props: ['basketArr'],
	template: `<div class="basket-list row-cols-lg-5 d-flex justify-content-center flex-wrap">
			       <basket-item v-for="baksetItem in basketArr" :product="basketItem"></basket-item>
			   </div>`,
});

Vue.component('basket-item', {
	props: ['product'],
	template: `<div class='basket-item p-3 bg-light border-warning mx-3 animated' @mouseover="mouseOver" @mouseout="mouseOut">
			       <h3 class='goods-name'>{{ product.product_name }}</h3>
				   <p class='goods-price'>{{ getTotalPriceForItem(product) }}</p>
				   <p class='basket-product-quantity'>Количество:</p>
				   <input class="mb-3 d-block" v-bind:name="product.id_product" type="number" v-bind:value="product.quantity" @change="updateQuantity">
				   <button v-bind:name="product.id_product" class="btn btn-danger btn-sm remove-basket-btn" @click="removeProductInBasket">Удалить</button>product
			   </div>`
})

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
				const basketProduct = {...currentProduct, quantity: 1};
				this.basketGoods.push(basketProduct);
			}
		},

		/**
		 * Проверить, есть ли уже выбранный продукт в корзине.
		 * @param  {object} product Объект продукта.
		 * @return {Boolean}
		 */
		checkIfExistsInBasket(product) {
			/*return this.basketGoods.includes(product);*/
			return Boolean(this.basketGoods.find(item => item.id_product == product.id_product));
		},

		/**
		 * Получить объект товара по id.
		 * @param  {integer} productId id товара.
		 * @return {object} Массив товаров.
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
		 * @param  {object} product объект продукта в корзине.
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
		bus.$on('add-basket-product', this.addProductInBasket);
	}, 
});




