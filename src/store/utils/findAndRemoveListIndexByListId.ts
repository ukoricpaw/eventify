export const findAndRemoveListIndexByListId = (listIndexes: number[], id: number) => {
  let indexInListIndexesArray = null;
  listIndexes.find((listIndex, index) => {
    if (listIndex == id) {
      indexInListIndexesArray = index;
      return true;
    }
  });
  if (indexInListIndexesArray === null) return;
  listIndexes.splice(indexInListIndexesArray, 1);
};
