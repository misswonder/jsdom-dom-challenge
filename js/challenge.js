const likes = {};
let interval;

const decrementCounter = () => {
  const element = document.getElementById("counter");
  const value = parseInt(element.innerText, 10);

  element.innerText = `${value - 1}`;
};

const incrementCounter = () => {
  const element = document.getElementById("counter");
  const value = parseInt(element.innerText, 10);

  element.innerText = `${value + 1}`;
};

const likeCounter = () => {
  const element = document.getElementById("counter");
  const currentLikes = likes[element.innerText] ?? 0;

  likes[element.innerText] = currentLikes + 1;
  updateLikes();
};

const updateLikes = () => {
  const ul = document.getElementsByClassName("likes")[0];
  ul.innerHTML = "";

  for (likedCounter in likes) {
    const li = document.createElement("li");
    li.innerText = `${likedCounter} has been liked ${likes[likedCounter]} time`;
    ul.appendChild(li);
  }
};

const toggleCounter = () => {
  const isPaused = interval === undefined;

  if (isPaused) {
    document.getElementById("pause").innerText = "pause";
    interval = setInterval(incrementCounter, 1000);
    for (button of document.getElementsByTagName("button")) {
      button.removeAttribute("disabled");
    }
  } else {
    document.getElementById("pause").innerText = "resume";
    clearInterval(interval);
    interval = undefined;

    for (button of document.getElementsByTagName("button")) {
      if (button.getAttribute("id") !== "pause") {
        button.setAttribute("disabled", "disabled");
      }
    }
  }
};

const submitComment = (event) => {
  event.preventDefault();
  const comment = event.target.comment.value;
  const list = document.getElementById("list");
  const p = document.createElement("p");
  p.innerText = comment;

  list.appendChild(p);
  event.target.comment.value = "";
};

interval = setInterval(incrementCounter, 1000);
document.getElementById("minus").addEventListener("click", decrementCounter);
document.getElementById("plus").addEventListener("click", incrementCounter);
document.getElementById("heart").addEventListener("click", likeCounter);
document.getElementById("pause").addEventListener("click", toggleCounter);
document
  .getElementById("comment-form")
  .addEventListener("submit", submitComment);
