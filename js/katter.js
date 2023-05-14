const POSTS_API = "http://kattens-vern.local/wp-json/wp/v2/posts";

fetch(POSTS_API)
    .then(res => res.json())
    .then(data => {
        const catNames = data.map(post => {
            const splits = post.title.rendered.split(" ");
            return splits[0];
        });

        const catAges = data.map(post => {
            const splits = post.title.rendered.split(" ");
            const catAge = splits.slice(1).join(" ");
            return catAge;
        });

        const catImgs = data.map(post => {
            const content = post.content.rendered;
            const regex = /<img.*?src="(.*?)"/;
            const match = content.match(regex);
            return match ? match[1] : null;
        });

        data.forEach((post, index) => {
            const html = `
              <div class="post">
              <img src="${catImgs[index]}">
                <h2>${catNames[index]}</h2>
                <p>${catAges[index]}</p>
              </div>
            `;
            document.querySelector(".katter-cat-container").innerHTML += html;
        });
    })
    .catch(error => console.error(error));

//slice img og store i en ny variable som kan ha forskjellig value ettersom hvilken katt det er. valuen må settes i en loop i function, men declaration kan skje utenom da vi trenger å style det?

//slice første ordet av tittelen til å bli egen variabel, resten av tittelen til å bli egene variabel