/*
    Name: Name
    Version: 1.0
    Author: Hasibur Rahman
    Email: hasibonline2@gmail.com
*/

(function ($) {
    "use strict";
    /* ==================== Table Of Content ====================
    1.	Script Initialization
    2.	preloaderSetup
    3.	
    ===========================================================*/
    /* ================================================
       Script Initialization
    ==================================================*/

    // Window Load Function
    $(window).on('load', function () {
        preloaderSetup();
        heroSlider();
        scrollAnimation();
    });

    // Document Ready Function
    $(document).ready(function () {
        navbarControll();
        onTheFly();
        mobileMenu();
        blogSlider();
    });

    // Window Resize Function
    $(window).on('resize', function () {

    });

    // Window Scroll Function
    $(window).on('scroll', function () {
        stickyNav();
        scrollSpy();
    });

    // ========================== Preloader Setup ==========================
    function preloaderSetup() {
        $('#preloader').fadeOut('slow', function () {
            $(this).remove();
        });
    } // preloaderSetup

    // ========================== Navbar Controll ==========================   
    function navbarControll() {
        // One page Nav
        var scrollLink = $('#slick_menu li a');
        var heroBtn = $('.hero-btn.hash');
        var space = $('.fixed-header').outerHeight();

        function scrollAnim(link, dur) {
            $('html, body').animate({
                scrollTop: $(link.hash).offset().top - space
            }, dur, "easeOutCirc")
        }

        scrollLink.on('click', function (event) {
            event.preventDefault();
            $(this).parent('li').addClass('active').siblings().removeClass('active');
            scrollAnim(this, 1010);

        })

        heroBtn.on('click', function (event) {
            event.preventDefault();
            scrollAnim(this, 1100);
        })

        scrollLink.on('click', function () {
            $('#cd-navbar').toggleClass('menu-hide');
        })

    } // nav controll
    // ========================== Scroll Spy ==========================    
    function scrollSpy() {


        var scrollLink = $('#slick_menu li a');
        var space = $('.fixed-header').outerHeight();
        var topPos = $(window).scrollTop();

        console.log(space);


        scrollLink.each(function () {
            var section = $(this.hash);

            // This Line Immportant for Console Error
            if (section.length) {
                var secPos = section.offset().top - (space + 5);
            }
            // Add Active Class
            if (secPos <= topPos) {
                $(this).parent().addClass('active').siblings().removeClass('active');
            }
        })
    }

    // ========================== Sticky Nav ==========================    
    function stickyNav() {
        // Scroll on Fixed position Height
        var posTop = $(window).scrollTop();
        var nav = $('.fixed-header');

        if (posTop >= 100) {
            nav.addClass('sticky-nav');
        } else {
            nav.removeClass('sticky-nav');
        }
    } // Sticky nav

    // =================== mobileMenu ===================
    function mobileMenu() {
        // $('.m-menu-btn').on('click', function () {
        //     $(this).children().toggleClass('active');
        // })

        $('#slick_menu').slicknav({
            appendTo: '.cd-nav',
            label: '',
            closeOnClick: true
        });


    }

    // ========================== Hero Slider ==========================
    function heroSlider() {

        // Slider Activation
        var slider = $('.hero-slider');
        slider.owlCarousel({
            loop: true,
            autoplay: true,
            autoplayTimeout: 10300,
            smartSpeed: 1248,
            dots: true,
            items: 1,
            mouseDrag: false,
            animateOut: 'fadeOutUp',
            animateIn: 'fadeInUp',
            onTranslate: translateAnim,
            onTranslated: translatedAnim
        })

        // Add Animation Globaly
        slider.find('[data-animation]').each(function () {
            var animation = $(this).data('animation');
            $(this).addClass(animation + ' animated')
        })

        // Animation Duration
        slider.find('[data-duration]').each(function () {
            var duration = $(this).data('duration');
            $(this).css('animation-duration', duration);
        })

        // Animation Dealy
        slider.find('[data-delay]').each(function () {
            var delay = $(this).data('delay');
            $(this).css('animation-delay', delay);
        })

        // Translate Animation
        function translateAnim(event) {
            var layer = $(event.target).find('[data-animation]');

            layer.each(function () {
                var animation = $(this).data('animation');
                $(this).removeClass(animation + ' animated').css('opacity', '0');
            })

        }
        // TranslateD Animation
        function translatedAnim(event) {

            var layer = $(event.target).find('.owl-item.active').find('[data-animation]');

            layer.each(function () {
                var animation = $(this).data('animation');
                $(this).addClass(animation + ' animated').css('opacity', '1');
            })
        }
    } // Hero Slider

    // ========================== Blog Slider ==========================


    function blogSlider() {
        var slider = $('.blog-slider');
        slider.owlCarousel({
            loop: true,
            autoplay: true,
            autoplayTimeout: 2300,
            smartSpeed: 1248,
            dots: false,
            nav: true,
            navText: ['<i class = "fa fa-angle-left "></i>', '<i class = "fa fa-angle-right "></i>'],
            margin: 25,
            items: 2,
            mouseDrag: false,

        })

    }
    // ========================== Scroll Animation ==========================
    function scrollAnimation() {
        AOS.init({
            offset: 90
        });
    }

    // ========================== Add Content On the fly ==========================
    function onTheFly() {
        // Show more Button
        var btn = $('#show_more');
        var btnText = btn.text();

        // Click count
        var point = 0;
        // Columns
        var col = $('.hide-col');
        var col1 = $('.hide-column-1');
        var col2 = $('.hide-column-2');

        // Column Array
        var columns = [col1, col2];

        // Hide Column Globaly
        col.hide();

        // Show column on button Click
        btn.on('click', function (event) {
            event.preventDefault();
            point++;

            switch (point) {
                case 1:
                    col1.show();
                    break;
                case 2:
                    col2.show();

                    $(btn).html('Show Less');
                    break;

                default:
                    col.hide();
                    $(btn).html(btnText);
                    break;
            }

            if (point > columns.length) {
                point = 0;
            }
        })

    }


})(jQuery); // End of use strict