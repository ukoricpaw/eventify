const unitMinutePlural = new Intl.NumberFormat('ru-RU', {
  style: 'unit',
  unit: 'minute',
  unitDisplay: 'long',
});

const unitHourPlural = new Intl.NumberFormat('ru-RU', {
  style: 'unit',
  unit: 'hour',
  unitDisplay: 'long',
});

const unitDayPlural = new Intl.NumberFormat('ru-RU', {
  style: 'unit',
  unit: 'day',
  unitDisplay: 'long',
});

const unitMonthPlural = new Intl.NumberFormat('ru-RU', {
  style: 'unit',
  unit: 'month',
  unitDisplay: 'long',
});

type VariantOfDeadline = {
  type: DeadlineType;
  value: string;
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
    type: 'minute',
    value: unitMinutePlural.format(30),
  },
  {
    type: 'hour',
    value: unitHourPlural.format(1),
  },
  {
    type: 'hour',
    value: unitHourPlural.format(2),
  },
  {
    type: 'date',
    value: unitDayPlural.format(1),
  },
  {
    type: 'date',
    value: unitDayPlural.format(7),
  },
  {
    type: 'month',
    value: unitMonthPlural.format(1),
  },
  {
    type: 'month',
    value: unitMonthPlural.format(2),
  },
];
