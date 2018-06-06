/*
 * Slider: Flexible and customizable
 * Author: mthdht
 * Dependency: jQuery library
 * Version: 1.0
 */

function Slider(slidesData, options = null) {
    /* ==============================================
       SLIDER PROPERTIES
       ============================================== */

    this.sliderDefaultOptions = {
        interval: 5000,
        keyboard: true,
        autoplay: true,
    };

    this.slideDataDefaultData = {
        imageSrc: 'https://postradam.us/wp-content/uploads/2017/11/WordPress-Featured-Image.png',
        imageAlt: '',
        title: 'Title for slide',
        description: 'Description for slide'
    };

    this.slideDataDefaultOptions = {
        titleColor: '#000',
        descriptionColor: '#000'
    };

    this.data = slidesData.map(function (slide) {
        return {
            data: Object.assign({}, this.slideDataDefaultData, slide.data),
            options: Object.assign({}, this.slideDataDefaultOptions, slide.options)
        };
    }, this);

    this.options =  Object.assign({}, this.sliderDefaultOptions, options);
    this.elements = [];
    this.isSliding = null;



    /* ==============================================
       SLIDER METHODS
       ============================================== */

    // print data
    this.printData = function () {
        console.log(this.data);
    };

    // print options
    this.printOptions = function () {
        console.log(this.options);
    };


    // create elements for slider

    // add slide

    // play the slider

    // pause the slider

    // next slide

    // previous slide









}