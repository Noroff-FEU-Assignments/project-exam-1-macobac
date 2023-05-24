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

function catImgModal(e) {
    const modalContainer = document.querySelector(".cat-posts-img #modalContainer");

    if (e.target.tagName === "IMG") {
        modalContainer.classList.add("open-modal");
    } else {
        modalContainer.classList.remove("open-modal");
    }
}

function displayPost(data) {

    const catName = data.title.rendered.split(" ")[0];

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = data.content.rendered;
    const imgEl = tempDiv.querySelector('img');
    const src = imgEl ? imgEl.getAttribute('src') : null;

    const ps = tempDiv.getElementsByTagName("p");
    const pText = Array.from(ps).map(p => p.innerHTML).join(" ");

    const fetchedPost = `
        <h1 class="katt-spes-title normal-heading">Katter som trenger hjem - ${catName}</h1>
        <div class="cat-posts-img katt-spes-img">
        <img src="${src}">
        <div id="modalContainer"></div>
        </div>
        <p class="katt-spes-text">${pText}</p>
        `
        ;

    spesContainer.innerHTML += fetchedPost;


    const catPostsModal = spesContainer.querySelector(".cat-posts-img");
    if (catPostsModal) {
        catPostsModal.addEventListener("click", catImgModal);
    }

    const catgArr = data.categories;
    const catgProm = catgArr.map((catgId) => getCategory(catgId));

    Promise.all(catgProm)
        .then((catgs) => {
            const fetchedCatgs = `
  <div class="catg-wrapper">
            ${catgs.map((catg) => `
                <div class="catpaw-symbol"></div>
                <div class="categories">
                    <p>${catg}</p>
                </div>
            `).join("")}
            </div>
            `
            spesContainer.innerHTML += fetchedCatgs;
        })
        .catch((error) => console.error(error));
};

function getCategory(catgId) {
    return fetch(CATG_API + "/" + catgId)
        .then((res) => res.json())
        .then((data) => {
            const catgDesc = data.description;
            return catgDesc;
        })
        .catch((error) => console.error(error));
};


document.addEventListener("DOMContentLoaded", fetchAPI);