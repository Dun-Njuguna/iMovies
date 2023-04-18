import { useCallback } from 'react';
import { AsyncThunkAction, unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from '../redux/ configureStore';

export const useUnwrapAsyncThunk = () => {
  const dispatch = useDispatch();
  return useCallback(
    <R extends any>(asyncThunk: AsyncThunkAction<R, any, any>): Promise<R> =>
      dispatch(asyncThunk).then(unwrapResult),
    [dispatch]
  );
};