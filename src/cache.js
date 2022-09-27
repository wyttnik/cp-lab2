class Cache{
    constructor() {
        this._cache = new Map();
    }

    set = (key, value, count = 1) => {
        if (key === undefined) return;
        if (count <= 0) return;
        else this._cache.set(key, {val: value, refCount: count});
    };

    get = (key) => {
        const res = this._cache.get(key);
        // if key is missing -> null
        if (res === undefined) return null;
        this._cache.set(key, {val: res.val, refCount: res.refCount - 1});
        if (res.refCount - 1 === 0) this._cache.delete(key);
        return res.val === undefined ? null : res.val;
    };

    getStatistic() {
        const arr = [];
        this._cache.forEach((value,key) => arr.push({key,
            value:value.val,
            refCount:value.refCount}));
        alert(JSON.stringify(arr));
    }
}
export {Cache}
