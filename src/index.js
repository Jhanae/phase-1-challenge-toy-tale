let addToy = false;
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
const renderToy = toy => {
  let main = document.getElementById("toy-collection");
  let card = document.createElement("div");
  let name = document.createElement("h2");
  let image = document.createElement("img");
  let likes = document.createElement("p");
  let likeButton = document.createElement("button");
  card.classList.add("card");
  name.textContent = toy.name;
  image.src = toy.image;
  image.classList.add("toy-avatar");
  likes.textContent = `${toy.likes} Likes`;
  likeButton.classList.add("like-btn");
  likeButton.id = toy.id;
  likeButton.textContent = "Like";
  card.append(name, image, likes, likeButton);
  main.append(card);
  likeButton.addEventListener("click", () => {
    toy.likes++;
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        likes: toy.likes
      })
    })
    .then(res => res.json())
    .then(data => {
      likes.innerHTML = `${data.likes} Likes`
    })
    .catch(error => console.error("Error:", error));
  })
}
document.querySelector(".add-toy-form").addEventListener("submit", e => {
  e.preventDefault();
  postToy(e);
})
const postToy = toy => {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: toy.target[0].value,
      image: toy.target[1].value,
      likes: 0
    })
  })
  .then(res => res.json())
  .then(data => renderToy(data))
  .catch(error => console.error("Error:", error));
}
fetch("http://localhost:3000/toys")
.then(res => res.json())
.then(data => data.forEach(renderToy))
.catch(error => console.error("Error:", error));
});