import createSagaMiddleware from '@redux-saga/core';
import { configureStore } from '@reduxjs/toolkit';
import { all } from 'redux-saga/effects';
import loginReducer from '../redux/loging/loginSlice';
import { updateUserData } from '../redux/loging/loginSaga';
import { previewSaga } from '../redux/preview/previewSaga';
import previewReducer from '../redux/preview/previewSlice';

// create root saga
function* rootSaga() {
  yield all([updateUserData(), previewSaga()]);
}

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// Configure the store
const store = configureStore({
  reducer: {
    userData: loginReducer,
    previewData: previewReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware), // Correctly set up middleware
});

// Run the root saga
sagaMiddleware.run(rootSaga);

// Export the store
export default store;
