export const goodsItem = Vue.component('goods-item', {
	props: ['product', 'basketGoods'],
	template: `<div class="goods-item p-3 bg-light border-warning mx-3 animated" @mouseover="mouseOver($event)"
			   @mouseout="mouseOut($event)">
			       <h3 class='goods-name'>{{ product.product_name }}</h3>
				   <p class='goods-price'>{{ product.price }}</p>
				   <button :name="product.id" class="btn btn-danger btn-sm add-basket-btn" 
				   @click="addProductInBasket($event)">В корзину</button>
		       </div>`,
	data () {
		return {
			localBasketGoods: this.basketGoods
		}
	},
	methods: {
		async addProductInBasket(event) {
			/*bus.$emit('add-basket-product', event);*/
			/*app.addProductInBasket(event);*/
			const bodyRequest = {
					id: +event.target.name,
				};
			const response = await fetch(`${'http://localhost:3000'}/${'addToBasket'}`, {
				method: 'POST',
				mode: 'cors',
				headers: {
					'Content-type': 'application/json;charset=utf-8'
				},
				body: JSON.stringify(bodyRequest)
			});
			const response1 = await fetch('http://localhost:3000/basketData');

			if (response1.ok) {
				const basketItems = await response1.json();
				app.BasketGoods = basketItems;
				this.isServerRespond = true;
			} else {
				this.isServerRespond = false;
			}
			
		},
		mouseOver(event) {
			/*bus.$emit('add-animate', event);*/
			/*app.mouseOver(event);*/
			event.target.classList.add('pulse');

		},
		mouseOut(event) {
			/*bus.$emit('remove-animate', event);*/
			/*app.mouseOut(event);*/
			event.target.classList.remove('pulse');
		}
	}
});