import query from '../query';
import config from '../../config';

jest.mock('../../config');

beforeEach(() => {
    config.untracked = [];
});

describe('querying to ChurnZero', () => {
    it('should push the event to untracked if no ChurnZero available in window', () => {
        query('trackEvent', 'event name', 'event description');
        expect(config.untracked).toHaveLength(1);
        expect(config.untracked[0]).toHaveProperty('method');
        expect(config.untracked[0]).toHaveProperty('args');
        expect(config.untracked[0].method).toMatch('trackEvent');
        expect(config.untracked[0].args).toEqual([
            'event name',
            'event description',
        ]);
    });

    it('should fire window.ChurnZero if it is available on window', () => {
        window.ChurnZero = {};
        window.ChurnZero.push = jest.fn();

        query('trackEvent', 'event name', 'event description');

        expect(window.ChurnZero.push).toBeCalledWith([
            'trackEvent',
            'event name',
            'event description',
        ]);
    });

    it('should be called correct amount of times', () => {
        window.ChurnZero = {};
        window.ChurnZero.push = jest.fn();

        query('trackEvent 1', 'event name 1', 'event description 1');
        query('trackEvent 2', 'event name 2', 'event description 2');

        expect(window.ChurnZero.push).toBeCalledTimes(2);
    });
});
