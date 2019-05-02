import config from './config';

export default {
    inserted(el, binding, vnode) {
        const events = Object.keys(binding.modifiers);

        if (events.length === 0) {
            events.push('click');
        }

        const handler = () => {
            const fn = typeof binding.value === 'string' ? config.commands[binding.value] : binding.value;

            if (!fn) {
                throw new Error('[vue-churnzero] The value passed to v-cz is not defined in the commands list.');
            }

            fn.apply(vnode.context);
        };

        el.__vueChurnZero__ = [];

        events.forEach(event => {
            el.addEventListener(event, handler);
            el.__vueChurnZero__.push({ event, handler });
        });
    },
    unbind(el) {
        el.__vueChurnZero__.forEach(({ event, handler }) => {
            el.removeEventListener(event, handler);
        });
        el.__vueChurnZero__ = null;
    },
};
