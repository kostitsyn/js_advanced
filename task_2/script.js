// Заменяем одинарные кавычки на двойные.

const init = () => {
	const regexp = /'^([\w']['\w])/g;
	/*const regexp = /'/g;*/
	const originalText  = document.querySelector('.original-text').innerHTML;
	const modifyText = originalText.replace(regexp, '"');
	document.querySelector('.modify-text').innerHTML = modifyText;
}

window.onload = init;