(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.VueLocalStorage = factory());
}(this, (function () { 'use strict';

var VueLocalStorage = function VueLocalStorage () {
    var this$1 = this;

    this.storage = window.localStorage;

    Object.defineProperty(this, "length", {
        get: function get() { return this.storage.length; }
    });

    var clear = function () {
        if (this$1.length == 0) return;
        for (var i = 0; i < this$1.length; i++) {
            var key = this$1.storage.key(i);
            if (false == /vuels__/i.test(key)) continue;
            var current = JSON.parse(this$1.storage.getItem(key));
             if (current.expire > 0 && current.expire < new Date().getTime()) {
                 this$1.storage.removeItem(key);
            }
        }
    };
    clear();
};
VueLocalStorage.prototype.install = function install (Vue) {
    var _this = this;
    Vue.localStorage = _this;
    Object.defineProperty(Vue.prototype, "$localStorage", {
        get: function get() {
            return _this;
        }
    });
};

VueLocalStorage.prototype.set = function set (name, value, expire) {
        if ( expire === void 0 ) expire = 0;

    this.storage.setItem(
        'vuels__' + name,
        JSON.stringify({value:value, expire:expire > 0 ? new Date().getTime() + expire : expire})
    );
};
VueLocalStorage.prototype.get = function get (name) {
    var item = this.storage.getItem('vuels__' + name);
    if (null != item) return JSON.parse(item).value;
    return null;
};
VueLocalStorage.prototype.remove = function remove (name) {
    return this.storage.removeItem('vuels__' + name);
};
VueLocalStorage.prototype.key = function key (index) {
    return this.storage.key(index);
};

if (window.Vue) {
    window.Vue.use(new VueLocalStorage);
}

return VueLocalStorage;

})));
