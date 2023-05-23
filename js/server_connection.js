async function sendRequest(POSTorGET) {
    const response = await fetch(POSTorGET);
    console.log(response);

    let tempResource;

    if(!response.ok) {
        connectFeedback(response.status);
    } else {
        const resource = await response.json();
        tempResource = resource;
        console.log(resource);
    }

    return tempResource;
}

//message div
function connectFeedback(status) {
    let responseBox = document.querySelector("#responseBox");
    responseP.textContent = "";

    if(status === 200) {
        closeBtn.classList.remove("hidden");
        responseP.innerHTML = "Registration complete! Please proceed to login.";
    } else if(status === 409) {
        closeBtn.classList.remove("hidden");
        responseP.innerHTML = `Sorry, the name is already taken. Please try with another one.`;
    } else if(status === 418) {
        closeBtn.classList.remove("hidden");
        responseP.innerHTML = `The server thinks it's not a teapot!`;
    } else {
        closeBtn.classList.add("hidden");
        message.textContent = "Wrong username or password";
    }

    closeBtn.addEventListener("click", () => {
        responseBox.classList.add("hidden");

        if (!window.localStorage.getItem("user")) {
            loginPage();
        } else {
            user = JSON.parse(window.localStorage.getItem("user"));
            attemptLogin();
        }
    })
}