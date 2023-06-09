const POSTS_API = "https://kv.sarahanjaheuer.no/wp-json/wp/v2/posts";
const catContainer = document.querySelector(".homepg-cat-container");
let page = 1;
let limit = 4;
let totalPosts = 0;


function fetchAPI() {

    fetch(POSTS_API + "?page=" + page + "&per_page=" + limit)
        .then((res) => res.json())
        .then((data) => {
            totalPosts = data.length;
            displayPosts(data);
            page++;
        })
        .catch((error) => console.error(error));
}

fetchAPI();

function displayPosts(data) {

    const catNames = data.map((firstWord) => {
        const firstWords = firstWord.title.rendered.split(" ");
        return firstWords[0];
    });

    const catAges = data.map((restWord) => {
        const restWords = restWord.title.rendered.split(" ");
        const lastWord = restWords.pop();
        const secLastWord = restWords.pop();
        const joinedWords = secLastWord + " " + lastWord;
        return joinedWords;
    });

    const catImgs = data.map((image) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = image.content.rendered;
        const imgEl = tempDiv.querySelector('img');
        const src = imgEl ? imgEl.getAttribute('src') : null;
        return src;
    });

    data.forEach((post, i) => {
        const postBoxes = `
        <a href="katt-spes.html?id=${post.id}">
        <div class="cat-posts">
          <div class="cat-posts-img"><img src="${catImgs[i]}"></div>
          <h2 class="cat-name">${catNames[i]}</h2>
          <p class="cat-age">${catAges[i]}</p>
        `
        catContainer.innerHTML += postBoxes;
    });

};

