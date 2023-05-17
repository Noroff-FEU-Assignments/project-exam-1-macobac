const POSTS_API = `http://kattens-vern.local/wp-json/wp/v2/posts`;

function fetchAPI() {

fetch(POSTS_API)
  .then((res) => res.json())
  .then((data) => {

    //fetch first word of heading only and store in new variable

    const firstWords = data.map((firstWord) => {
      const catNames = firstWord.title.rendered.split(" ");
      console.log(catNames[0]);
    })

    //fetch everything but the first word of heading and store in new variable

    const restWords = data.map((restWord) => {
      const catAges = restWord.title.rendered.split(" ");
      const lastWord = catAges.pop();
      const secLastWord = catAges.pop();
      console.log(secLastWord, lastWord)
    })
    

    //fetch image and store in new variable

    //make html markup with the new variables, remember to give classnames for grid and styling later

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