import React from 'react';
import './search-container.css';

export default class SearchContainer extends React.Component {
    state = {
        queries: [''],
        pristine: false
    };

    handleFormSubmit = e => {
        e.preventDefault();
        if (!this.state.pristine && this.state.queries.filter(q => !!q).length > 0) {
            this.props.search(this.state.queries.filter(q => !!q));
            this.setState({ pristine: true });
        } else if (this.state.pristine) {
            this.props.clear();
            this.setState({ pristine: false, queries: [''] });
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

    removePristine = () => this.setState({ pristine: false });

    renderInputs() {
        return this.state.queries
            .filter(q => !this.state.pristine || !!q)
            .map((q, i) => {
                const onInput = ({target}) => this.onInput(i, target.value);
                return (
                    <label key={i} className="search__label">
                        <input key={i} onFocus={this.removePristine} readOnly={this.state.frozen} className="search__input" placeholder="Search" value={q} onChange={onInput}/>
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
                        {this.props.isLoading ? 'Loading...' : (this.state.pristine ? 'Clear' : 'Search')}
                    </button>
                </form>
            </div>
        );
    }
}