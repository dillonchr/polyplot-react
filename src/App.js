import React, { Component } from 'react';
import Maps from './maps.service';

const styles = {
    background: 'magenta',
    bottom: 0,
    height: '100vh',
    left: 0,
    position: 'fixed',
    right: 0,
    top: 0,
    width: '100vw'
};

const searchStyles = {
    form: {
        bottom: '2em',
        left: '2em',
        position: 'fixed',
        zIndex: 2
    },
    input: {
        padding: '0.5em',
        width: '250px'
    }
}

export default class App extends Component {
    map;

    constructor(props) {
        super(props);
        this.state = {value: ''};
    }

    render() {
        return (
            <div>
                <form style={searchStyles.form} onSubmit={this.search.bind(this)}>
                    <input  style={searchStyles.input}
                            placeholder="Search for places in bounds..."
                            value={this.state.value}
                            onChange={this.handleChange.bind(this)}/>
                </form>
                <div style={styles} ref={elem => this.dom = elem}></div>
            </div>
        );
    }

    handleChange(e) {
        this.setState({value: e.target.value});
    }

    search(e) {
        e.preventDefault();
        this.map.searchForPlace(this.state.value)
            .then(results => {
                results.map(r => this.map.addPlaceMarker(r.geometry.location, 'crimson'));
            });
    }

    componentDidMount() {
        this.map = new Maps(this.dom);
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
}
