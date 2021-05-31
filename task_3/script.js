class Hamburger {
	constructor(size, stuffing) {
		this.size = size;
		this.stuffing = stuffing;
		this.topping; 
	}
	/**
	 * Добавить приправу
	 * @param {[string]} topping [description]
	 */
	addTopping(topping) {
		this.topping = topping;
	}
}