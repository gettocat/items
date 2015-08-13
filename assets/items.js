var items = function(selector, data) {
    if (selector)
        this.selector = $(selector);

    if (data instanceof Object)
        this.settings = {
            scope: data.scope || this.settings.scope,
            item_selector: data.item_selector || this.settings.item_selector,
            active_item_class: data.active_item_class || this.settings.active_item_class,
            footer_selector: data.footer_selector || this.settings.footer_selector,
            header_selector: data.header_selector || this.settings.header_selector,
        };

    this.init();
    return this;
}

items.prototype = {
    settings: {
        scope: "Выбрано элементов: ",
        item_selector: '.item',
        active_item_class: 'item-selected',
        header_selector: ".item-header",
        footer_selector: ".item-footer",
    },
    selector: null,
    f_select: function() {
    },
    f_unselect: function() {
    },
    f_onselect: function() {
    },
    f_onunselect: function() {
    },
    s: function(e) {
        if (!this.selector)
            return $(e);
        return $(e, this.selector)
    },
    init: function() {
        var self = this;
        this.s(this.settings.item_selector + ":not(.btn)").click(function(event) {
            if (!$(event.target).hasClass("btn"))
                if ($(this).hasClass(self.settings.active_item_class))
                    self.unselect($(this));
                else
                    self.select($(this));
        });
    },
    select: function(e) {
        var l = this.s("." + this.settings.active_item_class).length;
        if (e)
            $(e).addClass(this.settings.active_item_class);
        var l2 = this.s("." + this.settings.active_item_class).length;

        if (this.f_onselect)
            this.f_onselect;

        this.s(this.settings.footer_selector).html(this.settings.scope + l2);

        if (l == 0 && l2 > 0 || (l == l2 && l2 == 0)) {
            if (this.f_select)
                this.f_select();
            this.s(this.settings.footer_selector).html(this.settings.scope + l2);
        }

    },
    unselect: function(e) {
        var l = this.s("." + this.settings.active_item_class).length;
        $(e).removeClass(this.settings.active_item_class);
        var l2 = this.s("." + this.settings.active_item_class).length;

        if (this.f_onunselect)
            this.f_onunselect;

        this.s(this.settings.footer_selector).html(this.settings.scope + l2);

        if (l > 0 && l2 == 0 || (l == l2 && l2 == 0)) {
            if (this.f_unselect)
                this.f_unselect();
            this.s(this.settings.footer_selector).html("");
        }
    },
    selects: function(arr) {
        var self = this;
        arr.each(function() {
            self.select(this);
        })

        return false;
    },
    unselects: function(arr) {
        var self = this;
        arr.each(function() {
            self.unselect(this);
        })

        return false;
    },
    selectAll: function() {
        this.selects(this.s(this.settings.item_selector));
        return false;
    },
    unselectAll: function() {
        this.unselects(this.s(this.settings.item_selector));
        return false;
    },
    getSelected: function(cb) {
        var self = this;
        this.s("." + this.settings.active_item_class).each(function(i, e) {
            cb($(e));
            self.select(null);
        });
    },
    getAllSelected: function(cb) {
        var self = this;
        var arr = [];
        this.s("." + this.settings.active_item_class).each(function(i, e) {
            arr.push($(e));
            self.select(null);
        }).promise().done(function() {
            cb(arr);
        });
    },
    getAllSelectedAttr: function(attr, cb) {
        var attrs = [];
        this.getAllSelected(function(arr) {
            for (var i in arr) {
                attrs.push(arr[i].data(attr))
            }
            
            cb(attrs);
        });
    },
    onSelect: function(cb) {
        this.f_onselect = cb;
    },
    onUnSelect: function(cb) {
        this.f_onunselect = cb;
    },
    onHasSelected: function(cb) {//0->1
        this.f_select = cb;
    },
    onHasNoSelected: function(cb) {//1->0
        this.f_unselect = cb;
    }
};
