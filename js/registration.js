/*
 * Registration object
 * Author: mthdht
 * Version: 1.0
 */

function Registration(station, disponibility, indexStation) {
    /* ==============================================
       Reservation PROPERTIES
       ============================================== */

    this.station = station;
    this.indexStation = indexStation;
    this.disponibility = disponibility;
    this.storage = window.sessionStorage;


    /* ==============================================
       Reservation METHOD
       ============================================== */

    this.init();
}

Registration.prototype.showReservationMessage = function() {
    var that = this;
    $('.message').html('Vous avez réservé la station: <span class="station-name">' +
        that.station.name.split('-')[1] +
        '</span>, il vous reste <span class="time">' +
        Math.floor(that.storage.getItem('timeLeft') / 60) +
        'min et ' +
        that.storage.getItem('timeLeft') % 60 +
        'sec' +
        '</span> pour aller chercher votre vélo !'
    );
};

Registration.prototype.decrementReservationMessageTime = function () {
    timeLeft = this.storage.getItem('timeLeft') - 1;
    this.storage.setItem('timeLeft', timeLeft);
};

Registration.prototype.init = function () {
    this.storage.setItem('timeLeft', this.disponibility);
    this.storage.setItem('station', this.indexStation);
};