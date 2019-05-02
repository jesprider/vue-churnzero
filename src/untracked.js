import query from './lib/query';

export default function fireUntrackedEvents(untrackedEvents) {
    untrackedEvents.forEach(({ method, args }) => {
        query(method, ...args);
    });
}
