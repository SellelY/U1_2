let user = null;
let main = document.querySelector("main");
let responseP = document.querySelector("#response");
let closeBtn = document.querySelector("#closeBtn");
let message = document.querySelector("#message");
let responseContainer = document.querySelector("#containerResponse");
let body = document.querySelector("body");

function loginPage() {
    body.style.backgroundImage = "url('/media/Horizoon.png')";
    
    main.innerHTML = `
        <h2>Login</h2>
        <form>

            <h3>Username</h3>
            <input type=text id=username>
            <h3>Password</h3>
            <input type=password id=password>

            <p id=message>Let the magic start!</p>
            <button id=logRegBtn type=submit>Login</button>

            <button id=register><u>New to this? Register for free</u></button>

        </form>
    `;

    let registerBtn = main.querySelector("#register");
    registerBtn.addEventListener("click", registerPage);

    let loginForm = main.querySelector("form");
    loginForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        responseContainer.classList.remove("hidden");
        closeBtn.classList.add("hidden");
        responseP.textContent = "Connecting server...";

        const formElement = event.target;
        const username = formElement.querySelector("#username").value;
        const password = formElement.querySelector("#password").value;

        const request = new Request(URL + `?action=check_credentials&user_name=${username}&password=${password}`, {
            method: "GET",
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }, 
        });

        const resource = await sendRequest(request);
        if (resource === undefined) {
            console.log(resource);
        } else {
            user = username;
            localStorage.setItem("quizState", "visible");

            responseContainer.classList.add("hidden");
            responseP.textContent = "";
        }
    });
}

async function registerPage() {
    body.style.backgroundImage = "url('/media/worldWater.jpg')";

    main.innerHTML = `


        <h2>Register</h2>
        <form>

            <h3>Username</h3>
            <input type=text id=username>
            <h3>Password</h3>
            <input type=password id=password>

            <p id=message>Ready when you are...</p>
            <button id=logRegBtn type=submit>Register</button>

            <button id=login><u>Already have an account? Login here</u></button>

        </form>

    `;

    let loginBtn = main.querySelector("#login");
    loginBtn.addEventListener("click", loginPage);

    let registerForm = main.querySelector("form");
    registerForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        responseContainer.classList.remove("hidden");
        responseP.textContent = "Connecting...";

        const formElement = event.target;
        const username = formElement.querySelector("#username").value;
        const password = formElement.querySelector("#password").value;

        const request = new Request(URL, {
            method: "POST",
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify({
                action: "register",
                user_name: username,
                password: password
            }),
        });

        const resource = await sendRequest(request);
        if (resource === undefined) {
            console.log(resource);
        } else {
            connectFeedback(200);
        }
    })
}

window.onload = function() {
    const quizState = localStorage.getItem("quizState");
    if (quizState === "visible") {
        quizPage();
    } else {
        loginPage();
        localStorage.setItem("quizState", "hidden");
    }
};