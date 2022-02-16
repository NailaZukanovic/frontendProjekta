import React, { useContext, useState } from 'react';
import { BookContext } from './context/BookContext';
import './BookList.css';

const NewBookForm = () => {
  const { dispatch } = useContext(BookContext);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'ADD_BOOK', book: { title, author }});
    setTitle('');
    setAuthor('');
  }

  return (
    <form class="form" onSubmit={handleSubmit}>
      <input class="inputBook" type="text" placeholder="book title" value={title}
        onChange={(e) => setTitle(e.target.value)} required />
      <input class="inputBook" type="text" placeholder="author name" value={author}
        onChange={(e) => setAuthor(e.target.value)} required />
      <input class="inputBook" type="submit" value="add book" />
    </form>
  );
}
 
export default NewBookForm;