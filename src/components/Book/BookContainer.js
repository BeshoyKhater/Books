import React, { Fragment, useEffect, useState } from 'react';
import BookInfo from './BookInfo';
import BooksList from './BooksList';
import './book.css';
import { useDispatch, useSelector } from 'react-redux';
import { getBooks } from '../../store/BookSlice';

const PostContainer = () => {
  const { isLoading, books } = useSelector((state)=> state.books)
  const { isLoggedIn } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getBooks())
  }, [dispatch]);

  const [selectedBook, setSelectedBook] = useState(null)
  const getBooksID = (id) => {
    const selectedBook = books.find((el)=> el.id === id) 
    setSelectedBook((prev)=> {
      return {...prev,...selectedBook}
    })
  }
  return (
    <Fragment>
      <hr className='my-5' />
      <div className='row'>
        <div className='col'>
          <BooksList isLoading={isLoading} books={books} isLoggedIn={isLoggedIn} getBooksID={getBooksID} />
        </div>
        <div className='col side-line'>
          <BookInfo info={selectedBook} />
        </div>
      </div>
    </Fragment>
  );
};

export default PostContainer;
