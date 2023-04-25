function loginPage() {
    main.innerHTML = `

        <h2>Login</h2>
        <form>

            <h3>Username</h3>
            <input type=text id=username>
            <h3>Password</h3>
            <input type=password id=password>

            <p id=message><p>
            <button type=submit>Login</button>

            <button id=register><u>New to this? Register for free</u></button>

        </form>

    `;

    let registerBtn = main.querySelector("#register");
    registerBtn.addEventListener("click", registerPage);

    let loginForm = main.querySelector("form");
    loginForm.addEventListener("submit", async function(event) {

        event.preventDefault();
        let message = main.querySelector("#message");

        try {

            let response = await fetch(URL, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    username: this.elements.username.value,
                    password: this.elements.password.value,
                }),
            });

            let data = await response.json();
            
            if (response.ok) {
                window.localStorage.setItem("loginOrQuiz", JSON.stringify(data));
                user = data;
                quizPage();
            } else {
                connectFeedback(response.status);
                message.innerHTML = `Wrong username or password.`;
            }
        } catch (error) {
            message.textContent = `Error: ${error.message}`;
        }
    });
}
//!! ta bort
loginPage();

async function attemptLogin() {
    
    try {
        let response = await fetch(URL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username: user.username,
                password: user.password,
            }),
        });

        let data = await response.json();

        if (response.ok) {
            window.localStorage.setItem("loginOrQuiz", JSON.stringify(data));
            user = data;
            quizPage();
        } else {
            loginPage;
        }
    } catch (error) {
        loginPage();
    }
}