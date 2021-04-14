import React from 'react';
import { BookCard } from './BookCard';

export class ListBookCards extends React.Component {
    constructor(props) {
        super(props);
    }

    renderList = ({dataList}) => {
        if(dataList){
            return dataList.map(book => {
                return(<BookCard key={book.bookId} {...book} />)
            })
        }
    }

    render() {
        return this.renderList(this.props);
    }
}