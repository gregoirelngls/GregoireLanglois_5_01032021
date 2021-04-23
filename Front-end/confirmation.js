//RECUPERATION DES DONNEES DE L URL
let paramsUrl = new URL(window.location).searchParams;

let orderId = paramsUrl.get("orderId");

//RECUPERATION DES DONNEES CONTACT
let contact = JSON.parse(localStorage.getItem("contact"));

// RECUPERATION DU PRIX TOTAL
let prixTotal = JSON.parse(localStorage.getItem("finalPrice"));
localStorage.clear();
// AFFICHAGE HTML
function display (){
    confirmation.innerHTML += `
        <p>
        Nous vous remerçions  ${contact.firstName } ${contact.lastName} 
        </p>
        <hr>
        <p>Votre commande a bien été reçue sous le N° ${orderId} </br>
        Pour un montant de :${prixTotal}  </br>
        </p>
        Vous allez recevoir un e-mail de confirmation à l'adresse suivante : </br> ${contact.email}  
    `
};

display();

