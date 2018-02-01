import React from 'react';
import './search-container.css';

export default class SearchContainer extends React.Component {
    state = {
        queries: ['']
    };

    handleFormSubmit = e => {
        e.preventDefault();
        this.props.search(this.state.queries.filter(q => !!q));
    };

    onInput = (i, value) => {
        //    build next queries state
        const queries = this.state.queries
            .map((q, j) => i === j ? value : q)
            .filter((q, i, a) => !!q || a.indexOf('') === i);
        //    check if we need another input
        if (queries.length < 7 && queries[queries.length - 1]) {
            queries.push('');
        }
        this.setState({ queries });
    };

    renderInputs() {
        return this.state.queries
            .map((q, i) => {
                const onInput = ({target}) => this.onInput(i, target.value);
                return (
                    <label key={i} className="search__label">
                        <input key={i} className="search__input" placeholder="Search" value={q} onChange={onInput}/>
                    </label>
                );
            });
    }

    render() {
        return (
            <div className="search">
                <h1 className="search__header">PolyPlot</h1>
                <form className="search__form" onSubmit={this.handleFormSubmit}>
                    {this.renderInputs()}
                    <button className="search__button" onClick={this.handleFormSubmit}>Search</button>
                </form>
            </div>
        );
    }
}