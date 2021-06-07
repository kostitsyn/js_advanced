// Заменяем одинарные кавычки на двойные.

const init = () => {
	const regexp = /'/g;
	const originalText  = document.querySelector('.original-text').innerText;
	const modifyText = originalText.replace(regexp, '"');
	document.querySelector('.modify-text').innerText = modifyText;
}

window.onload = init;