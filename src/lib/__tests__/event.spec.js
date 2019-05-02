import trackEvent from '../event';
import query from '../query';

jest.mock('../query');

test('should trigger query function with "trackEvent" method', () => {
    trackEvent('navigation_click', 'home');
    expect(query).toBeCalledWith('trackEvent', 'navigation_click', 'home');

    trackEvent('navigation_click', 'about');
    expect(query).toBeCalledTimes(2);
});
