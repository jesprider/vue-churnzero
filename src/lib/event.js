import query from './query';

export default function trackEvent(...args) {
    query('trackEvent', ...args);
}
