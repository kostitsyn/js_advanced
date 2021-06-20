export const basketList = Vue.component('basket-list', {
		props: ['basketArr', 'getPrice', 'getTotalPrice'],
		template:  `<div>
						<div class="basket-list row-cols-lg-5 d-flex justify-content-center flex-wrap">
					       <basket-item v-for="basketItem in basketArr" :get-price="getPrice" :product="basketItem"></basket-item>
					    </div>
					    <p class="position-static goods-total-price text-center">{{ getTotalPrice() }}</p>
					</div>`,
	});
