import { all, put, takeLatest, fork } from 'redux-saga/effects';
import { GETEXCELDATA_SUC, GETEXCELDATA } from 'modules/excel';

export function* excelDataWatch() {
  yield takeLatest(GETEXCELDATA, excelData)
}
export function* excelData(req) {
  yield put({ type: GETEXCELDATA_SUC, payload: req.payload })
}

export function* rootSaga() {
  yield all([
    fork(excelDataWatch),
  ])
}