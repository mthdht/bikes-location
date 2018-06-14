/*
 * Registration object
 * Author: mthdht
 * Version: 1.0
 */

function Registration(stations, current, disponibility) {
    /* ==============================================
       Reservation PROPERTIES
       ============================================== */

    this.stations = stations;
    this.current = current;
    this.disponibility = disponibility;
    this.storage = window.sessionStorage;


    /* ==============================================
       Reservation METHOD
       ============================================== */

    this.init();
}

Registration.prototype.showReservationMessage = function() {
    var that = this;
    $('.message').html('Vous avez réserver la station: <span class="station-name">' +
        that.stations[that.current].name.split('-')[1] +
        '</span>, il vous reste <span class="time">' +
        Math.floor(that.storage.getItem('timeLeft') / 60) +
        'min et ' +
        that.storage.getItem('timeLeft') % 60 +
        'sec' +
        '</span> pour aller chercher votre vélo !');

    $('.message').css('display', 'block');

    var interval = setInterval(function () {
        that.decrementReservationMessageTime();
        $('.time').html(Math.floor(that.storage.getItem('timeLeft') / 60) +
            'min et ' +
            that.storage.getItem('timeLeft') % 60 +
            'sec');

        if (that.storage.getItem('timeLeft') < 0) {
            clearInterval(interval);
            $('.message').css('display', 'none');
            that.stations[that.current].available_bikes += 1;
        }
    }, 1000);


};

Registration.prototype.decrementReservationMessageTime = function () {
    timeLeft = this.storage.getItem('timeLeft') - 1;
    this.storage.setItem('timeLeft', timeLeft);
};

Registration.prototype.init = function () {
    this.storage.setItem('timeLeft', this.disponibility);
};