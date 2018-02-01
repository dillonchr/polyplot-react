import React, { Component } from 'react';
import MapService from './services/maps';
import Map from './components/map';
import SearchContainer from './components/search-container';
import colors from './colors';

export default class App extends Component {
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

    search = queries => {
        this.map.searchForPlaces(queries)
            .then(results => {
                results
                    .forEach((res, i) => {
                        res.map(r => this.map.addPlaceMarker(r.geometry.location, colors[i]));
                    });
            });
    };

    render() {
        return (
            <div>
                <SearchContainer search={this.search} />
                <Map onRef={elem => this.dom = elem} />
            </div>
        );
    }
}
