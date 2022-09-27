
class Cache{
    constructor() {
		this._cache = new Map();
	}

    set = (key, value = undefined, count = 1) => {
        // don't know how to handle situation like ('name',3)
        // somewhat of solution
        if (count <= 0) return;
        if (Number.isInteger(value)) {
            this._cache.set(key, {val: undefined, refCount: value});
        }
        else this._cache.set(key, {val: value, refCount: count});
    };

    get = (key) => {
        const res = this._cache.get(key);
        // if key is missing -> null
        if (res === undefined) return null;
        // if val is missing return null but keep such key and lower ref
        this._cache.set(key, {val: res.val, refCount: res.refCount - 1});
        if (res.refCount - 1 === 0) this._cache.delete(key);
        return res.val === undefined ? null : res.val;
    };

    getStatistic() {
        console.log(this._cache);
        const arr = [];
        this._cache.forEach((value,key) => arr.push({key,
                                           value:value.val,
                                           refCount:value.refCount}));
        alert(JSON.stringify(arr));
    }
}
export {Cache}