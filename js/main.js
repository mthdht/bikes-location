/*
 * Slider: Flexible and customizable
 * this is the main js file which handle slider object, map interaction
 * Author: mthdht
 * Dependency: jQuery library
 * Version: 1.0
 */

$(document).ready(function () {

    //data for slide
    var sliderData = [
        {
            data : {
                imageSrc: 'http://gaetanboyron.fr/wp-content/uploads/2017/06/IMG_0442-1200x500.jpg',
                imageAlt: 'stand de velo',
            }
        }
    ];

    // options for slide
    var options = {
        interval:4000,
        keyboard: false,
        autoplay:true
    };

    // new instance of slide
    var slider = new Slider(sliderData);

    // test les data du slide
    slider.printData();


});
