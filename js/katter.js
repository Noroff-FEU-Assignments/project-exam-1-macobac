const POSTS_API = `http://kattens-vern.local/wp-json/wp/v2/posts`;


  fetch(POSTS_API)
    .then((res) => res.json())
    .then((data) => { })
    .catch((error) => console.error(error));

//do this once more, use whole day if it needs to
//stikkord:
//.map
//.forEach
//.slice
//.split
//.join