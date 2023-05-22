async function quizPage() {
    let user = JSON.parse(localStorage.getItem("user"));

    main.innerHTML = `
        <div id=meNav>
            <p id=user_name>${user}</p>
            <button id=logout>logout</button>
        </div>

        <div id=container>
            <div id=image></div>
            <div id=alternatives></div>
        </div>
    `;

    let logout = document.querySelector("#logout");
    logout.addEventListener("click", () => {
        window.localStorage.clear();
        user = null;
        loginPage();
    })


    
}