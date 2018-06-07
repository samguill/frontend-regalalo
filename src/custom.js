var j = jQuery.noConflict();
var App = (function(window){
    "use strict";
    var _this = null;
    var cacheCollection = {};

    return{
        init : function(){
            this.HeaderFixOnScroll();
            this.Carousel();
            this.HomeSlider();
        },

        HeaderFixOnScroll: function(){
            j(window).scroll(function(){
                var sticky = j("body"),
                scroll = j(window).scrollTop();

                if(scroll >= 250) sticky.addClass('b-header_fixed');
                else sticky.removeClass('b-header_fixed');
            })
        },

        Carousel: function(){
            if(j(".carousel-products").length > 0){
                j(".carousel-products").owlCarousel({
                    loop:true,
                    margin: 10,
                    nav: false,
                    dots: true,
                    responsive:{
                        0:{
                            items:2
                        },
                        600:{
                            items:4
                        },
                        1000:{
                            items:5
                        }
                    }
                });
            }
        },

        HomeSlider: function(){
            j("#b-home_01_slider").show().revolution({
                sliderType:"standard",
                jsFileLocation:"revolution/js/",
                sliderLayout:"fullwidth",
                dottedOverlay:"none",
                delay:9000,
                navigation: {
                    keyboardNavigation:"off",
                    keyboard_direction: "horizontal",
                    mouseScrollNavigation:"off",
                    mouseScrollReverse:"default",
                    onHoverStop:"off",
                    touch:{
                        touchenabled:"on",
                        swipe_threshold: 75,
                        swipe_min_touches: 1,
                        swipe_direction: "horizontal",
                        drag_block_vertical: false
                    },
                    arrows: {
                        style:"zeus",
                        enable:true,
                        hide_onmobile:true,
                        hide_under:600,
                        hide_onleave:true,
                        hide_delay:200,
                        hide_delay_mobile:1200,
                        tmp:'<div class="tp-title-wrap">    <div class="tp-arr-imgholder"></div> </div>',
                        left: {
                            h_align:"left",
                            v_align:"center",
                            h_offset:30,
                            v_offset:0
                        },
                        right: {
                            h_align:"right",
                            v_align:"center",
                            h_offset:30,
                            v_offset:0
                        }
                    },
                    bullets: {
                        enable:false,
                        hide_onmobile:true,
                        hide_under:600,
                        style:"zeus",
                        hide_onleave:true,
                        hide_delay:200,
                        hide_delay_mobile:1200,
                        direction:"horizontal",
                        h_align:"center",
                        v_align:"bottom",
                        h_offset:0,
                        v_offset:30,
                        space:5,
                        tmp:'<span class="tp-bullet-img-wrap">  <span class="tp-bullet-image"></span></span><span class="tp-bullet-title">{{title}}</span>'
                    }
                },
            });
        }
    }

})(window);

j(document).ready(function($){
    App.init();
    j('[data-toggle="tooltip"]').tooltip();
});