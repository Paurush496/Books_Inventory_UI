import React from 'react';

export class SearchInventory extends React.Component {
    constructor(props) {
        super(props);
        this.state = { searchString: '' }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        this.props.onInventorySearch(e, this.state.searchString);
    }

    handleChange(e) {
        this.setState({ searchString: e.target.value });
    }

    render() {
        return (
        <form onSubmit={this.handleSubmit}>
            <input id="book-search" onChange={this.handleChange} value={this.state.searchString} />
            <button id="book-search">
              Search
            </button>
        </form>);
    }
}