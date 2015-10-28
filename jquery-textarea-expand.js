var $ = require('$');

$.fn.textAreaExpander = function(minHeight, maxHeight, adjust) {
    var len = arguments.length;

    if (len === 1) {
        if ($.isFunction(arguments[0])) {
            adjust = arguments[0];
            minHeight = maxHeight = null;
        }
    } else if (len === 2) {
        if ($.isFunction(arguments[1])) {
            adjust = arguments[1];
            maxHeight = null;
        }
    }

    this.each(function() {
        var $this = $(this),
            p, height;

        if (this.nodeName.toLowerCase() !== 'textarea' || $this.is(':hidden')) {
            return;
        }

        p = this.className.match(/expand(\d+)\-*(\d+)*/i);
        height = $this.height();

        this.expandMin = this.expandMin || Math.max(minHeight || (p ? parseInt(p[1], 10) : 0), height);
        this.expandMax = this.expandMax || maxHeight || (p ? parseInt(p[2], 10) : 99999);
        this.adjust = adjust;

        resizeTextarea(this);

        if (!this.Initialized) {
            this.Initialized = true;
            $this.bind('keyup focus', resizeTextarea);
        }
    });

    return this;
};

function resizeTextarea(e) {
    e = e.target || e;

    var $e = $(e),
        paddingTop = parseInt($e.css('padding-top'), 10) || 0,
        paddingBottom = parseInt($e.css('padding-bottom'), 10) || 0,
        navigatorLower = navigator.userAgent.toLowerCase(),
        hCheck = !(/msie/.test(navigatorLower) || /opera/.test(navigatorLower)),
        scrollHeight, height;

    hCheck && $e.css({
        height: 0
    });

    scrollHeight = e.scrollHeight - (paddingTop + paddingBottom);
    height = Math.max(e.expandMin, Math.min(scrollHeight, e.expandMax));

    $e.css({
        overflow: scrollHeight > height ? 'auto' : 'hidden',
        height: height + 'px'
    });

    $.isFunction(e.adjust) && e.adjust($e);

    return true;
}
