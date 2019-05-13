import React, { useState } from 'react';
import { graphql } from 'react-apollo';

import BookDetails from './BookDetails';

import { getBooksQuery } from '../queries/queries';

function BookList(props) {
  
  const [bookId, setBookId] = useState('');

  const displayBookDetails = (id) => {
    setBookId(id);
  }

  const displayBooks = () => {
    const data = props.data;
    if (data.loading) {
      return <div>Loading books ...</div>
    } else {
      return data.books.map(book => 
        <li 
          key={ book.id }
          onClick={ () => displayBookDetails(book.id) }>
            { book.name }
        </li>
      );
    }
  }

  return (
    <div>
      <ul id="book-list">
        { displayBooks() }
      </ul>
      <BookDetails bookId={ bookId } />
    </div>
  );

}

export default graphql(getBooksQuery)(BookList);