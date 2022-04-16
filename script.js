const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photos = [];

// API
const count = 10;
const apiKey = "kTmTLkLNO-2YSZwOF0okXo9lFlk5vdO07R9liKCWXp4";
const apiURL = `https://api.unsplash.com/photos/random?
client_id=${apiKey}&count=${count}
`;

function imageLoaded() {
  imagesLoaded++;
  setAttributes(loader, { hidden: true });
  if (imagesLoaded === totalImages) {
    ready = true;
  }
}

function setAttributes(el, attributes) {
  for (const key in attributes) {
    el.setAttribute(key, attributes[key]);
  }
}

function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photos.length;
  photos.forEach((photo) => {
    const item = document.createElement("a");

    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    const img = document.createElement("img");

    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description || "No title",
      title: photo.alt_description || "No title",
    });

    img.addEventListener("load", imageLoaded);
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

async function getPhotos() {
  try {
    const response = await fetch(apiURL);
    photos = await response.json();
    displayPhotos();
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// onLoad
getPhotos();
