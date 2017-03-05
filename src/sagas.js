import 'babel-polyfill';
import { call, put, takeEvery } from 'redux-saga/effects';
import { getLocations, getBookings } from './utils/api';

/*
    Worker saga will be fired on FETCH_LOCATIONS action
*/
export function *fetchLocations () {
    try {
        const locations = yield call(getLocations);
        yield put({type: 'FETCH_LOCATIONS_SUCCEEDED', locations});
    } catch (e) {
        yield put({type: 'FETCH_LOCATIONS_FAILED', message: e.message})
    }
}

export function *fetchBookings (action) {
    try {
        const bookings = yield call(getBookings, action.payload.timeID);
        yield put({type: 'FETCH_BOOKINGS_SUCCEEDED', bookings});
    } catch (e) {
        yield put({type: 'FETCH_BOOKINGS_FAILED', message: e.message})
    }
}

/*
    Starts fetchPosts on each dispatched FETCH_LOCATIONS_REQUESTED action
    Allows concurrent fetches of posts
*/
export function *watchFetchLocations () {
    yield takeEvery('FETCH_LOCATIONS_REQUESTED', fetchLocations);
}

export function *watchFetchBookings () {
    yield takeEvery('FETCH_BOOKINGS_REQUESTED', fetchBookings);
}

/*
    Single entry point to start all Sagas at once
*/
export default function *rootSaga () {
    yield [
        watchFetchLocations(),
        watchFetchBookings()
    ]
}
