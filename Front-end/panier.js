//// GESTION DU PANIER ////

//EMPLACEMENT DU HTML
let container = document.getElementById("container");

//RECUPERATION DU PANIER DANS LE LOCAL STORAGE ET PARSE LES DONNEES RECUPERER DU LOCALSTORAGE
const cameras = JSON.parse(localStorage.getItem("cameras"));

//RECUPERATION ID PRODUIT
let addIdBasket = [];

// CREATION DU CONTENU HTML
function allCameras() {
  const cameras = JSON.parse(localStorage.getItem("cameras"));
  let totalPrice = 0; 
  for (let i = 0; i<cameras.length; i++){
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

// APPEL DE LA FONCTION allCameras
allCameras();


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
function envoiCommande(contact) {
  const cameras = JSON.parse(localStorage.getItem("cameras"));
  let products = [];

  // BOUCLE INCREMENT ID PRODUIT
  for (let i in cameras){
  products.push(cameras[i]._id);
  }
  
  
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
  
  let envoiFormulaire = document.getElementById("envoiFormulaire");
  
  envoiFormulaire.addEventListener('click', function (event) {
  //fonction qui envoit les données du formulaire à l'API
	const firstName = document.getElementById('firstName').value;
	const lastName = document.getElementById('lastName').value;
	const address = document.getElementById('address').value;
	const city = document.getElementById('city').value;
	const email = document.getElementById('email').value;
	const contact = {
		firstName: firstName,
		lastName: lastName,
		address: address,
		city: city,
		email: email
	};
  
	if (isInvalid(contact)) {
		event.preventDefault();
	} else {
		envoiCommande(contact);
	}  
  });

  // FONCTION PERMETTANT DE BLOQUER L'EXECUTION DE LA FONCTION envoiCommande SI REGLES REGEXP NON RESPECTEES
  function isInvalid(contact) {
    let goodName = /^(?=.{1,50}$)[a-z-]+(?:['_.\s][a-z]+)*$/i;
    let goodEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    let goodAddress = /^[a-zA-Z0-9\s]{2,}$/;
  
    let firstNameError = document.getElementById('missPrenom');
    let lastNameError = document.getElementById('missNom');
    let emailError = document.getElementById('missMail');
    let addressError = document.getElementById('missAddress');
    let cityError = document.getElementById('missCity');
  
    // validation de prénom
    if (!goodName.test(contact.firstName)) {
      firstNameError.innerText = "Le prénom n'est pas valide";
      firstNameError.style.color = 'red';
    } else {
      firstNameError.innerText = '';
    }
  
    // validation de nom
    if (!goodName.test(contact.lastName)) {
      lastNameError.innerText = "Le nom n'est pas valide";
      lastNameError.style.color = 'red';
    } else {
      lastNameError.innerText = '';
    }
  
    // Validation de l'email
    if (!goodEmail.test(contact.email)) {
      emailError.innerText = "L'email n'est pas valide";
      emailError.style.color = 'red';
    } else {
      emailError.innerText = '';
    }
  
    // validation de la ville
    if (!goodName.test(contact.city)) {
      cityError.innerText = "La ville n'est pas valide";
      cityError.style.color = 'red';
    } else {
      cityError.innerText = '';
    }
  
    // Validation de l'adresse
    if (!goodAddress.test(contact.address)) {
      addressError.innerText = "L'adresse n'est pas valide";
      addressError.style.color = 'red';
    } else {
      addressError.innerText = '';
    }
  
    return (
      !goodName.test(contact.firstName) ||
      !goodName.test(contact.lastName) ||
      !goodName.test(contact.city) ||
      !goodEmail.test(contact.email)
    );
}



 






