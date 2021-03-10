var request = new XMLHttpRequest();
request.open("GET", "http://localhost:3000/api/cameras", true);
request.send();

request.onreadystatechange = function(){
    if (request.readyState === 4){
       // document.getElementById('Cameras').innerHTML = (request.responseText)
       //console.log(request.responseText);


        //Récupère toutes les cameras
        var cameras = JSON.parse(request.responseText);
        // Pour chaque camera
        cameras.forEach(function(camera){
            //On créer un div caemra (pour linstant juste console.log)
            createDivCamera(camera);
        });
    }
}

function createDivCamera (camera) {
    //debug
    console.log("id" + camera._id);
    console.log(camera);
    //créer une div enfant
    const newElt = document.createElement("div");
    //récupère id camera parent
    let elt = document.getElementById("Cameras");
    //ajouter un id à ma div enfant
    newElt.setAttribute("id", camera._id);
    //mettre la div enfant dans la div parent
    elt.appendChild(newElt);
}







