var request = new XMLHttpRequest();
request.open("GET", "http://localhost:3000/api/cameras", true);
request.send();

request.onreadystatechange = function(){
    if (request.readyState === 4){
       // document.getElementById('Cameras').innerHTML = (request.responseText)
       //console.log(request.responseText);


        //Récupère toutes les cameras
        let cameras = JSON.parse(request.responseText);
        console.log(cameras);
        renderHTML(cameras)
    }
}

// //function createDivCamera (camera) {
//     //debug
//     console.log("id" + camera._id);
//     console.log(camera);
//     //créer une div 
//     const divParent = document.createElement("div");
//     //récupère id camera parent
//     let sectionCameras = document.getElementById("Cameras");
//     //ajouter un id à ma div parent
//     divParent.setAttribute("id", camera._id);
//     //mettre la div parent dans la div sectionCameras
//     sectionCameras.appendChild(divParent);
//     //créer une figure
//     const myFigure = document.createElement('figure');
//     // je recupère le tag name "divParent"
//     let figure = document.getElementById("divparent");
//     // j'ajoute la figure à la div parent
//     divParent.appendchild(myFigure);
//     // créeation d'une figcaption
//     const myFigcaption = document.createElement('Figcaption');
//     // je recupère la figure
//     let Figcaption = document.getElementById("figure");
//     // j'ajoute la Figcaption à ma figure
//     Figure.appendchild(myFigcaption);
//     // je créer un lien "a"
//     const myLink = document.createElement('a');
//     //j'ajoute mon lien "a" à ma figcaption
//     Link.appendchild(myLink);

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
        const sectionCameras = document.getElementById("Cameras")
        sectionCameras.appendChild(div); //le contenu (ci-dessus) est placé dans la div "Cameras"(html)
    };
    
    










