/*
 * Slider: Flexible and customizable
 * Author: mthdht
 * Dependency: jQuery library
 * Version: 1.0
 */

function Slider(slideData, options) {
    /* ==============================================
       SLIDER PROPERTIES
       ============================================== */

    this.sliderDefaultOptions = {
        interval: 5000,
        keyboard: true,
        autoplay: true,
    };
    this.captionDefaultOptions = {
        titleColor: '#fff',
        descriptionColor: '#fff'
    };
    this.data = slideData;
    this.options =  Object.assign({}, this.sliderDefaultOptions, options);
    this.elements = [];
    this.isSliding = null;



    /* ==============================================
       SLIDER METHODS
       ============================================== */

    // print data
    this.printData = function () {
        console.log(this.data);
    }

    // print options
    this.printOptions = function () {
        console.log(this.options);
    }

    // create elements for slider

    // add slide

    // play the slider

    // pause the slider

    // next slide

    // previous slide









}