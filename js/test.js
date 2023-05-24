const urlParams = new URLSearchParams(window.location.search);
const spesContainer = document.querySelector(".spes-katt");
const POSTS_API = "http://kattens-vern.local/wp-json/wp/v2/posts";
const CATG_API = "http://kattens-vern.local/wp-json/wp/v2/categories";

function fetchAPI() {
    const postId = urlParams.get("id");
    fetch(POSTS_API + "/" + postId)
        .then((res) => res.json())
        .then((data) => {
            displayPost(data);
        })
        .catch((error) => console.error(error));
};

function createTextElement(tagName, className, textContent) {
    const element = document.createElement(tagName);
    element.className = className;
    element.textContent = textContent;
    return element;
}

function enlargeImage(imgElement) {
    const modalContainer = document.createElement("div");
    modalContainer.className = "modal-container";

    const enlargedImage = document.createElement("img");
    enlargedImage.src = imgElement.src;
    enlargedImage.className = "enlarged-image";

    modalContainer.appendChild(enlargedImage);
    document.body.appendChild(modalContainer);

    modalContainer.addEventListener("click", function (event) {
        if (event.target === modalContainer) {
            closeModal(modalContainer);
        }
    });
}

function closeModal(modalContainer) {
    document.body.removeChild(modalContainer);
}


function createImageElement(src) {
    const imgElement = document.createElement("img");
    imgElement.src = src;

    imgElement.addEventListener("click", function () {
        enlargeImage(imgElement);
    });

    return imgElement;
}


function fetchCatgDescription(catgId) {
    return fetch(CATG_API + "/" + catgId)
        .then((res) => res.json())
        .then((data) => {
            const catgDesc = data.description;
            return catgDesc;
        })
        .catch((error) => console.error(error));
};

function displayPost(data) {
    const catName = data.title.rendered.split(" ")[0];

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = data.content.rendered;
    const imgEl = tempDiv.querySelector("img");
    const src = imgEl ? imgEl.getAttribute("src") : null;

    const pElements = tempDiv.getElementsByTagName("p");
    const pText = Array.from(pElements).map(p => p.innerHTML).join(" ");

    const fetchedPostContainer = document.createElement("div");
    fetchedPostContainer.className = "fetched-post-container";

    const titleElement = createTextElement("h1", "katt-spes-title normal-heading", `Katter som trenger hjem - ${catName}`);
    fetchedPostContainer.appendChild(titleElement);

    if (src) {
        const imgContainer = document.createElement("div");
        imgContainer.className = "cat-posts-img katt-spes-img";
        const imgElement = createImageElement(src);
        imgContainer.appendChild(imgElement);
        fetchedPostContainer.appendChild(imgContainer);
    }

    const pElement = createTextElement("p", "katt-spes-text", pText);
    fetchedPostContainer.appendChild(pElement);

    spesContainer.appendChild(fetchedPostContainer);

    const catgArr = data.categories;
    const catgProm = catgArr.map((catgId) => fetchCatgDescription(catgId));

    Promise.all(catgProm)
        .then((catgs) => {
            const catgWrapper = document.createElement("div");
            catgWrapper.className = "catg-wrapper";

            catgs.forEach((catg) => {
                const catpawSymbol = document.createElement("div");
                catpawSymbol.className = "catpaw-symbol";

                const categoryElement = document.createElement("div");
                categoryElement.className = "categories";
                const catgTextElement = createTextElement("p", "", catg);
                categoryElement.appendChild(catgTextElement);

                catgWrapper.appendChild(catpawSymbol);
                catgWrapper.appendChild(categoryElement);
            });

            spesContainer.appendChild(catgWrapper);
        })
        .catch((error) => console.error(error));
};

fetchAPI();
