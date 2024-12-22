
import { takeLatest, put } from 'redux-saga/effects';
import { fetchDataSuccess } from './loginSlice';

function* fetchUserData({value}):unknown {
    try {
        yield put(fetchDataSuccess({ id: value[0].username, username: value[0].name }));
    } catch (error) {
        console.log('err', error);
    }
}

export function* updateUserData() {
    yield takeLatest('GET_USERS', fetchUserData);
}