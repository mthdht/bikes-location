/*
 * Slider: Flexible and customizable
 * Author: mthdht
 * Dependency: jQuery library
 * Version: 1.0
 */

function Slider(slidesData = [{}], options = null) {
    /* ==============================================
       SLIDER PROPERTIES
       ============================================== */

    this.sliderDefaultOptions = {
        interval: 5000,
        keyboard: true,
        autoplay: true,
        controls: true
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

    this.slidesData = slidesData.map(function (slide) {
        return {
            data: Object.assign({}, this.slideDataDefaultData, slide.data),
            options: Object.assign({}, this.slideDataDefaultOptions, slide.options)
        };
    }, this);

    this.options =  Object.assign({}, this.sliderDefaultOptions, options);
    this.elements = [

    ];
    this.isSliding = null;
    this.interval = null;



    /* ==============================================
       SLIDER METHODS
       ============================================== */

    // print data
    this.printData = function () {
        console.log(this.slidesData);
    };

    // print options
    this.printOptions = function () {
        console.log(this.options);
    };

    // create element for slider inside the '.slides' element
    this.createSlide = function (slideData) {
        var slide = $('<div/>', {
            'class': 'slider-slide active'
        });

        var slideImage = $('<img/>', {
            src: slideData.data.imageSrc,
            alt: slideData.data.imageAlt,
            'class': 'slide-image'
        });

        var slideCaption = $('<div>', {
            'class': 'slide-caption'
        });

        var slideCaptionTitle = $('<h2>', {
            html: slideData.data.title,
            'class': 'slide-caption-title',
            style: 'color:' + slideData.options.titleColor
        });

        var slideCaptionDescription = $('<p>', {
            'class': 'slide-caption-description',
            html: slideData.data.description
        });

        slideCaption.append(slideCaptionTitle, slideCaptionDescription);
        slide.append(slideImage, slideCaption);
        $('.slider-slides').append(slide);
    };

    // create the slider inside the '.slider' element
    this.createSlider = function () {
        // create the slides



        // create the controls div

    };

    // add slide

    // play the slider

    // pause the slider

    // next slide

    // previous slide









}