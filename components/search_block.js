export const searchBlock = Vue.component('search-block', {
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
