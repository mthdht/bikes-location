/**
 * AJAX function for server calling
 * This functions was taken from the OpenClassrooms javascript course: https://openclassrooms.com/courses/creez-des-pages-web-interactives-avec-javascript/interrogez-un-serveur-web
 * @param url
 * @param callback
 */
function ajaxGet(url, callback) {
    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {
            // Appelle la fonction callback en lui passant la réponse de la requête
            console.log('ok ajax');
            callback(req.responseText);
        } else {
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });
    req.addEventListener("error", function () {
        console.error("Erreur réseau avec l'URL " + url);
    });
    req.send(null);
}