export default function loadScript(url) {
    return new Promise((resolve, reject) => {
        const head = document.head || document.getElementsByTagName('head')[0];
        const script = document.createElement('script');
        script.async = true;
        script.src = url;

        head.appendChild(script);

        script.onload = resolve;
        script.onerror = reject;
    });
}
