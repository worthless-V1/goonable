let folders = [];

const folderView = document.getElementById("folderView");
const galleryView = document.getElementById("galleryView");
const photoGrid = document.getElementById("photoGrid");
const folderTitle = document.getElementById("folderTitle");

const viewer = document.getElementById("viewer");
const viewerImage = document.getElementById("viewerImage");

let currentFolder = [];
let currentIndex = 0;

async function loadGallery() {
const response = await fetch("gallery.json");
const data = await response.json();

folders = data.folders;
renderFolders();

}

function renderFolders() {
folderView.innerHTML = "";

folders.forEach(folder => {
    const div = document.createElement("div");

    div.className = "folder";

    div.innerHTML = `
        <img src="${folder.thumbnail}" alt="${folder.name}">
        <div class="folder-name">${folder.name}</div>
    `;

    div.onclick = () => openFolder(folder);

    folderView.appendChild(div);
});

}

function openFolder(folder) {
folderView.classList.add("hidden");
galleryView.classList.remove("hidden");

folderTitle.textContent = folder.name;

photoGrid.innerHTML = "";

folder.photos.forEach((photo, index) => {
    const img = document.createElement("img");

    img.src = photo;

    img.onclick = () => openViewer(folder.photos, index);

    photoGrid.appendChild(img);
});

}

document.getElementById("backBtn").onclick = () => {
galleryView.classList.add("hidden");
folderView.classList.remove("hidden");
};

function openViewer(photos, index) {
currentFolder = photos;
currentIndex = index;

viewer.classList.remove("hidden");

updateViewer();

}

function updateViewer() {
viewerImage.src = currentFolder[currentIndex];
}

document.getElementById("closeViewer").onclick = () => {
viewer.classList.add("hidden");
};

document.getElementById("prevBtn").onclick = () => {
if (currentIndex > 0) {
currentIndex--;
updateViewer();
}
};

document.getElementById("nextBtn").onclick = () => {
if (currentIndex < currentFolder.length - 1) {
currentIndex++;
updateViewer();
}
};

loadGallery();