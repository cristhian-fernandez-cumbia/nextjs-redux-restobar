import { setTable, setTables, startLoadingTables } from "."
import apiTables from '@/app/api/apiTables.json'

export const getAllTables = (page = 0) => {
  return async (dispatch:any) => {
    dispatch(startLoadingTables())
    try {
      const response = apiTables;
      const data = {
        page: page + 1,
        tables: response.data.tables
      }
      window.localStorage.setItem('tables', JSON.stringify(response.data.tables));
      dispatch(setTables(data))
    } catch (error) {
      console.log(error);
    }
  }
}
export const getTable = (tableId: string) => {
  return async (dispatch:any) => {
    try {
      const response = apiTables;
      const table =  response.data.tables.find(table => String(table.idTable) === tableId) || {};
      window.localStorage.setItem('table', JSON.stringify(table));
      dispatch(setTable(table))
    } catch (error) {
      console.log(error);
    }
  }
}