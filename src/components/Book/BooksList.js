import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteBook } from '../../store/BookSlice';

const BooksList = ({ isLoading, books, isLoggedIn, getBooksID }) => {
  const dispatch = useDispatch()
  const bookList =books.length > 0 ? books.map((item) => (
    <li key={item.id} className='list-group-item d-flex  justify-content-between align-items-center'>
      <div>{item.title}</div>
      <div className='btn-group' role='group'>
        <button type='button' className='btn btn-primary'onClick={()=>getBooksID(item.id)}>
          Read
        </button>
        <button type='button' className='btn btn-danger' disabled={!isLoggedIn} onClick={()=>dispatch(deleteBook(item))
            .unwrap()
            .then((originalPromiseResult) => {
              console.log(originalPromiseResult)
            })
            .catch((rejectedValueOrSerializedError) => {
              console.log(rejectedValueOrSerializedError)
            })
        }>
          Delete
        </button>
      </div>
    </li>
  )) : "There is ono books available";
  return (
    <div>
      <h2>Books List</h2>
      {
        isLoading ? 'Loading...'
        :
      <ul className='list-group'>
        {bookList}
      </ul>
      }
    </div>
  );
};

export default BooksList;
