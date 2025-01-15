import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';
import {
  fetchWorkSpaceListSuccess,
  fetchDashboardListSuccess,
  fetchPowerBiCredentialSuccess,
} from './previewSlice';
import { workSpaceListURL, dashboardListURL, powerBiCredentialURL } from '../endPoint';
import { callAPI } from '../../utils';

function* fetchWorkSpaceList() {
  const result = yield callAPI(workSpaceListURL, 'GET')
  yield put(fetchWorkSpaceListSuccess(result));
}

function* fetchDashboardList(props) {
  const { ID } = props;
  const response = yield axios.get(`${dashboardListURL + ID}`);
  const result = yield response.data;
  yield put(fetchDashboardListSuccess(result));
}
function* fetchPowerBiCredentials(props) {
  const { workspaceID, dashboardID } = props;
  const response = yield axios.get(`${powerBiCredentialURL + workspaceID + '/' + dashboardID}`);
  const result = yield response.data;
  yield put(fetchPowerBiCredentialSuccess(result));
}

export function* previewSaga() {
  yield takeLatest('GET_WORKSPACE_IDS', fetchWorkSpaceList);
  yield takeLatest('GET_DASHBOARD_LIST', fetchDashboardList);
  yield takeLatest('GET_POWER_BI_CREDENTIALS', fetchPowerBiCredentials);
}
