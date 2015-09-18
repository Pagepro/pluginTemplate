/*globals jQuery, document */
(function ($) {
    "use strict";
    var pluginName  =   "pluginName",
        defaults    =   {
            optionFirst: 500,
            optionSecond: false,
            callbackFunction: function () {}
        };
    // The actual plugin constructor
    function Plugin(element, options) {
        this.element = element;
        this.$element = $(this.element);
        this.options = options;
        this.metadata = this.$element.data('options');
        this.settings = $.extend({}, defaults, this.options, this.metadata);
        this.init();
    }
    Plugin.prototype = {
        init: function () {

        }
    };
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, pluginName)) {
                $.data(this, pluginName, new Plugin(this, options));
            }
        });
    };
}(jQuery));