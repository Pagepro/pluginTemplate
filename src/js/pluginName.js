(function ($) {
    "use strict";
    $.fn.pluginName = function (options) {
        var settings = $.extend(true, {}, $.fn.pluginName.defaults, options);
        this.on('click', function (e) {
            var container,
                thumbHolder,
                buttons,
                image_wrap,
                asosZoom,
                zoomed_image,
                thumbSearch,
                current,
                height,
                thisClass = this,
                full_image = this.href,
                image_rel = this.rel,
                $thumbs;
            e.preventDefault();
            settings.onStart.call(this);

            if (settings.imageResize === 'height') {
                container = '<div id="asosZoom__content">';
            } else {
                container = '<div id="asosZoom__content" style="max-width:' + settings.containerWidth + '; height:' + settings.containerHeight + '">';
            }
            zoomed_image = '<img id="asosZoom__content__img__xl" src="' + full_image + '" />';
            if (settings.thumbnails) {
                if (settings.thumbnailPosition === "vertical") {
                    thumbHolder = "zThumbsVertical";
                } else {
                    thumbHolder = "zThumbsHorizontal";
                }
                image_wrap = 'asosZoom__content__img';
                asosZoom = '<div id="asosZoom"><div id="asosZoom__overlay"></div>' + container + '<div id="asosZoom__content__img"></div><div id="asosZoom__content__thumbs" class="' + thumbHolder + '"></div></div></div>';
            } else {
                image_wrap = 'asosZoom__content';
                asosZoom = '<div id="asosZoom"><div id="asosZoom__overlay"></div>' + container + '</div></div>';
            }

            $('body').append(asosZoom);
            if (settings.imageResize === 'height') {
                height = $(window).height() * 0.9;
                zoomed_image = '<img id="asosZoom__content__img__xl" src="' + full_image + '" style="max-height:' + height + 'px" />';
            } else if (settings.imageResize === 'width') {
                zoomed_image = '<img id="asosZoom__content__img__xl" src="' + full_image + '" style="max-width:100%" />';
            } else {
                zoomed_image = '<img id="asosZoom__content__img__xl" src="' + full_image + '"/>';
            }
            $('#' + image_wrap).append(zoomed_image);

            if (image_rel && settings.nav) {
                thumbSearch = $('a[rel="' + image_rel + '"]');
                if (thumbSearch.length > 1) {
                    buttons = '<a href="#" id="asosZoom__content__next">' + settings.nextText + '</a><a href="#" id="asosZoom__content__prev">' + settings.prevText + '</a>';
                    $('#asosZoom__content').append(buttons);
                    for (var i = 0; i < thumbSearch.length; i++) {
                        if (thisClass === thumbSearch[i]) {
                            current = i;
                        }
                    }
                }
            }
            function nextImg() {
                if (current + 1 >= thumbSearch.length) {
                    current = 0;
                } else {
                    current = current + 1;
                }
                $thumbs.removeClass('active');
                $thumbs.eq(current).addClass('active');
                $('#asosZoom__content__img__xl').attr('src', thumbSearch[current].href);
                return false;
            }
            function prevImg() {
                if (current <= 0) {
                    current = thumbSearch.length - 1;
                } else {
                    current = current - 1;
                }
                $thumbs.removeClass('active');
                $thumbs.eq(current).addClass('active');
                $('#asosZoom__content__img__xl').attr('src', thumbSearch[current].href);
                return false;
            }
            $(document).keydown(function(e){
                if (e.keyCode === 37) {
                    prevImg();
                } else if (e.keyCode === 39) {
                    nextImg();
                }
            });
            $('#asosZoom__content__next').on('click', nextImg);
            $('#asosZoom__content__prev').on('click', prevImg);
            if (settings.thumbnails) {
                if (image_rel) {
                    thumbSearch = $('a[rel="' + image_rel + '"]');
                    thumbSearch.each(function () {
                       $('#asosZoom__content__thumbs').append('<a href="' + this.href + '" class="asosZoom-thumb"><img src="' + this.href + '" alt=""/></a>');
                   });
                } else {
                    $('#asosZoom__content__thumbs').append('<a href="' + this.href + '" class="asosZoom-thumb"><img src="' + this.href + '" alt="" /></a>');
                }
                $thumbs = $('.asosZoom-thumb');
                $thumbs.on('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var $this = $(this),
                        thumbs_href = this.href;
                    $this.siblings().removeClass('active');
                    $this.addClass('active');
                    $('#asosZoom__content__img__xl').attr('src', thumbs_href);
                });
            }
            $thumbs.removeClass('active');
            $('.asosZoom-thumb[href="' + full_image + '"]').addClass('active');
            if (settings.closeButton) {
                var closeBtn = '<a href="#" id="asosZoom__content__close">' + settings.closeText + '</a>';
                $('#asosZoom__content').append(closeBtn);
            }
            $('#asosZoom__overlay').css('background', settings.overlayColor);
            $('#asosZoom__overlay').fadeTo(0, settings.overlayOpacity);
            $('#asosZoom').fadeIn(settings.speed);
            $('#asosZoom__content__img__xl').on('mousemove', function (e) {
                var fullWidth = $('#asosZoom__content__img__xl').width(),
                    fullHeight = $('#asosZoom__content__img__xl').height(),
                    contentWidth = $('#asosZoom__content').width(),
                    contentHeight = $('#asosZoom__content').height(),
                    offset = $('#asosZoom__content').offset(),
                    mouseX = e.pageX - offset.left,
                    mouseY = e.pageY - offset.top,
                    posX = (Math.round((mouseX / contentWidth) * 100) / 100) * (fullWidth - contentWidth),
                    posY = (Math.round((mouseY / contentHeight) * 100) / 100) * (fullHeight - contentHeight);
                if (settings.zoom === 'vertical') {
                    $('#asosZoom__content__img__xl').css('top', '-' + posY + 'px');
                } else if (settings.zoom === 'horizontal') {
                    $('#asosZoom__content__img__xl').css('left', '-' + posX + 'px');
                } else {
                    $('#asosZoom__content__img__xl').css({'top': '-' + posY + 'px', 'right': '' + posX + 'px'});
                }
            });
            settings.onComplete.call(this);
        });
        $(document).on('click', '#asosZoom', function () {
            settings.onCleanup.call(this);
            $('#asosZoom').remove();
            settings.onClose.call(this);
            return false;
        }).on('keydown', function (e) {
            if (e.keyCode === 27) {
               settings.onCleanup.call(this);
               $('#asosZoom').remove();
               settings.onClose.call(this);
               return false;
            }
        });
    };
    $.fn.pluginName.defaults = {
        zoom: 'horizontal',
        speed: 500,
        thumbnails: true,
        closeButton: true,
        closeText: 'x',
        thumbnailPosition: 'vertical',
        onStart: function () {},
        onComplete: function () {},
        onCleanup: function () {},
        onClose: function () {},
        overlayColor: '#000000',
        overlayOpacity: '0.7',
        imageResize: null,
        containerWidth: '70%',
        containerHeight: '90%',
        nextText : '&gt;',
        prevText : '&lt;',
        nav : true
    };
}(jQuery));