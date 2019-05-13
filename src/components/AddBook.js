import React, { useState } from 'react';
import { graphql, compose } from 'react-apollo';

import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

function AddBook(props) {

    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [authorId, setAuthorId] = useState('');

    const displayAuthors = () => {
        const data = props.getAuthorsQuery;
        if (data.loading) {
            return <option disabled>Loading authors ...</option>
        } else {
            return data.authors.map(author => 
                <option key={ author.id } value={ author.id }>{ author.name }</option>
            );
        }
    }

    const addBook = e => {
        e.preventDefault();
        props.addBookMutation({
            variables: {
                name,
                genre,
                authorId
            },
            refetchQueries: [{ query: getBooksQuery }]
        })
    };

    return (
        <form id="add-book" onSubmit={ addBook }>
            <div className="field">
                <label htmlFor="name">Book name:</label>
                <input type="text" id="name" onChange={ e => setName(e.target.value) } />
            </div>
            <div className="field">
                <label htmlFor="genre">Genre:</label>
                <input type="text" id="genre" onChange={ e => setGenre(e.target.value) } />
            </div>
            <div className="field">
                <label htmlFor="author">Author:</label>
                <select id="author" onChange={ e => setAuthorId(e.target.value) }>
                    { displayAuthors() }
                </select>
            </div>
            <button>+</button>
        </form>
    );

}

export default compose(
    graphql(getAuthorsQuery, {name: 'getAuthorsQuery'}),
    graphql(addBookMutation, {name: 'addBookMutation'})
)(AddBook); 