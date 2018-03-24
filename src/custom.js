var App = (function(window){
    "use strict";
    var _this = null;
    var cacheCollection = {};

    return{
        init : function(){
            this.HeaderFixOnScroll();
        },

        HeaderFixOnScroll: function(){
            $(window).scroll(function(){
                var sticky = $("body"),
                scroll = $(window).scrollTop();

                if(scroll >= 250) sticky.addClass('b-header_fixed');
                else sticky.removeClass('b-header_fixed');
            })
        }
    }

})(window);

$(document).ready(function($){
    App.init();
    $('[data-toggle="tooltip"]').tooltip();
});