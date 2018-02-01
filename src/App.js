import React, { Component } from 'react';
import MapService from './services/maps';
import Map from './components/map';
import SearchContainer from './components/search-container';

export default class App extends Component {
    map;

    componentDidMount() {
        this.map = new MapService(this.dom);
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(pos => {
                this.map.setCenter({lat: pos.coords.latitude, lng: pos.coords.longitude});
            }, () => {
                console.error('CURRENT_LOCATION: Not permitted access to location');
            });
        } else {
            console.error('CURRENT_LOCATION: Unsupported in current browser');
        }
    }

    search = query => {
        this.map.searchForPlace(query)
            .then(results => {
                results.map(r => this.map.addPlaceMarker(r.geometry.location, 'crimson'));
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
