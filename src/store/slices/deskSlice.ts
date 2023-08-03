import { SingleDesk, SingleDeskState } from '@/types/deskListTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getSingleDesk } from '../thunks/fetchSingleDeskThunks';

const initialState: SingleDeskState = {
  status: {
    isLoading: true,
    isError: null,
  },
  data: {} as SingleDesk,
};

const deskSlice = createSlice({
  name: 'deskSlice',
  initialState,
  reducers: {
    renameDesk(state, action: PayloadAction<string>) {
      state.data.name = action.payload;
    },
    changeDescription(state, action: PayloadAction<string>) {
      state.data.description = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getSingleDesk.pending, state => {
      state.status.isError = null;
      state.status.isLoading = true;
      state.data = {} as SingleDesk;
    });
    builder.addCase(getSingleDesk.fulfilled, (state, action) => {
      state.data = action.payload.deskLists;
      state.status.isLoading = false;
    });
    builder.addCase(getSingleDesk.rejected, (state, action) => {
      state.status.isError = action.error.message as string;
      state.status.isLoading = false;
    });
  },
});

export default deskSlice.reducer;
export const { renameDesk, changeDescription } = deskSlice.actions;
