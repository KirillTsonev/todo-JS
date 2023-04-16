function tutorial() {
	const messages = document.querySelectorAll(".tutorial__message");
	const buttonsNext = document.querySelectorAll(".next");
	const buttonsBack = document.querySelectorAll(".back");
	const help = document.querySelector(".header__help");

	if (!localStorage.getItem("tutorial")) {
		messages[0].classList.toggle("active");
	}

	function nextMessage(item) {
		const i = [...buttonsNext].indexOf(item);

		if (i === 5) {
			messages[i].classList.remove("active");
			localStorage.setItem("tutorial", "done");
		} else {
			messages[i].classList.remove("active");
			messages[i + 1].classList.add("active");
		}
	}

	function prevMessage(item) {
		const i = [...buttonsBack].indexOf(item);

		messages[i].classList.toggle("active");
		messages[i + 1].classList.toggle("active");
	}

	buttonsNext.forEach((a) => {
		a.addEventListener("click", () => {
			nextMessage(a);
		});
	});

	buttonsBack.forEach((a) => {
		a.addEventListener("click", () => {
			prevMessage(a);
		});
	});

	help.addEventListener("click", () => {
		localStorage.removeItem("tutorial");
		messages[0].classList.toggle("active");
	});
}

export default tutorial;
