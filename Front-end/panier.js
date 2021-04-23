//// GESTION DU PANIER ////

//EMPLACEMENT DU HTML
let container = document.getElementById("container");

//RECUPERATION DU PANIER DANS LE LOCAL STORAGE ET PARSE LES DONNEES RECUPERER DU LOCALSTORAGE
const cameras = JSON.parse(localStorage.getItem("cameras"));
console.log(cameras);

//RECUPERATION ID PRODUIT
let addIdBasket = [];

//RECUPERATION DU PANIER DANS LE LOCAL STORAGE ET PARSE LES DONNEES RECUPERER DU LOCALSTORAGE
// CREATION DU CONTENU HTML
function allCameras() {
    const cameras = JSON.parse(localStorage.getItem("cameras"));
    let totalPrice = 0; 
    for (let i = 0; i<cameras.length; i++){
        console.log(cameras[i]._id);
        totalPrice += cameras[i].price;
        container.innerHTML += `
        <tr>
            <td class="srcimage"><img src=${cameras[i].imageUrl} alt="" /></td>
            <td>${cameras[i].name}</td>
            <td>${cameras[i].price / 100} €</td>
        </tr>
      `; 
    }
    container.innerHTML+=`
    <tr class="totaux">
    <td> Prix total du panier </td>
    </tr>`
    
    // AFFICHAGE DU PRIX DU PANIER + ENVOI DES DONNEES AU LOCALSTORAGE
    let prixTotal = document.getElementById('finalPrice').textContent = totalPrice/100 + " € ";
    localStorage.setItem('finalPrice', JSON.stringify(prixTotal));
}


allCameras()


// BOUCLE INCREMENT ID PRODUIT
for (let i in cameras){
    console.log(cameras);
    addIdBasket.push(cameras[i]._id);
}

// SUPRESSION TOTAL DU PANIER
document.getElementById("viderPanier").addEventListener("click", deleteAll);

function deleteAll() {
    if (cameras != null) {
      container.remove();
      localStorage.clear();
      window.location.reload();
    }
};



/// GESTION DU FORMULAIRE
function envoiCommande() {
    let form = document.getElementById("form");

/// SI LE FORMULAIRE EST CORRECTEMENT REMPLI ,
/// ET QUE LE PANIER CONTIENT AU MOINS UN ARTICLE, ON VALIDE LES DONNEES DU FORMULAIRE
    if (form.reportValidity() == true && addIdBasket.length>0) {
      let contact = {
        'firstName': document.getElementById("nom").value,
        'lastName': document.getElementById("prenom").value,
        'address': document.getElementById("adresse").value,
        'city': document.getElementById("ville").value,
        'email': document.getElementById("email").value
      };
   
      let products = addIdBasket;
  
      let formulaireClient = JSON.stringify({
        contact,
        products,
      });
  
      // APEL API AVEC FETCH // ENVOIE DES DONNEES AVEC POST // ECHANGE AVEC LE SERVEUR EN MODE ASYNCHRONE
      fetch('http://localhost:3000/api/cameras/order', {
        method: 'POST',
        headers: {
          'content-type': "application/json"
        },
        mode: "cors",
        //ENSEMBLE DE METHODES NOUS PERMETTANT DE GERER LE CORPS DE LA REQUETE ET DE LA REPONSE.
        body: formulaireClient
        })
        // RETOURNE LE DETAIL DE LA REQUETE
        .then(function (response) {
          return response.json()
        })
        // RETOURNE LA REPONSE AVEC LES DONNEES DU FORMULAIRE
        .then(function (r) {
        //ENVOIE DES DONNEES DU FORMULAIRE AU LOCALSTORAGE
          localStorage.setItem("contact", JSON.stringify(r.contact));
        // PROPRIETE UTILISEE POUR CHARGER UNE AUTRE PAGE
          window.location.assign("confirmation.html?orderId=" + r.orderId);
        })

        //SI PROBLEME API
        .catch(function (err) {
        });
    }
    else{
      alert(" Erreur dans l'envoie de votre commande. Le formulaire n'est peut être pas correctement rempli, ou bien le panier est vide.")
    };
  }
  
  let envoiFormulaire = document.getElementById("envoiFormulaire");
  
  envoiFormulaire.addEventListener('click', function (event) {
    event.preventDefault();
    envoiCommande();
  });

 






