export default class MapsService {
    _sdkPromise;
    map;
    places;
    userMarker;
    center;

    constructor(elem) {
        this.loadSDK().then(() => {
            this.map = new window.google.maps.Map(elem, {
                center: this.coords || {lat: -34.397, lng: 150.644},
                zoom: 13
            });
            this.places = new window.google.maps.places.PlacesService(this.map);
        });
    }

    setCenter(coords) {
        this.center = coords;
        if (this.map) {
            this.map.setCenter(coords);
            this.addUserMarker(coords);
        }
    }

    addUserMarker(coords) {
        if (this.userMarker) {
            this.userMarker.setMap(null);
        }
        this.userMarker = new window.google.maps.Marker({
            icon: {
                path: window.google.maps.SymbolPath.CIRCLE,
                fillColor: 'powderblue',
                fillOpacity: 1,
                strokeColor: 'dodgerblue',
                strokeWeight: 2,
                scale: 5
            },
            map: this.map,
            position: coords
        });
    }

    addPlaceMarker(coords, color) {
        return new window.google.maps.Marker({
            icon: {
                path: window.google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                fillColor: color,
                fillOpacity: 0.7,
                strokeColor: color,
                strokeWeight: 2,
                scale: 3
            },
            map: this.map,
            position: coords
        });
    }

    searchForPlace(keyword) {
        return new Promise((resolve, reject) => {
            this.places.nearbySearch({
                bounds: this.map.getBounds(),
                keyword: keyword
            }, (results, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                    resolve(results);
                } else {
                    reject(status);
                }
            });
        });
    }

    loadSDK() {
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
