import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logInsert } from "./reportSlice";

export const getBooks = createAsyncThunk('book/getBooks', async (_,thunkAPI) => {
    const {RejectWithValue} = thunkAPI;
    try {
        const res = await fetch('http://localhost:4000/Books')
        const data = await res.json();
        return data;
    } catch (error) {
        return RejectWithValue(error.message)
    }
})

export const insertBook = createAsyncThunk('book/insertBook', async (bookData,thunkAPI) => {
    const {RejectWithValue,getState, dispatch} = thunkAPI;
    try {
        bookData.userName = getState().auth.name
        const res = await fetch('http://localhost:4000/Books',{
            method: 'POST',
            body: JSON.stringify(bookData),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        const data = await res.json();
        dispatch(logInsert({name: 'insertBook', state:"success"}))
        return data;
    } catch (error) {
        dispatch(logInsert({name: 'insertBook', state:"failed"}))
        return RejectWithValue(error.message)
    }
})


export const deleteBook = createAsyncThunk('book/deleteBook', async (item,thunkAPI) => {
    const {RejectWithValue} = thunkAPI;
    try {
        await fetch(`http://localhost:4000/Books/${item.id}`,{
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        return item;
    } catch (error) {
        return RejectWithValue(error.message)
    }
})

const bookSlice = createSlice({
    name: 'book',
    initialState: {books: [], isLoading: false, error: null},
    extraReducers: {
        //get book
        [getBooks.pending]: (state,action) => {
            state.isLoading = true
            state.error = null
        },
        [getBooks.fulfilled]: (state,action) => {
            state.isLoading = false
            state.books= action.payload;
        },
        [getBooks.rejected]: (state,action) => {
            state.isLoading = false 
            state.error = action.payload 
        },

        //insertBook
        [insertBook.pending]: (state,action) => {
            state.isLoading = true
            state.error = null
        },
        [insertBook.fulfilled]: (state,action) => {
            state.isLoading = false
            state.books.push(action.payload);
        },
        [insertBook.rejected]: (state,action) => {
            state.isLoading = false 
            state.error = action.payload 
        },

        //deleteBook
        [deleteBook.pending]: (state,action) => {
            state.isLoading = true
            state.error = null
        },
        [deleteBook.fulfilled]: (state,action) => {
            state.isLoading = false
            state.books=state.books.filter((el)=> el.id !== action.payload.id)
        },
        [deleteBook.rejected]: (state,action) => {
            state.isLoading = false 
            state.error = action.payload 
        },
    },
})

export default bookSlice.reducer;