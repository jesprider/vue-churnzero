import promisify from '../promisify';

test('should return value if promise is already passed', () => {
    const promise = new Promise(() => {});
    expect(promisify(promise)).toEqual(promise);
});

test('should return resolved promise if simple value passed', () => {
    const promise = promisify('id-123');
    let value;
    promise.then(val => {
        value = val;
        expect(value).toEqual('id-123');
    });
});
