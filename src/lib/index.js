import query from './query';
import trackEvent from './event';
import t from './t';
import config from '../config';

export default {
    query,
    trackEvent,
    t,
    commands: config.commands,
};
