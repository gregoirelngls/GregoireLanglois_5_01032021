let request = new XMLHttpRequest();
request.open("GET", "http://localhost:3000/api/cameras", true);
request.send();

request.onreadystatechange = function(){
    if (request.readyState === 4){
        //Récupère toutes les cameras
        let cameras = JSON.parse(request.responseText);
        console.log(cameras);
        renderHTML(cameras)
    }
}

function renderHTML(cameras) { //fonction de création du contenu HTML
    const div = document.createElement('div'); //création de la div qui accueillera le contenu
        for (i = 0; i < cameras.length; i++) { //exécute la fonction pour chaque App photo.
            div.innerHTML += `<div class="camera"> 
            <a class="buttonAjouter" href="produit.html?id=${cameras[i]._id}">
            <img src= ${cameras[i].imageUrl} alt = "app" class="camera-img" \>
            <h2 class="card-title"> ${cameras[i].name}</h2>
            <p class="card-text">${cameras[i].description}</p>
            <p class="card-price">${cameras[i].price /100} €</p>
            </a>
            </div>`
        }
    const sectionCameras = document.getElementById("Cameras") //Récupération de l'ID Cameras pour y placer le contenu
    sectionCameras.appendChild(div); //le contenu (ci-dessus) est placé dans la div "Cameras"(html)
};
    










