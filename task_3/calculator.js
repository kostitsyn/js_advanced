class Calculator {
	
	/**
	 * Получить сумму.
	 * @return {integer} Сумма двух чисел.
	 */
	getSum(num1, num2) {
		return num1 + num2;
	}

	/**
	 * Получить разницу.
	 * @return {integer} Разница двух чисел.
	 */
	getSub(num1, num2) {
		return num1 - num2;
	}

	/**
	 * Умножить два числа.
	 * @return {integer} Результат умножения двух чисел.
	 */
	getMul(num1, num2) {
		return num1 * num2;
	}

	/**
	 * Разделить два числа.
	 * @return {integer} Результат деления двух чисел.
	 */
	getDiv(num1, num2) {
		return num1 / num2;
	}
}

let calc = new Calculator();
module.exports = {
	calc: calc
}
