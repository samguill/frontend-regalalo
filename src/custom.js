var App = (function(window){
    "use strict";
    var _this = null;
    var cacheCollection = {};

    return{
        init : function(){
            this.HeaderFixOnScroll();
            this.HomeSlider();
            this.MobileNavToggle();
            this.FilterToggle();
            this.MultiStepForm();
        },

        HeaderFixOnScroll: function(){
            $(window).scroll(function(){
                var sticky = $("body"),
                scroll = $(window).scrollTop();

                if(scroll >= 250) sticky.addClass('b-header_fixed');
                else sticky.removeClass('b-header_fixed');
            })
        },
        HomeSlider: function(){
            jQuery("#b-home_01_slider").show().revolution({
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
                        enable:true,
                        hide_onmobile:false,
                        hide_under:600,
                        style:"ares",
                        hide_onleave:false,
                        hide_delay:200,
                        hide_delay_mobile:1200,
                        direction:"horizontal",
                        h_align:"center",
                        v_align:"bottom",
                        h_offset:0,
                        v_offset:30,
                        space:10,
                        tmp:'<span class="tp-bullet-img-wrap">  <span class="tp-bullet-image"></span></span><span class="tp-bullet-title">{{title}}</span>'
                    }
                },
            });
        },
        MobileNavToggle: function(){
            $("#b-nav_icon").on('click', function(event) {
              $("body").toggleClass('mobile-menu-open');
              return false;
            });
            $(document).on('click', function(e) { 
              if (!$(e.target).is('.b-main_menu-wrapper, .b-main_menu-wrapper *')) {
                  $("body").removeClass('mobile-menu-open');
              }
            });
            $(document).on('click', ".b-main_menu-wrapper ul li.has-sub > a", function(event) {
              $(this).parent().find(".dropdown-inner").slideToggle("slow");
              return false;
            });
            $(document).on('click', ".b-main_menu-wrapper > ul > li > a", function(event){
                $("body").removeClass('mobile-menu-open');
            });
        },
        FilterToggle: function(){
            $(".b-open_filters").on("click", function(){
              $(this).toggleClass('b-btn_open');
              $(".b-filters_area").slideToggle('');
            });
        },
        MultiStepForm: function(){
            var current_fs, next_fs, previous_fs;
            var left, opacity, scale;
            var animating;
            $(".next").click(function(){
                if(animating) return false;
                animating = true;
                current_fs = $(this).parent();
                next_fs = $(this).parent().next();
                $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
                next_fs.show(); 
                current_fs.animate({opacity: 0}, {
                    step: function(now, mx) {
                        scale = 1 - (1 - now) * 0.2;
                        left = (now * 50)+"%";
                        opacity = 1 - now;
                        current_fs.css({
                            'transform': 'scale('+scale+')',
                            'position': 'absolute'
                        });
                        next_fs.css({'left': left, 'opacity': opacity});
                    }, 
                    duration: 800, 
                    complete: function(){
                        current_fs.hide();
                        animating = false;
                    }, 
                    easing: 'easeInOutBack'
                });
            });

            $(".previous").click(function(){
                if(animating) return false;
                animating = true;
                current_fs = $(this).parent();
                previous_fs = $(this).parent().prev();
                $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
                previous_fs.show(); 
                current_fs.animate({opacity: 0}, {
                    step: function(now, mx) {
                        scale = 0.8 + (1 - now) * 0.2;
                        left = ((1-now) * 50)+"%";
                        opacity = 1 - now;
                        current_fs.css({'left': left});
                        previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
                    }, 
                    duration: 800, 
                    complete: function(){
                        current_fs.hide();
                        animating = false;
                    }, 
                    easing: 'easeInOutBack'
                });
            });

            $(".submit").click(function(){
                return false;
            });
        }
    }

})(window);

$(document).ready(function($){
    App.init();
    $('[data-toggle="tooltip"]').tooltip();
});