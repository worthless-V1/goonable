const container = document.getElementById("folders-container");

async function loadFolders() {

    const { data, error } = await supabaseClient
        .from("folders")
        .select("*")
        .order("created_at");

    if(error){
        console.error(error);
        return;
    }

    container.innerHTML = "";

    data.forEach(folder => {

        const card = document.createElement("div");
        card.className = "folder";

        card.innerHTML = `
            <img src="${folder.thumbnail || 'assets/default-folder.png'}">
            <div class="folder-name">
                📁 ${folder.name}
            </div>
        `;

        card.onclick = () => {
            alert("Folder: " + folder.name);
        };

        container.appendChild(card);

    });
}

loadFolders();