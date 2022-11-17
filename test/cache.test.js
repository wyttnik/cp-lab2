import {Cache} from "../src/cache";
test('size check', () => {
    const c = new Cache();
    c.set('color','green');
    c.set('name');

    expect(c.getSize()).toBe(2);
});

test('get reference count by key', () => {
    const c = new Cache();
    c.set('color','green',4);
    expect(c.getRefCount('color')).toBe(4);

    c.set('name','John');
    expect(c.getRefCount('name')).toBe(1);
});

describe("set", () => {
    test('cache size after setting check', () => {
        const c = new Cache();
        c.set('color','green');
        c.set('name');

        expect(c.getSize()).toBe(2);
    });

    test('cache all parameters set check', () => {
        const c = new Cache();
        c.set('name','John',3);
        c.set('color','green',2);

        expect(c.getRefCount('name')).toBe(3);
        expect(c.get('name')).toBe('John');
        expect(c.getRefCount('color')).toBe(2);
        expect(c.get('color')).toBe('green');
    });

    test('cache set with missed reference count', () => {
        const c = new Cache();
        c.set('color','green');

        expect(c.getRefCount('color')).toBe(1);
    });


    test('cache set with missed value and reference count', () => {
        const c = new Cache();
        c.set('name');

        expect(c.getRefCount('name')).toBe(1);
        expect(c.get('name')).toBe(null);
    });

    test('cache set overwrite', () => {
        const c = new Cache();
        c.set('name','John',5);
        c.set('name','David',2);

        expect(c.getRefCount('name')).toBe(2);
        expect(c.get('name')).toBe('David');
        
        c.set('name');

        expect(c.getRefCount('name')).toBe(1);
        expect(c.get('name')).toBe(null);
    });

    test('negative or zero reference count case', () => {
        const c = new Cache();
        c.set('name','John',5);
        c.set('color','red',-5);
        c.set('feature','rusty',0);

        expect(c.getSize()).toBe(1);
        expect(c.get('color')).toBe(null);
        expect(c.get('feature')).toBe(null);
    });

    test('empty key case', () => {
        const c = new Cache();
        c.set()
        c.set()
        c.set()

        expect(c.getSize()).toBe(0);
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

        expect(c.getRefCount('name')).toBe(1);
    });

    test('zero reference count deletion check', () => {
        const c = new Cache();
        c.set('name','John',2);
        c.get('name');
        c.get('name');

        expect(c.get('name')).toBe(null);
        expect(c.getSize()).toBe(0);
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
        c.set('name');

        expect(c.get('name')).toBe(null);
    });
});
