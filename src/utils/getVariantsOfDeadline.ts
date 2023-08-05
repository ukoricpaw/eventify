type VariantOfDeadline = {
  type: DeadlineType;
  value: number;
};
export type DeadlineType = 'hour' | 'minute' | 'month' | 'year' | 'date';
type DeadlineAction = (deadlineType: DeadlineType) => (deadlineTime: number) => Date;
type DateGetCallbacks = 'getMinutes' | 'getHours' | 'getMonth' | 'getFullYear' | 'getDate';
type DateSetCallbacks = 'setMinutes' | 'setHours' | 'setMonth' | 'setFullYear' | 'setDate';

export const deadlineActionHandler: DeadlineAction = (deadlineType: DeadlineType) => {
  let firstDateCallback: DateGetCallbacks | null = null;
  let secondDateCallback: DateSetCallbacks | null = null;
  switch (deadlineType) {
    case 'minute':
      firstDateCallback = 'getMinutes';
      secondDateCallback = 'setMinutes';
      break;
    case 'hour':
      firstDateCallback = 'getHours';
      secondDateCallback = 'setHours';
      break;
    case 'month':
      firstDateCallback = 'getMonth';
      secondDateCallback = 'setMonth';
      break;
    case 'year':
      firstDateCallback = 'getFullYear';
      secondDateCallback = 'setFullYear';
      break;
    case 'date':
      firstDateCallback = 'getDate';
      secondDateCallback = 'setDate';
      break;
  }
  return (deadlineTime: number) => {
    const date = new Date();
    if (!firstDateCallback || !secondDateCallback) return date;
    const time = date[firstDateCallback]();
    date[secondDateCallback](time + deadlineTime);
    return date;
  };
};

export const variantsOfDeadline: VariantOfDeadline[] = [
  {
    type: 'hour',
    value: 1,
  },
  {
    type: 'hour',
    value: 2,
  },
  {
    type: 'month',
    value: 1,
  },
  {
    type: 'month',
    value: 2,
  },
  {
    type: 'minute',
    value: 30,
  },
  {
    type: 'date',
    value: 1,
  },
  {
    type: 'date',
    value: 7,
  },
];
