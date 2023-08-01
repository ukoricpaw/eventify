import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';

export const deskSelector = (state: RootState) => state.deskReducer.data;
export const statusSelector = (state: RootState) => state.deskReducer.status;
export const deskDataSelector = (state: RootState) => state.deskReducer.lists;

export const getDeskInfo = createSelector(deskSelector, res => res);

export const deskDataSelectorResult = createSelector(deskDataSelector, res => res);

export const layoutSelector = createSelector([deskSelector, statusSelector], (desk, status) => ({
  name: desk.name,
  background: desk.background,
  isLoading: status.isLoading,
  isError: status.isError,
}));

const getArchiveDataSelector = (state: RootState) => state.deskReducer.archived;

export const archiveStatusSelector = createSelector(getArchiveDataSelector, res => ({
  isLoading: res.isLoading,
  isError: res.isError,
  isFulfilled: res.isFulfilled,
  deskId: res.deskId,
}));

export const archiveDataSelector = createSelector(getArchiveDataSelector, res => ({
  lists: res.archivedList,
}));
