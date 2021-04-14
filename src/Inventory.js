import React from 'react';

class Inventory extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(<button onClick={this.props.onSearch}> Inventory </button>);
    }
}

export default Inventory;