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
            },
            options: {
                titleColor: '#fff',
                descriptionColor: '#fff'
            }
        },
        {
            data : {
                imageSrc: 'https://pbs.twimg.com/media/DbikTUGXcAAFnoT.jpg',
                imageAlt: 'ville de lyon',
                title: 'ville de lyon'
            },
            options: {
                titleColor: '#fff'
            }
        },
        {
            data: {
                imageSrc: 'http://backgroundcheckall.com/wp-content/uploads/2017/12/parallax-background-image-1.jpg',
                imageAlt: 'ville de lyon',
                title: 'ville de lyon'
            },
            options: {
                titleColor: '#fff'
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

    // test les data du slide
    slider.printData();
    slider.printOptions();
});
