function theme() {
	//The theme switch
	const themeSwitch = document.querySelector(".switch");
	//The switch indicator
	const ball = document.querySelector(".switch__ball");
	//The root elememnt of the document
	const rootElem = document.documentElement;
	//This variables stores the value of the current theme
	let dataTheme;
	//This variables stores the value of the new theme
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
	//Assigns an event listener to the switch
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
