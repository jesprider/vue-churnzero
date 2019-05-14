import config from './config';
import fireUntrackedEvents from './untracked';
import directive from './directive';
import trackRoutes from './router';

import query from './lib/query';
import lib from './lib';

import loadScript from './utils/loader';
import promisify from './utils/promisify';

export default function install(Vue, options = {}) {
    const {
        appKey,
        accountId,
        contactId,
        url,
        isDisabled,
        router,
        routerEventName,
        isDebugMode,
        isEurope,
        commands,
    } = options;

    if (isDisabled) {
        Vue.directive('cz', {});
        Vue.prototype.$cz = lib;
        Vue.$cz = lib;
        return;
    }

    if (isDebugMode) {
        config.isDebugMode = true;
    }

    if (!appKey) {
        throw new Error(
            '[vue-churnzero] Missing the "appKey" parameter. Add App Key from your account.'
        );
    }

    if (!accountId) {
        throw new Error(
            '[vue-churnzero] Missing the "accountId" parameter. ' +
                'The accountId is your unique record to identify the external account. ' +
                'This ID should be in your CRM.'
        );
    }

    if (!contactId) {
        throw new Error(
            '[vue-churnzero] Missing the "contactId" parameter. ' +
                'The contactId must be unique within the account. ' +
                'This could be a email address, a unique record that is also contained in your CRM, ' +
                'or the ID of the contact record of your CRM.'
        );
    }

    if (url && isEurope) {
        throw new Error(
            "[vue-churnzero] url and isEurope properties can't be used together." // eslint-disable-line
        );
    }

    if (commands) {
        config.commands = commands;
    }

    Vue.directive('cz', directive);
    Vue.prototype.$cz = lib;
    Vue.$cz = lib;

    if (router) {
        if (routerEventName) {
            config.routerEventName = routerEventName;
        }
        config.router = router;
        trackRoutes(router, config.routerEventName);
    }

    const queue = [
        promisify(appKey),
        promisify(accountId),
        promisify(contactId),
    ];

    if (!window.ChurnZero) {
        let scriptUrl = config.url;

        if (url) {
            scriptUrl = url;
        }

        if (isEurope) {
            scriptUrl = config.europeUrl;
        }

        queue.push(
            loadScript(scriptUrl).catch(() => {
                throw new Error(
                    '[vue-analytics] An error occured! Please check your connection, ' +
                        'if you have any Google Analytics blocker installed in your browser ' +
                        'or check your custom resource URL if you have added any.'
                );
            })
        );
    }

    Promise.all(queue).then(([key, aid, cid]) => {
        config.appKey = key;
        config.accountId = aid;
        config.contactId = cid;

        query('setAppKey', key);
        query('setContact', aid, cid);
        fireUntrackedEvents(config.untracked);
        config.untracked = [];
    });
}
