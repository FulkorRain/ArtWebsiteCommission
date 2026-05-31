/*
|--------------------------------------------------------------------------
| Add posts here.
|--------------------------------------------------------------------------
*/

const posts = [
    {
        title: "Big title",
        date: "2026-01-1",  //Automatically does the "(x) ago" part, just enter the current date u want it to be
        author: "poetpup",

        image:
            "assets/images/placeholder.png",

        content: `
            TEXT TEXT TEXT
            TEXT TEXT TEXT
            TEXT TEXT TEXT
            <br>
            TEXT TEXT TEXT
        `,

        tags: ["TEXT❤️", "🍀"]
    },

    {
        title: "Big title",
        date: "2026-02-2", //Automatically does the "(x) ago" part, just enter the current date u want it to be
        author: "poetpup",

        image:
            "assets/images/placeholder.png",

        content: `
            TEXT TEXT TEXT
            TEXT TEXT TEXT
            TEXT TEXT TEXT
            <br>
            TEXT TEXT TEXT
        `,

        tags: ["TEXT❤️", "🍀"]
    }
];

/*
|--------------------------------------------------------------------------
| Don't touch anything below this unless u know what ur doing
|--------------------------------------------------------------------------
*/

const container = document.getElementById("posts");

posts.forEach(post => {

    const tagHTML = post.tags
        .map(tag => `<span class="tag">${tag}</span>`)
        .join("");

    const article = document.createElement("article");

    article.className = "post-card";

    article.innerHTML = `
        <img
            class="post-image"
            src="${post.image}"
            alt="${post.title}"
        >

        <div class="post-body">

            <h2 class="post-title">
                ${post.title}
            </h2>

            <div class="post-meta">
                <span>${timeAgo(post.date)}</span>
                <span>${post.author}</span>
            </div>

            <div class="post-content">
                ${post.content}
            </div>

            <div class="post-tags">
                ${tagHTML}
            </div>

        </div>
    `;

    container.appendChild(article);
});

function timeAgo(dateString) {
    const now = new Date();
    const postDate = new Date(dateString);

    const seconds = Math.floor((now - postDate) / 1000);

    const intervals = [
        { label: "year", seconds: 31536000 },
        { label: "month", seconds: 2592000 },
        { label: "week", seconds: 604800 },
        { label: "day", seconds: 86400 },
        { label: "hour", seconds: 3600 },
        { label: "minute", seconds: 60 }
    ];

    for (const interval of intervals) {
        const count = Math.floor(seconds / interval.seconds);

        if (count >= 1) {
            return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
        }
    }

    return "Just now";
}