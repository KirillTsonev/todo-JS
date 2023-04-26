function theme() {
	const themeSwitch = document.querySelector(".switch");
	const ball = document.querySelector(".switch__ball");
	const rootElem = document.documentElement;
	let dataTheme;
	let newTheme;
	//If localStorage already has a theme stored, sets this theme for the website and sets the switch indicator to the appropriate position
	if (localStorage.getItem("newTheme") === "dark") {
		ball.classList.add("switch__ball-firstRender");
		newTheme = "dark";
		rootElem.setAttribute("data-theme", newTheme);
	} else {
		newTheme = "light";
		rootElem.setAttribute("data-theme", newTheme);
	}

	function toggleTheme() {
		//Grabs the current theme
		dataTheme = rootElem.getAttribute("data-theme");
		//Sets the new theme as the opposite of the current theme
		newTheme = dataTheme === "light" ? "dark" : "light";
		//Sets the new theme in to localStorage
		localStorage.setItem("newTheme", newTheme);
		//Changes the theme of the website to the new theme
		rootElem.setAttribute("data-theme", newTheme);
	}

	themeSwitch.addEventListener("click", () => {
		if (ball.classList.contains("switch__ball-firstRender")) {
			ball.classList.remove("switch__ball-firstRender");
			ball.classList.add("switch__ball-right");
		}
		ball.classList.toggle("switch__ball-right");
		toggleTheme();
	});
}

export default theme;
