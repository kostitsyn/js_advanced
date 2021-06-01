'use strict';
class Hamburger {
	constructor(size, stuffing) {
		this.sizeType = {
			small: {price: 50, calories: 20},
			big: {price: 100, calories: 40}

		}
		this.stuffingType = {
			cheese: {price: 10, calories: 20},
			salad: {price: 20, calories: 5},
			potato: {price: 15, calories: 10}
		}
		this.toppingType = {
			spice: {price: 15, calories: 0},
			mayo: {price: 20, calories: 5}
		}
		this._size = this.validateSize(size);
		this._stuffing = this.validateStuffing(stuffing);
		this.toppings = [];
			
	}

	validateSize(size) {
		if (!(size in this.sizeType)) {
			alert(`Размер '${size}' для гамбургера недоступен!`);
		}else {
			return size;
		}
	}

	validateStuffing(stuffing) {
		if (!(stuffing in this.stuffingType)) {
			alert(`Начинка '${stuffing}' недоступна!`);
		}else {
			return stuffing;
		}
	}


	set size(value) {
		if (!(value in this.sizeType)) {
			alert(`Размер '${value}' для гамбургера недоступен!`);
		}else {
			this._size = value;
		}
	}

	set stuffing(value) {
		if (!(value in this.stuffingType)) {
			alert(`Начинка ${value} недоступна!`);
		}else {
			this._stuffing = value;
		}
	}

	/**
	 * Добавить приправу.
	 * @param {string} topping Название приправы.
	 */
	addTopping(topping) {
		if (!(topping in this.toppingType)) {
			alert(`Приправа ${topping} недоступна!`);
		}else {
			this.toppings.push(topping);
		}
	}

	/**
	 * Убрать приправу.
	 * @param  {string} topping Название приправы.
	 */
	removeTopping(topping) {
		if (!(topping in this.toppings)) {
			alert(`Приправа ${topping} отстутствует для данного гамбургера!`);
		}else {
			this.topping.pop(topping);
		}
	}

	/**
	 * Получить список приправ.
	 * @return {string} Строка с названиями приправ.
	 */
	getToppings() {
		return this.topping.join(' ');
	}

	/**
	 * Получить размер гамбургера.
	 * @return {string} Размер гамбургера.
	 */
	getSize() {
		return this._size;
	}

	/**
	 * Получить данные о начинке гамбургера.
	 * @return {string} Начинка гамбургера.
	 */
	getStuffing() {
		return this._stuffing;
	}

	/**
	 * Узнать цену гамбургера.
	 * @return {integer} Цена гамбургера.
	 */
	calculatePrice() {
		let totalPrice = this.sizeType[this._size].price + this.stuffingType[this._stuffing].price;
		let toppingsPrice = 0;
		for (let topping of this.toppings) {
			toppingsPrice += this.toppingType[topping].price;
		}
		totalPrice += toppingsPrice;
		return totalPrice;
	}

	/**
	 * Узнать калорийность гамбургера.
	 * @return {integer} Калорийность гамбургера.
	 */
	calculateCalories() {
		let totalCalories = this.sizeType[this._size].calories + this.stuffingType[this._stuffing].calories;
		let toppingsCalories = 0;
		for (let topping of this.toppings) {
			toppingsCalories += this.toppingType[topping].calories;
		}
		totalCalories += toppingsCalories;
		return totalCalories;
	}

	
}

let size;
while (true) {
	size = prompt('Укажите размер гамбургера:\nб-большой\nм-маленький').toLowerCase();
	if (size == 'б' || size == 'м') {
		break;
	}
}
switch(size) {
	case 'б':
		size = 'big';
		break;
	case 'м':
		size = 'small';
		break;
}

let stuffing;
while (true) {
	stuffing = prompt('Укажите начинку:\n1-сыр\n2-салат\n3-картофель');
	if (stuffing of ['1', '2', '3']) {
		break;
	}
}

const smallHamburger = new Hamburger(size, 'cheese');

// Добавляем ему специи 
smallHamburger.addTopping('spice');
smallHamburger.addTopping('mayo');
console.log(`Цена маленького гамбургера ${smallHamburger.calculatePrice()}р.
	\nЕго калорийность ${smallHamburger.calculateCalories()}`);


// Создаём объект большой гамбургер
const bigHamburger = new Hamburger('big', 'potato');

// Добавляем ему специи 
bigHamburger.addTopping('mayo');
console.log(`Цена большого гамбургера ${bigHamburger.calculatePrice()}р.
	\nЕго калорийность ${bigHamburger.calculateCalories()}`);