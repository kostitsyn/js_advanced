let bus = new Vue({});

Vue.component('goods-list', {
	props: ['goods', 'getTotalPrice'],
	template: `<div class="goods-list row-cols-lg-5 d-flex justify-content-center mb-5 flex-wrap">
			       <goods-item v-for="goodItem in goods" :product="goodItem" :key="goodItem.id"></goods-item>
			       <p class="goods-total-price">{{ getTotalPrice() }}</p>
			   </div>`,

});

Vue.component('goods-item', {
	props: ['product'],
	template: `<div class="goods-item p-3 bg-light border-warning mx-3 animated" @mouseover="mouseOver($event)"
			   @mouseout="mouseOut($event)">
			       <h3 class='goods-name'>{{ product.product_name }}</h3>
				   <p class='goods-price'>{{ product.price }}</p>
				   <button :name="product.id" class="btn btn-danger btn-sm add-basket-btn" 
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
				       <basket-item v-for="basketItem in basketArr" :get-price="getPrice" :product="basketItem" :key="basketItem.id"></basket-item>
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
				   <input class="mb-3 d-block" v-bind:name="product.id" type="number" 
				   v-bind:value="product.quantity" @change="updateQuantity($event)">
				   <button v-bind:name="product.id" class="btn btn-danger btn-sm remove-basket-btn" 
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
		API_URL: 'http://localhost:3000',
		isServerRespond: null

	},
	methods: {
		/**
		 * Получить данные о товарах с сервера
		 */
		async fetchGoods() {
			const response = await fetch(`${this.API_URL}/catalogData`);

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
		 * Обновить список товаров в корзине.
		 */
		async updateBasketArr() {
			const response = await fetch(`${this.API_URL}/basketData`);

			if (response.ok) {
				const basketItems = await response.json();
				this.basketGoods = basketItems;
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
		async addProductInBasket(event) {

			const bodyRequest = {
				id: +event.target.name,
			};
			await this.sendPostRequest('addToBasket', JSON.stringify(bodyRequest));

			const bodyRequestStatic = {
				action: 'add',
				productName: event.target.parentNode.querySelector('.goods-name').innerText,
			}

			/*await this.sendPostRequest('static', JSON.stringify(bodyRequestStatic));*/
			await this.sendGetRequest('static', bodyRequestStatic);
			

			this.updateBasketArr();
		},


		/**
		 * Проверить, есть ли уже выбранный продукт в корзине.
		 * @param  {object} product Объект продукта.
		 * @return {Boolean}
		 */
		checkIfExistsInBasket(product) {
			/*return this.basketGoods.includes(product);*/
			return Boolean(this.basketGoods.find(item => item.id == product.id));
		},


		/**
		 * Получить объект товара по id.
		 * @param  {integer} productId id товара.
		 * @return {object} Массив товаров.
		 */
		getProductById(productId, array) {
			return array.find(product => product.id == productId);
		},


		/**
		 * Удалить товар из корзины.
		 */
		async removeProductInBasket(event) {
			
			const bodyRequest = {
				id: +event.target.name,
			};
			await this.sendPostRequest('removeToBasket', JSON.stringify(bodyRequest));

			const bodyRequestStatic = {
				action: 'remove',
				productName: event.target.parentNode.querySelector('.goods-name').innerText,
			}

			/*await this.sendPostRequest('static', JSON.stringify(bodyRequestStatic));*/
			await this.sendGetRequest('static', bodyRequestStatic);

			this.updateBasketArr();
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
		async updateQuantity(event) {
			const bodyRequest = {
				id: +event.target.name,
			    quantity: +event.target.value
			};

			await this.sendPostRequest('addToBasket', JSON.stringify(bodyRequest));

			if (event.target.value <= 0) {
				const bodyRequest = {
					id: event.target.name
				};
				await this.sendPostRequest('removeToBasket', JSON.stringify(bodyRequest));
			}
			this.updateBasketArr();
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


		/**
		 * Отправить POST запрос.
		 * @param  {string} route       Роут на который отправляется запрос.
		 * @param  {string} bodyRequest JSON строка с данными запроса.
		 */
		async sendPostRequest(route, bodyRequest) {
			const response = await fetch(`${this.API_URL}/${route}`, {
				method: 'POST',
				mode: 'cors',
				headers: {
					'Content-type': 'application/json;charset=utf-8'
				},
				body: bodyRequest
			});
		},


		/**
		 * Отправить GET запрос с параметрами.
		 * @param  {string} route       Роут на который отправляется запрос.
		 * @param  {string} bodyRequest JSON строка с данными запроса.
		 */
		async sendGetRequest(route, bodyRequest) {
			let url = new URL(`${this.API_URL}/${route}`);
			url.search = new URLSearchParams(bodyRequest);
			const response = await fetch(url);
		}
	},

	async mounted() {
		await this.fetchGoods();
		await this.updateBasketArr();
		bus.$on('add-basket-product', this.addProductInBasket);
		bus.$on('add-animate', this.mouseOver);
		bus.$on('remove-animate', this.mouseOut);
		bus.$on('remove-basket-product', this.removeProductInBasket);
		bus.$on('update-quantity-product', this.updateQuantity);
		bus.$on('get-total-price-for-item', this.getTotalPriceForItem);
		bus.$on('search-click-enter', this.filterGoods);
	}, 
});




