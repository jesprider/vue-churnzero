import query from './query';

/**
 * Shorhand version of trackEvent to be used with vue-churnzero directive.
 *
 * Without it you have to bind an event on your own:
 * v-cz="$cz.trackEvent.bind(this, 'tracked item')"
 *
 * With this shorthand helper it looks like this:
 * v-cz="$cz.t(this, 'tracked item')"
 */
export default function t(context, ...args) {
    return query.bind(this, 'trackEvent', ...args);
}
