//your code here
const images = [
    "https://picsum.photos/id/237/200/300",
    "https://picsum.photos/seed/picsum/200/300",
    "https://picsum.photos/200/300?grayscale",
    "https://picsum.photos/200/300",
    "https://picsum.photos/200/300.jpg"
];

const imageContainer = document.getElementById("image-container");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const message = document.getElementById("para");

let selectedImages = [];

// Utility: shuffle array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Initialize the image grid
function init() {
    // Reset everything
    imageContainer.innerHTML = "";
    selectedImages = [];
    message.textContent = "";
    resetBtn.style.display = "none";
    verifyBtn.style.display = "none";

    // Pick a random image to duplicate
    const duplicateIndex = Math.floor(Math.random() * images.length);
    const duplicateImage = images[duplicateIndex];

    // Prepare 6 images (5 unique + 1 duplicate)
    let displayImages = [...images];
    displayImages.push(duplicateImage);

    // Shuffle the 6 images
    shuffle(displayImages);

    // Create image elements
    displayImages.forEach((src, index) => {
        const img = document.createElement("img");
        img.src = src;
        img.dataset.src = src;
        img.addEventListener("click", () => handleClick(img));
        imageContainer.appendChild(img);
    });
}

// Handle image click
function handleClick(img) {
    if (selectedImages.includes(img)) return; // prevent double-click

    selectedImages.push(img);
    img.classList.add("selected");

    if (selectedImages.length === 1) {
        resetBtn.style.display = "inline-block";
    }

    if (selectedImages.length === 2) {
        verifyBtn.style.display = "inline-block";
    }

    if (selectedImages.length > 2) {
        verifyBtn.style.display = "none";
    }
}

// Reset function
resetBtn.addEventListener("click", () => {
    selectedImages.forEach(img => img.classList.remove("selected"));
    selectedImages = [];
    verifyBtn.style.display = "none";
    resetBtn.style.display = "none";
    message.textContent = "";
});

// Verify function
verifyBtn.addEventListener("click", () => {
    if (selectedImages.length === 2) {
        const result = selectedImages[0].dataset.src === selectedImages[1].dataset.src;
        if (result) {
            message.textContent = "You are a human. Congratulations!";
        } else {
            message.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
        }
        verifyBtn.style.display = "none";
    }
});

// Initialize on page load
init();
// Initialize the image grid
function init() {
    imageContainer.innerHTML = "";
    selectedImages = [];
    message.textContent = "";
    resetBtn.style.display = "none";
    verifyBtn.style.display = "none";

    // Pick a random image to duplicate
    const duplicateIndex = Math.floor(Math.random() * images.length);
    const duplicateImage = images[duplicateIndex];

    // Prepare 6 images (5 unique + 1 duplicate)
    let displayImages = images.map((src, i) => ({ src, class: `img${i + 1}` }));
    displayImages.push({ src: duplicateImage, class: `img${duplicateIndex + 1}` }); // duplicate has same class

    // Shuffle the 6 images
    shuffle(displayImages);

    // Create image elements
    displayImages.forEach((imgObj) => {
        const img = document.createElement("img");
        img.src = imgObj.src;
        img.classList.add(imgObj.class); // assign the required class
        img.dataset.src = imgObj.src;
        img.addEventListener("click", () => handleClick(img));
        imageContainer.appendChild(img);
    });
}

