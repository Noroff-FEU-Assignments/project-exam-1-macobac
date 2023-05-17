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
}

fetchAPI();



function displayPost(data) {

    const catName = data.title.rendered.split(" ")[0];

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = data.content.rendered;
    const imgEl = tempDiv.querySelector('img');
    const src = imgEl ? imgEl.getAttribute('src') : null;

    const pText = data.content.rendered.split("<p>").pop().split("</p>");
    //OBS det funker ikke når man har flere p tags, fikse eller bare ha alt i 1 tag isaafall?

    const fetchedPost = `
        <h1 class="katt-spes-title">Katter som trenger hjem - ${catName}</h1>
        <img src="${src}">
        <p class="katt-spes-text">${pText}</p>
        `
        ;

    spesContainer.innerHTML += fetchedPost;

    const catgArr = data.categories;
    const catgProm = catgArr.map((catgId) => getCategory(catgId));

    Promise.all(catgProm)
        .then((catgs) => {
            const fetchedCatgs = `
            <div class="categories">
            ${catgs.map((catg) => "<p>" + catg + "</p>").join("")}
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

//modal should appear when images on blog post are clicked, making image bigger. click outside img to hide modal