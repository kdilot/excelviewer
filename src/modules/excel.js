import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import data from 'asset/data.json';

export const SETFLAG = 'excel/SETFLAG'
export const GETEXCELDATA = 'excel/GETEXCELDATA'
export const SETCHANGE = 'excel/SETCHANGE'
export const SETTABLECHANGE = 'excel/SETTABLECHANGE'
export const GETEXCELDATA_SUC = 'excel/GETEXCELDATA_SUC'

export const setFlag = createAction(SETFLAG)
export const setChange = createAction(SETCHANGE)
export const setTableChange = createAction(SETTABLECHANGE)
export const getExcelData = createAction(GETEXCELDATA)

const initialState = {
  data: data,
  flag: false
}

export default handleActions({
  [SETFLAG]: (state, action) =>
    produce(state, draft => {
      draft.flag = true
    }),
  [GETEXCELDATA_SUC]: (state, action) =>
    produce(state, draft => {
      draft.data = action.payload
      draft.flag = false
    }),
  [SETCHANGE]: (state, action) =>
    produce(state, draft => {
      const {
        name,
        namespace,
        new_value
      } = action.payload
      const target = draft.data[namespace[0]][namespace[1]][namespace[2]]
      draft.flag = true
      target[name] = new_value
      draft.flag = false
    }),
  [SETTABLECHANGE]: (state, action) =>
    produce(state, draft => {
      const {
        data,
        sheet
      } = action.payload
      const payload = data[0]
      draft.flag = true
      draft.data.find(f => f['name'] === sheet)['data'][payload[0]][payload[1]] = payload[3]
      draft.flag = false
    }),
}, initialState)