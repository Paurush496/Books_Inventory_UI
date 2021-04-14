import React from 'react';
import ReactDOM from 'react-dom';
import Inventory from './Inventory.js';
import './index.css';
import { SearchInventory } from './SearchInventory.js';
import { ListBookCards } from './ListBookCards.js';

const url = "http://localhost:8080/api/book/"

class BookStore extends React.Component {
    constructor(props) {
      super(props);
      this.state = { items: [] };
    }

    componentDidMount(){
        this.getAllInventoryBooks();
    }

    getAllInventoryBooks = () => {
        fetch(url.concat("book"), {
            Method: 'GET'})
            .then((response) => response.json())
            .then((data) => {
                this.setState({items: data})
            });
    }

    render() {
      return (
          <div>
            <div id="header_container">
                <h1>BOOK STORE</h1>
                <div id="search_container">
                    <Inventory onSearch={this.getAllInventoryBooks}/>
                    <SearchInventory onInventorySearch={this.handleInventorySearch}/>
                </div>
            </div>
            <ListBookCards dataList={this.state.items} />
          </div>
      );
    }
  
    handleInventorySearch = (e, searchString) => {
      e.preventDefault();
      if (searchString.length === 0) {
        return;
      }

      fetch(url.concat(searchString), {
        Method: 'GET'})
        .then((response) => response.json())
        .then((data) => {
            this.setState({items: data})
        });
    }
  }
  
  ReactDOM.render(
    <BookStore />,
    document.getElementById('root')
  );