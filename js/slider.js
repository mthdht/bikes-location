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
    this.intervalID = null;

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
            html: slideData.data.description,
            style: 'color:' + slideData.options.descriptionColor
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

        // create the controls div depend on options
        if (this.options.controls) {
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
        }

        $('.slider-bullet').eq(0).toggleClass('active');

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
    this.slide = function(direction, from, to) {
        this.isSliding =true;

        //make animation based on animation option
        var that = this;

        switch (this.options.animation) {
            case 'slide':
                // will slide the next or prev slide from right(or left) to left(or right)
                $('.slider-slide').eq(to).toggleClass('active slider-slide-' + direction + ' animate-' + direction + '-' + (direction == 'left' ? 'next' : 'prev'));
                $('.slider-slide').eq(from).toggleClass('animate-' + direction + '-current');

                setTimeout(function () {
                    $('.slider-slide').eq(to).toggleClass('slider-slide-' + direction + ' animate-' + direction + '-' + (direction == 'left' ? 'next' : 'prev'));
                    $('.slider-slide').eq(from).toggleClass('active animate-' + direction + '-current');
                    $('.slider-bullet').eq(to).toggleClass('active');
                    $('.slider-bullet').eq(from).toggleClass('active');
                    that.isSliding = false;
                }, 600);
                break;
            case 'fade':
                // will fade sle next or prev slide
                $('.slider-slide').eq(to).toggleClass('active');
                $('.slider-slide').eq(from).toggleClass('active');
                $('.slider-slide').eq(to).toggleClass('slider-fade');

                setTimeout(function () {
                    $('.slider-slide').eq(to).toggleClass('slider-fade');
                    that.isSliding = false;
                }, 1000);
                break;
            default:
                $('.slider-slide').eq(from).toggleClass('active');
                $('.slider-slide').eq(to).toggleClass('active');
        }
    };

    // next slide
    this.nextSlide = function() {
        var current = this.currentIndex;
        if (this.currentIndex == this.slidesData.length - 1) {
            this.currentIndex = 0;
        } else {
            this.currentIndex += 1;
        }
        this.slide('left', current, this.currentIndex);
    };

    // previous slide
    this.prevSlide = function() {
        var current = this.currentIndex;
        if (this.currentIndex == 0) {
            this.currentIndex = this.slidesData.length - 1;
        } else {
            this.currentIndex -= 1;
        }
        this.slide('right', current, this.currentIndex);
    };

    // play the slider
    this.playSlider = function() {
        var that = this;
        this.intervalID = setInterval(function () {
            that.nextSlide();
        }, that.options.interval);
    };

    // event listener
    this.eventListener = function () {
        var that = this;
        // keyboard event

        // next button event
        $('.slider-next').on('click', function (event) {
            if (!that.isSliding) {
                clearInterval(that.intervalID);
                that.intervalID = null;
                that.nextSlide();
                if (that.options.autoplay) {
                    that.playSlider();
                }
            } else {
                console.warn('already sliding');
            }
        });

        // prev button event
        $('.slider-prev').on('click', function () {
            if (!that.isSliding) {
                clearInterval(that.intervalID);
                that.intervalID = null;
                that.prevSlide();
                if (that.options.autoplay) {
                    that.playSlider();
                }
            } else {
                console.warn('already sliding');
            }
        });

        // bullet button event
        $('.slider-bullet').on('click', function (event) {
            if (!that.isSliding) {
                clearInterval(that.intervalID);
                that.intervalID = null;
                // check whenever slide from left or right based on bullet index and current slide index
                if ($('.slider-bullet').index(event.currentTarget) > that.currentIndex) {
                    var direction = 'left';
                } else {
                    var direction = 'right';
                }

                var current = that.currentIndex;
                that.currentIndex = $('.slider-bullet').index(event.currentTarget);
                if (current != that.currentIndex) {
                    that.slide(direction, current, that.currentIndex);
                    if (that.options.autoplay) {
                        that.playSlider();
                    }
                }
            } else {
                console.warn('already sliding');
            }
        });

        // right and left arrow event
        if (this.options.keyboard) {
            $(document).on('keypress', function (event) {
                switch (event.keyCode) {
                    case 37:
                        if (!that.isSliding) {
                            clearInterval(that.intervalID);
                            that.intervalID = null;
                            that.prevSlide();
                            if (that.options.autoplay) {
                                that.playSlider();
                            }
                        } else {
                            console.warn('already sliding');
                        }
                        break;
                    case 39:
                        if (!that.isSliding) {
                            clearInterval(that.intervalID);
                            that.intervalID = null;
                            that.nextSlide();
                            if (that.options.autoplay) {
                                that.playSlider();
                            }
                        } else {
                            console.warn('already sliding');
                        }
                        break;
                }
            });
        }

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