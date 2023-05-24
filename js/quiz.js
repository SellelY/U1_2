async function quizPage() {
    const userName = localStorage.getItem("username");

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

    responseContainer.classList.add("hidden");
    responseP.textContent = "";

    try {
        const breedList = ALL_BREEDS.map(breed => breed.url);
        const randomBreedUrl = breedList[Math.floor(Math.random() * breedList.length)];
        const randomBreed = ALL_BREEDS.find(breed => breed.url === randomBreedUrl);

        const adjustedUrl = randomBreed.url;

        const response = await fetch(`https://dog.ceo/api/breed/${adjustedUrl}/images/random`);
        const data = await response.json();

        const container = document.querySelector("#image");
        const imageElement = document.createElement("img");
        imageElement.src = data.message;
        container.appendChild(imageElement);

        const altContainer = document.querySelector("#alternatives");
        const alt = [randomBreed.name];

        while (alt.length < 4) {
            const randomAlt = breedList[Math.floor(Math.random() * breedList.length)];
            const altBreed = ALL_BREEDS.find(breed => breed.url === randomAlt);
            if (!alt.includes(altBreed.name)) {
                alt.push(altBreed.name);
            }
        }

        alt.forEach((alternative) => {
            const button = document.createElement("button");
            button.textContent = alternative;
            button.className = (alternative === randomBreed.name) ? "correct" : "";
            altContainer.appendChild(button);

            if (Math.random() < 0.25) {
                button.className = (alternative === randomBreed.name) ? "correct" : "";
            }
        });


    } catch (error) {
        console.log("Error:", error);
    }
    
}