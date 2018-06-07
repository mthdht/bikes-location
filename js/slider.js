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
    this.currentIndex = 0;
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
            'class': 'slider-slide'
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
        $('.slider').append($('<div>', {
            'class': 'slider-slides'
        }));

        this.slidesData.forEach(function (slide) {
            this.createSlide(slide);
        }, this);

        // create the controls div
        var sliderControls = $('<div>', {
            'class': 'slider-controls'
        });

        this.slidesData.forEach(function () {
            $(sliderControls).append($('<div>', {
                'class': 'slider-bullet'
            }).append($('<i>', {
                'class': 'fas fa-circle'
            })));
        });

        $('.slider').append(sliderControls);

        // create the prev and next button
        $('.slider').append($('<button>', {
            'class': 'slider-prev text-white'
        }).append($('<i>', {
            'class': 'fas fa-angle-left fa-2x'
        })));

        $('.slider').append($('<button>', {
            'class': 'slider-next text-white'
        }).append($('<i>', {
            'class': 'fas fa-angle-right fa-2x'
        })));

        $('.slider-slide:first').toggleClass('active');
    };

    // add slide

    // next slide
    this.nextSlide = function() {
        var current = this.currentIndex;
        if (this.currentIndex == this.slidesData.length) {
            this.currentIndex = 0;
        } else {
            this.currentIndex += 1;
        }

        var that = this;

        $('.slider-slide').eq(this.currentIndex).toggleClass('active slider-slide-next animate-left-next');
        $('.slider-slide').eq(current).toggleClass('animate-left-current');

        setTimeout(function () {
            $('.slider-slide').eq(that.currentIndex).toggleClass('slider-slide-next animate-left-next');
            $('.slider-slide').eq(current).toggleClass('active animate-left-current');
        }, 600);


    };

    // previous slide

    // play the slider

    // pause the slider











}