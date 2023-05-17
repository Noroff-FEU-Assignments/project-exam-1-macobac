const POSTS_API = "http://kattens-vern.local/wp-json/wp/v2/posts";
const catContainer = document.querySelector(".katter-cat-container");
let page = 1;
let limit = 10;
let totalPosts = 0;

const moreBtn = document.createElement("button");
moreBtn.id = "moreBtn";
moreBtn.innerText = "Se flere";
moreBtn.addEventListener("click", fetchAPI)

function fetchAPI() {

  fetch(POSTS_API + "?page=" + page + "&per_page=" + limit)
    .then((res) => res.json())
    .then((data) => {
      totalPosts = data.length;
      displayPosts(data);
      page++;
      if (data.length < limit || totalPosts < limit) {
        document.getElementById("moreBtn").style.display = "none";
      }
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
    const joinedWords = secLastWord + lastWord;
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
      <div class="cat-posts">
        <img src="${catImgs[i]}">
        <h2 class="catName">${catNames[i]}</h2>
        <p class="catAge">${catAges[i]}</p>
      `
    catContainer.innerHTML += postBoxes;
  });

  if (!moreBtn.parentNode && totalPosts >= limit) {
    catContainer.appendChild(moreBtn);
  } else if (moreBtn.parentNode && totalPosts < limit) {
    moreBtn.parentNode.removeChild(moreBtn);
  }
  
};




//stikkord:
//.map
//.forEach
//.slice
//.split
//.join