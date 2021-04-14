import React from 'react';

const url = "http://localhost:8080/api/book/book/"

export class BookCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            noOfCopies: props.noOfCopies,
            items: []
        }
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        var book = this.props;
        var isAddedToInventory = book.noOfCopies != 0;
        var cardFooter = this.generateCardFooter(isAddedToInventory);
        return(
            <div className="card_wrapper">
                <div id="card_body">
                    <div id="book_info">
                        <h3 id="header_container">{book.bookTitle}</h3>
                        <h4>Authors:</h4>
                        {this.getAuthorsList()}
                        <h4>Published Date:</h4>{book.publishedDate}
                    </div>
                    {isAddedToInventory && <div id="inventory_status">
                        <h4>Inventory Copies</h4>
                        <input id="noOfCopies" type="number" value={this.state.noOfCopies} 
                            onChange={this.handleChange} min="1" />
                    </div>}
                </div>
                {cardFooter}
            </div>
        )
    }

    handleChange(e) {
        this.setState({ noOfCopies: e.target.value });
    }

    addToInventory =()=> {
        let book = {
            bookId: this.props.bookId,
            bookTitle: this.props.bookTitle,
            authors: this.props.authors,
            publishedDate: this.props.publishedDate,
            noOfCopies: 1
        }
        fetch(url, {
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(book)
        }).then((response) => response.json())
          .then((data) => {
            this.setState(state => ({
                items: data,
                noOfCopies: 1
            }))
        });
    }

    updateInventory =()=> {
        let book = {
            bookId: this.props.bookId,
            bookTitle: this.props.bookTitle,
            authors: this.props.authors,
            publishedDate: this.props.publishedDate,
            noOfCopies: this.state.noOfCopies
        }
        fetch(url, {
            method: 'PUT',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(book)
        }).then((response) => response.json())
          .then((data) => {
            this.setState({items: data})
        });
    }

    removeFromInventory =() => {
        fetch(url.concat(this.props.bookId), {
            method: 'DELETE',
            headers: {'Content-type':'application/json'}
        }).then((response) => response.json())
          .then((data) => {
            this.setState({items: data})
        });
    }

    generateCardFooter = (isAddedToInventory) => {
        if(isAddedToInventory) {
            return (
                <div id="card_footer">
                    <button onClick={this.updateInventory}> Save </button>
                    <button onClick={this.removeFromInventory}> Remove All Copies </button>   
                </div>
            )
        } else return (
            <div id="card_footer">
                <button onClick={this.addToInventory}> Add to Inventory </button>
                <p> No copies currently in the Inventory </p>   
            </div>
        )
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