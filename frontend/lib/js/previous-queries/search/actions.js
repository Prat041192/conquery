import {
  UPDATE_PREVIOUS_QUERIES_SEARCH,
  ADD_TAG_TO_PREVIOUS_QUERIES_SEARCH,
} from './actionTypes';

export const updatePreviousQueriesSearch = (values) => ({
  type: UPDATE_PREVIOUS_QUERIES_SEARCH,
  payload: { values }
});

export const addTagToPreviousQueriesSearch = (tag) => ({
  type: ADD_TAG_TO_PREVIOUS_QUERIES_SEARCH,
  payload: { tag }
});
