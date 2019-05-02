import config from '../config';

export default function query(method, ...args) {
    if (typeof window === 'undefined') {
        return;
    }

    if (config.isDebugMode) {
        console.info(`[vue-churnzero] > ${method} > ${args.join(', ')}`);
    }

    if (!window.ChurnZero) {
        const event = {
            method,
            args,
        };
        config.untracked.push(event);
        return;
    }

    window.ChurnZero.push([method, ...args]);
}
