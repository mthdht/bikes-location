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
        controls: true,
        animation: 'slide'
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

    // make image slide
    this.slide = function(direction, animation) {
        var current = this.currentIndex;

        if (direction == 'left') {
            if (this.currentIndex == this.slidesData.length - 1) {
                this.currentIndex = 0;
            } else {
                this.currentIndex += 1;
            }
        } else {
            if (this.currentIndex == 0) {
                this.currentIndex = this.slidesData.length - 1;
            } else {
                this.currentIndex -= 1;
            }
        }

        console.log(current);
        console.log(this.currentIndex);

        var that = this;

        $('.slider-slide').eq(this.currentIndex).toggleClass('active slider-slide-' + direction + ' animate-' + direction + '-' + (direction == 'left' ? 'next' : 'prev'));
        $('.slider-slide').eq(current).toggleClass('animate-' + direction + '-current');

        setTimeout(function () {
            $('.slider-slide').eq(that.currentIndex).toggleClass('slider-slide-' + direction + ' animate-' + direction + '-' + (direction == 'left' ? 'next' : 'prev'));
            $('.slider-slide').eq(current).toggleClass('active animate-' + direction + '-current');
        }, 600);
    }

    // next slide
    this.nextSlide = function() {
        this.slide('left', 'slide');
    };

    // previous slide
    this.prevSlide = function() {
        this.slide('right', 'slide');
    }

    // play the slider
    this.playSlider = function() {
        var that = this;
        this.interval = setInterval(function () {
            that.nextSlide();
        }, that.options.interval);
    };

    // pause the slider

    // event listener
    this.eventListener = function () {
        var that = this;
        // keyboard event

        // next button event
        $('.slider-next').on('click', function (event) {
            console.log(event);
            that.nextSlide();
        });

        // prev button event
        $('.slider-prev').on('click', function () {
            that.prevSlide();
        });
    };

    this.init = function () {
        // create the dom
        this.createSlider();

        // add the events listeners
        this.eventListener();

        // play the slider if autoplay option true
        if (this.options.autoplay) {
            this.playSlider();
        }
    };

    this.init();
}