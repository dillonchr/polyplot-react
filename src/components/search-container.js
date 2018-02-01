import React from 'react';
import './search-container.css';

export default class SearchContainer extends React.Component {
    state = {
        value: ''
    };

    handleFormSubmit = e => {
        e.preventDefault();
        this.props.search(this.state.value);
    };

    onInput = ({target}) => {
        this.setState({value: target.value});
    };

    render() {
        return (
            <div className="search">
                <h1 className="search__header">PolyPlot</h1>
                <form className="search__form" onSubmit={this.handleFormSubmit}>
                    <input  className="search__input"
                            placeholder="Search for places in bounds..."
                            value={this.state.value}
                            onChange={this.onInput}/>
                </form>
            </div>
        );
    }
}