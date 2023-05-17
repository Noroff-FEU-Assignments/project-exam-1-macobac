const POSTS_API = `http://kattens-vern.local/wp-json/wp/v2/posts`;
const catContainer = document.querySelector(".katter-cat-container");
let start = 0;
let limit = 10;

function fetchAPI() {

  fetch("http://kattens-vern.local/wp-json/wp/v2/posts?start=${start}&limit=${limit}")
    .then((res) => res.json())
    .then((data) => {
      displayPosts(data);
      start += limit;
    })
    .catch((error) => console.error(error));
}

fetchAPI();

function displayPosts(data) {

  const catNames = data.map((firstWord) => {
    const firstWords = firstWord.title.rendered.split(" ");
    return firstWords[0];
  })

  const catAges = data.map((restWord) => {
    const restWords = restWord.title.rendered.split(" ");
    const lastWord = restWords.pop();
    const secLastWord = restWords.pop();
    const joinedWords = secLastWord + lastWord;
    return joinedWords;
  })

  const catImgs = data.map((image) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = image.content.rendered;
    const imgEl = tempDiv.querySelector('img');
    const src = imgEl ? imgEl.getAttribute('src') : null;
    return src;
  })

  data.forEach((post, i) => {
    const postBoxes = `
      <div class="cat-posts">
        <img src="${catImgs[i]}">
        <h2 class="catName">${catNames[i]}</h2>
        <p class="catAge">${catAges[i]}</p>
      `
    catContainer.innerHTML += postBoxes;
  });
}

const moreBtn = document.createElement("button");
moreBtn.innerText = "Se flere";
moreBtn.addEventListener("click", () => {
  fetchAPI();
});
catContainer.appendChild(moreBtn);



//stikkord:
//.map
//.forEach
//.slice
//.split
//.join