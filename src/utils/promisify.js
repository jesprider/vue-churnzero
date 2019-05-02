export default function promisify(value) {
    if (value.then) {
        return value;
    }

    if (typeof value === 'function') {
        const payload = value();

        return payload.then ? payload : Promise.resolve(payload);
    }

    return Promise.resolve(value);
}
