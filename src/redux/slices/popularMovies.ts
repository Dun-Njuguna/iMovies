import { createSlice } from "@reduxjs/toolkit";
import { PopularMovies } from "../../models/movies";

const initialState: {
    popularMovies: PopularMovies[]
  } = {
    popularMovies: []
  };

  const slice = createSlice({
    name: "popularMovies",
    initialState,
    reducers: {},
  });
  
  export default slice.reducer