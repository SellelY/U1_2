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

        const userName = resource.data.user_name;
        console.log(userName);
        if (userName) {
            localStorage.setItem("username", userName);
            quizPage();
        }
    }

    return tempResource;
}

//message div
function connectFeedback(status) {
    responseP.textContent = "";
    let message = document.querySelector("#message");

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
        responseContainer.classList.add("hidden");
        closeBtn.classList.add("hidden");
        message.textContent = "Wrong username or password";
        message.style.backgroundColor = "white";
    }

    closeBtn.addEventListener("click", () => {
        responseContainer.classList.add("hidden");
        loginPage();
    })
}