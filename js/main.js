/*
 * this is the main js file which handle slider object, map interaction
 * Author: mthdht
 * Dependency: jQuery library
 * Version: 1.0
 */

//data for slide
var sliderData = [
    {
        data : {
            imageSrc: 'img/slide0.png',
            imageAlt: 'stand de velo',
            title: 'Bienvenue sur Location de Vélo!',
            description: 'Réservez un vélo en 4 étapes'
        },
        options: {
            titleColor: '#fff',
            descriptionColor: '#fff'
        }
    },
    {
        data : {
            imageSrc: 'img/slide1.png',
            imageAlt: 'Carte de lyon avec marqueur',
            title: 'Etape 1: Voir la carte',
            description: 'Cliquez sur un marqueur pour voir les informations d\'une station <br/> ' +
            '<i class="fas fa-map-marker" style="color: red"></i> = Aucun vélo, ' +
            '<i class="fas fa-map-marker" style="color: orange"></i> = moins de 6 vélos,' +
            '<i class="fas fa-map-marker" style="color: green"></i> = plus de 5 vélos,'
        },
        options: {
            titleColor: '#fff',
            descriptionColor: '#fff'
        }
    },
    {
        data: {
            imageSrc: 'img/slide2.png',
            imageAlt: 'carte de lyon avec panneau lateral montrant les informations d\'une station',
            title: 'Etape 2: Informations d\'une station',
            description: 'Cliquez sur \'Réserver\' pour faire une demande de réservation'
        },
        options: {
            titleColor: '#fff',
            descriptionColor: '#fff'
        }
    },
    {
        data: {
            imageSrc: 'img/slide3.png',
            imageAlt: 'carte de lyon avec panneau lateral montrant un champ de signature',
            title: 'Etape 3: Signez pour valider la réservation',
            description: 'Faites votre signature et cliquez sur \'envoyer\''
        },
        options: {
            titleColor: '#fff',
            descriptionColor: '#fff'
        }
    },
    {
        data: {
            imageSrc: 'img/slide4.png',
            imageAlt: 'carte de lyon et section montrant un message d\'état de la réservation',
            title: 'Etape 4: Votre réservation est validée',
            description: 'Un message vous présente l\'état de votre réservation en temps réel en pied de page'
        },
        options: {
            titleColor: '#fff',
            descriptionColor: '#fff'
        }
    }
];

// options for slide
var myoptions = {
    interval:4000,
    keyboard: true,
    autoplay: true,
    animation: 'slide',
    controls: true
};

// new instance of slide
var slider = new Slider(sliderData, myoptions);

/*
 * logic for map
 */
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: { lat: 45.7524845, lng: 4.8474354 },
    });

    $.get({
        url:'https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=74369f6b8f27af8c8490527ed36bfc461783501c'
    }).done(function (data) {
        var mapManager = new MapManager(map, data);
    });
}


