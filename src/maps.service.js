export default class MapsService {
    _sdkPromise;
    _map;

    constructor(elem) {
        this._map = this.sdk.then(() => {
            return new window.google.maps.Map(elem, {
                center: {lat: -34.397, lng: 150.644},
                zoom: 13
            });
        });
    }

    get map() {
        return this._map;
    }

    get sdk() {
        if (!this._sdkPromise) {
            this._sdkPromise = new Promise((resolve, reject) => {
                const script = document.createElement('script');
                const callback = `maps${new Date().getTime()}`;
                window[callback] = resolve;
                script.addEventListener('error', reject);
                script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyCaMRWqlcMu96wUqotTCAwxNXPIH8Rif6c&callback=${callback}`;
                document.body.appendChild(script);
            });
        }
        return this._sdkPromise;
    }
}
