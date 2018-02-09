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
    });

    // Window Resize Function
    $(window).on('resize', function () {

    });

    // Window Scroll Function
    $(window).on('scroll', function () {
        stickyNav();
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
        var scrollLink = $('#cd-navbar .nav-link');
        var space = 75;
        scrollLink.on('click', function (event) {
            $(this).parent('li').addClass('active').siblings().removeClass('active');
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - space
            }, 1010, "easeOutBack")
            event.preventDefault();
        })
    } // nav controll
    // ========================== Navbar Controll ==========================    
    function stickyNav() {
        // Scroll on Fixed position Height
        var posTop = $(window).scrollTop();
        var nav = $('.navbar.fixed-top');

        if (posTop >= 100) {
            nav.addClass('sticky-nav');
        } else {
            nav.removeClass('sticky-nav');
        }
    } // Sticky nav

    // ========================== Hero Slider ==========================
    function heroSlider() {

        // Slider Activation
        var slider = $('.hero-slider');
        slider.owlCarousel({
            loop: true,
            autoplay: true,
            autoplayTimeout: 5000,
            smartSpeed: 1248,
            dots: true,
            items: 1,
            mouseDrag: false,
            animateOut: 'fadeOutDown',
            animateIn: 'bounceInUp',
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

    // ========================== Scroll Animation ==========================
    function scrollAnimation() {
        AOS.init({
            offset: 90
        });
    }


})(jQuery); // End of use strict