import {Cache} from "../src/cache";
describe("set", () => {
    test('cache full set', () => {
        const c = new Cache();
        c.set('name','John',3);
        c.set('color','green',2);

        expect(c._cache.get('name').val).toBe('John');
        expect(c._cache.get('name').refCount).toBe(3);
        expect(c._cache.get('color').val).toBe('green');
        expect(c._cache.get('color').refCount).toBe(2);
    });

    test('cache set with missed value or reference count', () => {
        const c = new Cache();
        c.set('name',3);
        c.set('color','green')

        expect(c._cache.get('name').val).toBe(undefined);
        expect(c._cache.get('color').refCount).toBe(1);
    });


    test('cache set with missed value and reference count', () => {
        const c = new Cache();
        c.set('name');

        expect(c._cache.get('name').val).toBe(undefined);
        expect(c._cache.get('name').refCount).toBe(1);
    });

    test('cache set overwrite', () => {
        const c = new Cache();
        c.set('name','John',5);
        c.set('name','David',2);

        expect(c._cache.get('name').val).toBe('David');
        expect(c._cache.get('name').refCount).toBe(2);

        c.set('name');

        expect(c._cache.get('name').val).toBe(undefined);
        expect(c._cache.get('name').refCount).toBe(1);
    });

    test('negative or zero reference count case', () => {
        const c = new Cache();
        c.set('name','John',5);
        c.set('color','red',-5);
        c.set('feature','rusty',0);

        expect(c._cache.size).toBe(1);
        expect(c._cache.has('color')).toBe(false);
        expect(c._cache.has('feature')).toBe(false);
    });
});

describe("get", () => {
    test('base get return check', () => {
        const c = new Cache();
        c.set('name','John',3);
        c.set('color','green',2);

        expect(c.get('name')).toBe('John');
        expect(c.get('color')).toBe('green');
    });

    test('get reduce reference count check', () => {
        const c = new Cache();
        c.set('name','John',3);
        c.get('name');
        c.get('name');

        expect(c._cache.get('name').refCount).toBe(1);
    });

    test('zero reference count deletion check', () => {
        const c = new Cache();
        c.set('name','John',2);
        c.get('name');
        c.get('name');

        expect(c._cache.has('name')).toBe(false);
    });

    test('null return if key is missing check', () => {
        const c = new Cache();
        c.set('name','John',2);

        expect(c.get('color')).toBe(null);

        c.get('name');
        c.get('name');

        expect(c.get('name')).toBe(null);
    });

    test('null return if value is missing check', () => {
        const c = new Cache();
        c.set('name',2);

        expect(c.get('name')).toBe(null);
    });
});