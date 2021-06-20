const pow = (a, n) => {
	if (a === null || n === null) {
		return null;
	}
	let result = 1;
	for (let i = 1; i <= n; i++) {
		result *= a;
	}
	return result;
}

console.log(pow(2, 123));
console.log(pow(2, null));
module.exports = {
	pow: pow
}
