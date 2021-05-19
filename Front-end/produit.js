//Récupération de l'URL
let params = (new URL(document.location)).searchParams;

//Stockage de l'ID dans une variable
const id = params.get("id");

//EMPLACEMENT HTML
let container = document.getElementById("Cameras");
let url = "http://localhost:3000/api/cameras/" + id;
request.open("GET", url , true);
request.send();

request.onreadystatechange = function(){
  if (request.readyState === 4){
    //Récupère toutes les cameras
    let camera = JSON.parse(request.responseText);
    display(camera);
  }
}

// Affichage Option Lentille en HTML
const display = camera => {
  let options = document.getElementById('option');
  for(let lense of camera.lenses){
    options.innerHTML+= '<option value="test">'+ lense +'</option>';
}

// Affichage contenu HTML
Cameras.innerHTML +=`
  <div class="appareil" id="cardsProduct">
    <img src=${camera.imageUrl} alt="">
    <div class="description">
      <p class="nom">${camera.name}</p>
      <span class="appareil-description">${camera.description}</span>
      <p class="prix"> Prix Unitaire: ${camera.price/ 100}€</p>        
      <button type="button" id="panier"> Ajouter au panier </button>
    </div>
  </div>`;
  let btn = document.getElementById('panier');
  btn.onclick = function() {
    if(checkForm()) {
      addToLocalStorage(camera);
      window.location.replace("panier.html");
    }
  }
}

function checkForm(){
  let e = document.getElementById("option").value;
  if(e==="0"){
      alert("Veuillez selectionner un choix de lentilles");
      return false;
  } return true;
}


// Envoi au Local Storage
const addToLocalStorage = (camera) => {
const cameraItem = localStorage.getItem("cameras");
  if (cameraItem){
    cameraArray = JSON.parse(cameraItem);
} else {
    cameraArray=[];
}
cameraArray.push(camera);
localStorage.setItem("cameras", JSON.stringify(cameraArray));
}
