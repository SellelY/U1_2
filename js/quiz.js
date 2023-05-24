async function quizPage() {
    responseContainer.classList.remove("hidden");
    closeBtn.classList.add("hidden");
    responseP.textContent = "Getting random image...";

    const userName = localStorage.getItem("username");
    body.style.backgroundImage = "url('/media/Horizoon.png')";

    main.innerHTML = `
    <div id=meNav>
        <p id=user_name>${userName}</p>
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

    try {

        const breedList = ALL_BREEDS.map(breed => breed.url);
        const randomBreedUrl = breedList[Math.floor(Math.random() * breedList.length)];
        const randomBreed = ALL_BREEDS.find(breed => breed.url === randomBreedUrl);

        const adjustedUrl = randomBreed.url;

        const placeholderImage = document.createElement("img");
        placeholderImage.src = "/media/logo.png";
        const container = document.querySelector("#image");
        container.appendChild(placeholderImage);

        const fetchDelay = 600;
        setTimeout(async () => {
            const response = await fetch(`https://dog.ceo/api/breed/${adjustedUrl}/images/random`);
            const data = await response.json();

            container.removeChild(placeholderImage);

            const imageElement = document.createElement("img");
            imageElement.src = data.message;
            container.appendChild(imageElement);
        }, fetchDelay);

        const altContainer = document.querySelector("#alternatives");
        const alt = [randomBreed.name];

        responseContainer.classList.add("hidden");

        while (alt.length < 4) {
            const randomAlt = breedList[Math.floor(Math.random() * breedList.length)];
            const altBreed = ALL_BREEDS.find(breed => breed.url === randomAlt);
            if (!alt.includes(altBreed.name)) {
                alt.push(altBreed.name);
            }
        }

        const randomAlt = alt.sort(() => Math.random() - 0.5);

        randomAlt.forEach((alternative) => {
            const button = document.createElement("button");
            button.textContent = alternative;
            button.className = (alternative === randomBreed.name) ? "correct" : "";
            altContainer.appendChild(button);

            let btn = document.getElementById("closeBtn");
            button.addEventListener("click", () => {
                responseContainer.classList.remove("hidden");
    
                if (button.classList.contains("correct")) {
                    responseP.innerHTML = "CORRECT!";
                    btn.classList.remove("hidden");
                    btn.textContent = "ONE MORE"

                    let background = document.querySelector("#responseBox")
                    background.style.backgroundColor = "#7dcb6e";
                } else {
                    responseP.innerHTML = "I'm afraid not...:-(";
                    btn.classList.remove("hidden");
                    btn.textContent = "ONE MORE"

                    let background = document.querySelector("#responseBox")
                    background.style.backgroundColor = "#d13e3e";
                }

                btn.addEventListener("click", () => {
                    responseContainer.classList.remove("hidden");
                    closeBtn.classList.add("hidden");
                    responseP.textContent = "Getting a random image...";

                    let background = document.querySelector("#responseBox")
                    background.style.backgroundColor = "#white";

                    location.reload();
                }) 
            })
        });


    } catch (error) {
        console.log("Error:", error);
    }   
}