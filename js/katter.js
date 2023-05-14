let postsPerPage = 10;
let currentPage = 1;

function fetchPosts() {
  const POSTS_API = `http://kattens-vern.local/wp-json/wp/v2/posts?per_page=${postsPerPage}&page=${currentPage}`;

  fetch(POSTS_API)
    .then((res) => res.json())
    .then((data) => {
      const catNames = data.map((post) => {
        const splits = post.title.rendered.split(" ");
        return splits[0];
      });

      const catAges = data.map((post) => {
        const splits = post.title.rendered.split(" ");
        const catAge = splits.slice(1).join(" ");
        return catAge;
      });

      const catImgs = data.map((post) => {
        const content = post.content.rendered;
        const regex = /<img.*?src="(.*?)"/;
        const match = content.match(regex);
        return match ? match[1] : null;
      });

      data.forEach((post, index) => {
        const html = `
          <div class="post">
            <a href="cat.html?id=${post.id}">
              <img src="${catImgs[index]}">
              <h2>${catNames[index]}</h2>
              <p>${catAges[index]}</p>
            </a>
          </div>
        `;
        document.querySelector(".katter-cat-container").innerHTML += html;
      });

      if (data.length === postsPerPage) {
        const loadMoreButton = document.createElement("button");
        loadMoreButton.innerText = "Load more";
        loadMoreButton.addEventListener("click", () => {
          currentPage++;
          fetchPosts();
        });
        document.querySelector(".katter-cat-container").appendChild(loadMoreButton);
      }
    })
    .catch((error) => console.error(error));
}

fetchPosts();
