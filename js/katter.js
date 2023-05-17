const POSTS_API = `http://kattens-vern.local/wp-json/wp/v2/posts`;

function fetchAPI() {

  fetch(POSTS_API)
    .then((res) => res.json())
    .then((data) => {

      //fetch first word of heading only and store in new variable

      const catNames = data.map((firstWord) => {
        const firstWords = firstWord.title.rendered.split(" ");
        return firstWords[0];
      })

      //fetch everything but the first word of heading and store in new variable

      const catAges = data.map((restWord) => {
        const restWords = restWord.title.rendered.split(" ");
        const lastWord = restWords.pop();
        const secLastWord = restWords.pop();
        const joinedWords = secLastWord + lastWord;
        return joinedWords;
      })

      //fetch image and store in new variable

      const catImgs = data.map((image) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = image.content.rendered;
        const imgEl = tempDiv.querySelector('img');
        const src = imgEl ? imgEl.getAttribute('src') : null;
        return src;
      });


      //make html markup with the new variables, remember to give classnames for grid and styling later

      data.forEach((post, i) => {
        const postBoxes =
          `
        <div class="cat-posts">
          <img src="${catImgs[i]}">
          <h2 class="catName">${catNames[i]}</h2>
          <p class="catAge">${catAges[i]}</p>
        `

        document.querySelector(".katter-cat-container").innerHTML += postBoxes;
      })

      //make a see more btn which shows the rest (or 10 more) of the content
    })
    .catch((error) => console.error(error));

}

fetchAPI();
//do this once more, use whole day if it needs to
//stikkord:
//.map
//.forEach
//.slice
//.split
//.join