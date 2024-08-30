Set.prototype.append = function (arr) {
    for (let i = 0; i < arr.length; i++) {
        this.add(arr[i]);
    }
    return this;
};

Set.prototype.toggle = function (val) {
    if (this.has(val)) {
        this.delete(val);
        return false;
    }
    this.add(val);
    return true;
};

Set.prototype.intersect = function(what){
    const out = new Set;
    what.forEach(val => this.has(val) && out.add(val));
    return out;
}