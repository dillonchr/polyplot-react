import React from 'react';
import MapService from './services/maps';
import Map from './components/map';
import SearchContainer from './components/search-container';
import colors from './colors';

export default class App extends React.PureComponent {
    state = {
        isLoading: false
    };

    map;

    componentDidMount() {
        this.map = new MapService(this.dom);
        this.map.sdk
            .then(() => {
                if ('geolocation' in navigator) {
                    navigator.geolocation.getCurrentPosition(pos => {
                        this.map.setCenter({lat: pos.coords.latitude, lng: pos.coords.longitude});
                    }, () => {
                        console.error('CURRENT_LOCATION: Not permitted access to location');
                    });
                } else {
                    console.error('CURRENT_LOCATION: Unsupported in current browser');
                }
            });
    }

    notLoading = () => this.setState({ isLoading: false });

    search = queries => {
        this.setState({ isLoading: true });
        this.clearMarkers();
        this.map.searchForPlaces(queries)
            .then(results => {
                results
                    .forEach((res, i) => {
                        res.map(r => this.map.addPlaceMarker(r.geometry.location, colors[i]));
                    });
                this.notLoading();
            })
            .catch(this.notLoading);
    };

    clearMarkers = () => this.map.removeAllPlaceMarkers();

    render() {
        return (
            <div>
                <SearchContainer isLoading={this.state.isLoading} search={this.search} clear={this.clearMarkers} />
                <Map onRef={elem => this.dom = elem} />
            </div>
        );
    }
}
