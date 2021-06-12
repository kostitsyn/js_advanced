Vue.component('spam', {
	props: ['name', 'surname'],
	template: '<p>My name is {{ name }} {{ surname }}</p>',
});


const app = new Vue({
	el: "#app",
	data: {
		myName: 'Sanya',
		mySurname: 'Kostitsyn'

	}
});