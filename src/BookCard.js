import React from 'react';

const url = "https://book-store-service.herokuapp.com/api/book/"

export class BookCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            noOfCopies: props.noOfCopies
        }
        this.handleChange = this.handleChange.bind(this);
    }

    render() { 
        var isAddedToInventory = this.state.noOfCopies != 0;
        var cardFooter = this.generateCardFooter(isAddedToInventory);
        return(
            <div className="card_wrapper">
                <div id="card_body">
                    <div id="book_info">
                        <h3 id="header_container">{this.props.bookTitle}</h3>
                        <h4>Authors:</h4>
                        {this.getAuthorsList()}
                        <h4>Published Date:</h4>{this.props.publishedDate}
                    </div>
                    {isAddedToInventory && 
                        <div id="inventory_status">
                            <h4>Inventory Copies</h4>
                            <input id="noOfCopies" type="number" value={this.state.noOfCopies} 
                                onChange={this.handleChange} min="1" />
                        </div>}
                </div>
                {cardFooter}
            </div>
        )
    }

    generateCardFooter = (isAddedToInventory) => {
        var book = {
            bookId: this.props.bookId,
            bookTitle: this.props.bookTitle,
            authors: this.props.authors,
            publishedDate: this.props.publishedDate,
            removeFromInventory: this.props.removeFromInventory,
            noOfCopies: this.props.noOfCopies
        }
        if(isAddedToInventory) {
            return (
                <div id="card_footer">
                    <button onClick={this.updateInventory.bind(this, book)}> Save </button>
                    <button onClick={this.removeFromInventory.bind(this, book.bookId)}> 
                        Remove All Copies </button>   
                </div>
            )
        } else return (
            <div id="card_footer">
                <button onClick={this.addToInventory.bind(this, book)}> Add to Inventory </button>
                <p> No copies currently in the Inventory </p>   
            </div>
        )
    }

    handleChange(e) {
        this.setState({ noOfCopies: e.target.value });
    }

    addToInventory = (book)=> {
        book.noOfCopies = 1;
        fetch(url, {
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(book)
        }).then((response) => response.json())
          .then(() => { this.setState({ noOfCopies: 1 }) });
    }

    updateInventory =(book)=> {
        book.noOfCopies = this.state.noOfCopies;
        fetch(url, {
            method: 'PUT',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(book)
        }).then((response) => response.json())
          .then((data) => { this.setState({ noOfCopies: data.noOfCopies }) });
    }

    removeFromInventory =(bookId) => {
        fetch(url.concat(bookId), {
            method: 'DELETE',
            headers: {'Content-type':'application/json'}
        }).then((response) => response.text())
          .then(this.setState({noOfCopies: 0}));
    }

    toggleInventoryStatus=(bookId)=>{
        this.props.removeFromInventory.bind(this, bookId)
    }

    getAuthorsList=()=> {
        var authors = this.props.authors;
        if (authors != null) {
            return(
                <ul>{authors.map(author => {
                    return <li key={author}>{author}</li>
                    })}
                </ul>
            )
        }
    }

}