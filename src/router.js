import trackEvent from './lib/event';

export default function trackRoutes(router, routerEventName) {
    router.beforeEach((to, from, next) => {
        if (from.path !== to.path) {
            trackEvent(routerEventName, to.name || to.path);
        }
        next();
    });
}
