import loadScript from '../loader';

describe('script loader', () => {
    it('should append script tag to head', () => {
        loadScript('http://loading-script.com/my-script.js');
        expect(document.head.innerHTML).toMatch(
            'http://loading-script.com/my-script.js'
        );
    });

    it('should return promise', () => {
        const promise = loadScript('http://loading-script.com/my-script.js');
        expect(promise).toHaveProperty('then');
        expect(promise).toHaveProperty('catch');
    });
});
