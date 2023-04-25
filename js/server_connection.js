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

    if(status === 200) {
        messageDiv.classList.remove("hidden");

        _status.textContent = "Registration is successful!";
        loginButton.disabled = false;

    } else if(status === 409) {
        messageDiv.classList.remove("hidden");
        _status.textContent = "Sorry, the name is already taken";
        loginButton.disabled = false;

    } else if(status === 418) {
        messageDiv.classList.remove("hidden");
        _status.textContent = "The server thinks it's not a teapot!";
        loginButton.disabled = false;

    } else {
        messageDiv.classList.add("hidden");
        wrongPasswordOrUsername.classList.remove("hidden");
        loginButton.disabled = false;

    }

    // show button
    closeButton.style.display = "block";

    closeButton.addEventListener("click", () => {
        messageDiv.classList.add("hidden");
        loginButton.disabled = false;

    });
}