
import { ITable } from '@/interface/tables';
import { createSlice } from '@reduxjs/toolkit'

interface InitialState {
  tables: ITable[];
  table: ITable | {};
  isLoading : boolean;
  page: number;
}

const initialState: InitialState = {
  tables: [],
  table: {},
  isLoading: false,
  page: 0
}

export const tablesSlice = createSlice({
  name: 'tables',
  initialState,
  reducers: {
    startLoadingTables: (state) => {
      state.isLoading = true;
    },
    setTables: (state, action) => {
      state.isLoading = false;
      state.page = action.payload.page;
      state.tables = action.payload.tables;
    },
    setTable: (state, action) => {      
      state.table = action.payload;      
    }
  },
})
export const { startLoadingTables, setTables, setTable } = tablesSlice.actions