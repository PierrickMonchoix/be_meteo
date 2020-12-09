// alert("yfffofff");
// f12 pour afficher console navigatteur
// if (elt == null){
//     console.log("elt null");
// }
// else {
//     console.log("elt ok!");
// }

// fonction qui se lancera apres que la page ai été upload (super important, sinon getelementId peut pas trouver element non contruit)




// https://github.com/mickaelbaron/sse-examples/tree/master/sse-helloworld/static
function connect(balise) {
    source = new EventSource("http://localhost:9994/api/sse/withstreaming_meteo");
    source.onopen = function (event) {
        console.log(event);
    };

    source.addEventListener('add-message', function (e) {
        console.log(e.data);
        balise.innerHTML = e.data;
    }, false);
    source.onerror = function (event) {
        console.log(event);
    };
}

//("http://localhost:9994/api/sse/withstreaming");
class Events {

    constructor() {
        this.events = new EventSource("http://localhost:9994/api/sse/withstreaming_meteo");
        this.events.onopen = (e) => console.log(e);
        this.events.onmessage = ({ data }) => console.log(data);
    }

}





window.onload = function () {

    console.log("hello");
    

    var last_temperature = "0 degres";


    // DECLARATION VARIABLES 
    var texte_temperature = document.getElementById('valeur_temperature');
    var elt = document.getElementById('btn_test');
    var leftbox = document.getElementById('id_leftbox');
    var texte_temps = document.getElementById('texte_temps');

    //  texte_temperature.innerHTML = "il fait -1 deg";
    texte_temperature.innerHTML = last_temperature;

    connect(texte_temperature);

    // On écoute l'événement click
    elt.addEventListener('click', function () {
        // notre fonction definie apres 
        swapLeftColor(leftbox);
        console.log("re");





        // elt.innerHTML = "C'est cliqué !";               // On change le contenu de notre élément pour afficher "C'est cliqué !"
    });



    // requete service web 
    console.log("creation de la requete");

    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            var response = JSON.parse(this.responseText);

            console.log(response.current_condition.condition);
            texte_temps.innerHTML = "Météo: " + response.current_condition.condition;
        }
    };

    request.open("GET", "https://www.prevision-meteo.ch/services/json/paris");
    request.send();




};

// declaration d'une fonction en js 
function swapLeftColor(leftbox) {
    console.log("cliqued");
    if (leftbox.style.backgroundColor == "rgb(255, 255, 255)") {  // FFF
        leftbox.style.backgroundColor = "#222";
        console.log("if");
    }
    else {
        leftbox.style.backgroundColor = "#FFF";
        console.log("else");
        console.log(leftbox.style.backgroundColor);
    }
}

