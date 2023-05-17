const urlParams = new URLSearchParams(window.location.search);
const spesContainer = document.querySelector(".spes-katt");
const POSTS_API = "http://kattens-vern.local/wp-json/wp/v2/posts";


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

    const fetchedPost = `
        <h1 class="katt-spes-title">${data.title.rendered}</h1>
        `
        ;
    spesContainer.innerHTML += fetchedPost;

};


//title has to change
//modal should appear when images on blog post are clicked, making image bigger. click outside img to hide modal