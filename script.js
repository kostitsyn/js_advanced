let bus = new Vue({});

Vue.component('goods-list', {
	props: ['goods', 'getTotalPrice'],
	template: `<div class="goods-list row-cols-lg-5 d-flex justify-content-center mb-5 flex-wrap">
			       <goods-item v-for="goodItem in goods" :product="goodItem"></goods-item>
			       <p class="goods-total-price">{{ getTotalPrice() }}</p>
			   </div>`,

});

Vue.component('goods-item', {
	props: ['product'],
	template: `<div class="goods-item p-3 bg-light border-warning mx-3 animated" @mouseover="mouseOver($event)"
			   @mouseout="mouseOut($event)">
			       <h3 class='goods-name'>{{ product.product_name }}</h3>
				   <p class='goods-price'>{{ product.price }}</p>
				   <button :name="product.id_product" class="btn btn-danger btn-sm add-basket-btn" 
				   @click="addProductInBasket($event)">В корзину</button>
		       </div>`,
	methods: {
		addProductInBasket(event) {
			bus.$emit('add-basket-product', event);
		},
		mouseOver(event) {
			bus.$emit('add-animate', event);
		},
		mouseOut(event) {
			bus.$emit('remove-animate', event);
		}
	}
});

Vue.component('search-block', {
	props: ['searchLine'],
	template: `<form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" @submit.prevent="$emit('start-search')">
		          <input type="search" class="form-control form-control-dark  border-0 rounded-0 rounded-start search-field"
		           placeholder="Search..." aria-label="Search" :value="searchLine"
		           v-on:input="$emit('input', $event.target.value)">
		          <button type="button" class="btn btn-light border-0 rounded-0 rounded-end bg-white search-btn">
		          	<i class="fad fa-search" @click="$emit('start-search')"></i>
		          </button>
		        </form>`,
});

Vue.component('basket-list', {
	props: ['basketArr', 'getPrice', 'getTotalPriceInBasket'],
	template:  `<div>
					<div class="basket-list row-cols-lg-5 d-flex justify-content-center flex-wrap">
				       <basket-item v-for="basketItem in basketArr" :get-price="getPrice" :product="basketItem"></basket-item>
				    </div>
				    <p class="position-static goods-total-price text-center">{{ getTotalPriceInBasket() }}</p>
				</div>`,
});

Vue.component('basket-item', {
	props: ['product', 'getPrice'],
	template: `<div class='basket-item p-3 bg-light border-warning mx-3 animated' @mouseover="mouseOver($event)" 
			   @mouseout="mouseOut($event)">
			       <h3 class='goods-name'>{{ product.product_name }}</h3>
				   <p class='goods-price'>{{ getPrice(product) }}</p>
				   <p class='basket-product-quantity'>Количество:</p>
				   <input class="mb-3 d-block" v-bind:name="product.id_product" type="number" 
				   v-bind:value="product.quantity" @change="updateQuantity($event)">
				   <button v-bind:name="product.id_product" class="btn btn-danger btn-sm remove-basket-btn" 
				   @click="removeProductInBasket($event)">Удалить</button>
			   </div>`,
	methods: {
		removeProductInBasket(event) {
			bus.$emit('remove-basket-product', event);
		},
		updateQuantity(event) {
			bus.$emit('update-quantity-product', event);
		},
		mouseOver(event) {
			bus.$emit('add-animate', event);
		},
		mouseOut(event) {
			bus.$emit('remove-animate', event);
		},
	}		   
});

Vue.component('bad-response-server', {
	template: `<h1 class="text-center text-danger">Ошибка соединения с сервером!!!</h1>`
})

const app = new Vue({
	el: '#app',
	data: {
		goods: [],
		filteredGoods: [],
		searchLine: '',
		basketGoods: [],
		isServerRespond: null

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
				this.isServerRespond = true;
			} else {
				this.isServerRespond = false;
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
			return `Цена: ${product.price * +product.quantity}`;
		},

		/**
		 * Обновить количество товара в корзине.
		 * @param  {integer} quantity Новое кол-во товара.
		 */
		updateQuantity(event) {
			const currentProduct = this.getProductById(event.target.name, this.basketGoods);
			currentProduct.quantity = event.target.value;
			if (event.target.value <= 0) {
				this.removeProductInBasket(event);
				let basketItemElem = event.target.parentNode;
				basketItemElem.style.display = 'none';
			}
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
		bus.$on('add-animate', this.mouseOver);
		bus.$on('remove-animate', this.mouseOut);
		bus.$on('remove-basket-product', this.removeProductInBasket);
		bus.$on('update-quantity-product', this.updateQuantity);
		bus.$on('get-total-price-for-item', this.getTotalPriceForItem);
		bus.$on('search-click-enter', this.filterGoods);
	}, 
});




