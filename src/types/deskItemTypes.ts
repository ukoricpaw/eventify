export type Reorder = {
  type: 'columns' | 'items';
  draggableId: number;
  source: sourceDest;
  destination: sourceDest | null;
};

export type sourceDest = {
  id: number;
  index: number;
};
