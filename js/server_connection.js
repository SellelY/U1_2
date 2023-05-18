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
        message.innerHTML = "Registration is successful!";
    } else if(status === 409) {
        message.innerHTML = `Sorry, the name is already taken`;

    } else if(status === 418) {
        message.innerHTML = `The server thinks it's not a teapot!`;
    } else {
        //!! KOLLA HÄR
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