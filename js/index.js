const POSTS_API = "http://kattens-vern.local/wp-json/wp/v2/posts";

let indxdiv = document.querySelector(".homepg-cat-container");

fetch (POSTS_API)
    .then(res => res.json())
    .then(data => {
        data.forEach(post => {
            const postCard = document.createElement("div");
            postCard.classList.add("post-card");
            postCard.innerHTML = `
                <h1>${post.title.rendered}</h1>
            `;
            
        indxdiv.appendChild(postCard);
    });
})
    .catch(error => console.error(error));