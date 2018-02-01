import React from 'react';
import './search-container.css';

export default class SearchContainer extends React.Component {
    state = {
        queries: [''],
        frozen: false
    };

    handleFormSubmit = e => {
        e.preventDefault();
        if (!this.state.frozen && this.state.queries.filter(q => !!q).length > 0) {
            this.props.search(this.state.queries.filter(q => !!q));
            this.setState({ frozen: true });
        } else if (this.state.frozen) {
            this.props.clear();
            this.setState({ frozen: false, queries: [''] });
        }
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
            .filter(q => !this.state.frozen || !!q)
            .map((q, i) => {
                const onInput = ({target}) => this.onInput(i, target.value);
                return (
                    <label key={i} className="search__label">
                        <input key={i} readOnly={this.state.frozen} className="search__input" placeholder="Search" value={q} onChange={onInput}/>
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
                    <button className="search__button" onClick={this.handleFormSubmit}>
                        {this.state.frozen ? 'Clear' : 'Search'}
                    </button>
                </form>
            </div>
        );
    }
}