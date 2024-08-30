DOMRectReadOnly.prototype.isInside = function (what) {
    if (what instanceof MouseEvent) {
        return this.left <= what.clientX &&
            this.right >= what.clientX &&
            this.top <= what.clientY &&
            this.bottom >= what.clientY;
    }
    throw new TypeError('Not supported');
};