import { all, put, takeLatest, fork } from 'redux-saga/effects';
import { GETEXCELDATA } from 'modules/excel';

export function* excelDataWatch() {
  yield takeLatest(GETEXCELDATA, excelData)
}
export function* excelData(req) {
  const data = req.payload
  yield put({ type: GETEXCELDATA, payload: data })
}

export function* rootSaga() {
  yield all([
    fork(excelDataWatch),
  ])
}