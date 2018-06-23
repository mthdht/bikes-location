/*
 * Registration object
 * Author: mthdht
 * Version: 1.0
 */

/**
 * Constructor for the registartion
 *
 * @param station
 * @param indexStation
 * @param timeLeft
 * @constructor
 */
function Registration(station, indexStation, timeLeft) {
    /* ==============================================
       Reservation PROPERTIES
       ============================================== */
    this.station = station;
    this.indexStation = indexStation;
    this.storage = window.sessionStorage;
    this.timeLeft = timeLeft;

    this.init();
}

/* ==============================================
   Reservation METHOD
   ============================================== */

/**
 * Fill the Reservation message
 */
Registration.prototype.fillReservationMessage = function () {
    var that = this;

    $('.message').html('Vous avez réservé la station: <span class="station-name">' +
        that.station.name.split('-')[1] +
        '</span>, il vous reste <span class="time">' +
        Math.floor(that.timeLeft / 60) +
        'min et ' +
        Math.floor(that.timeLeft % 60) +
        'sec' +
        '</span> pour aller chercher votre vélo !'
    );
};

/**
 * Initialize the reservation,
 *  - set the storage time if it is new reservation, not if there is one already
 *  - set the storage station index
 */
Registration.prototype.init = function () {
    // if it is new registration
    if (this.timeLeft == 1200) {
        //no registration yet
        this.storage.setItem('time', new Date());
    }
    this.storage.setItem('station', this.indexStation);
};
