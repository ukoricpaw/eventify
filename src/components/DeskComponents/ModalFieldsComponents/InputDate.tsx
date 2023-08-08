import { useState, useMemo, useEffect } from 'react';
import getDate from '@/utils/getDate';
import styles from '../../../styles/Desk.module.scss';
import CompoundButton from '@/components/FormComponents/CompoundButton';
import { FaClock } from 'react-icons/fa';
import { DeadlineType, variantsOfDeadline } from '@/utils/getVariantsOfDeadline';
import { deadlineActionHandler } from '@/utils/getVariantsOfDeadline';
import useFormFields from '@/hooks/useFormFields';
import ContextConsumer from '@/components/GeneralComponents/ContextConsumer';
import { DeskWSocketContext } from '../GeneralDeskComponents/DeskWSocketProvider';
import getLocaleDateString from '@/utils/getLocaleDateString';

interface InputDateIProps {
  dateVal?: string;
  listId: number;
  itemId: number;
}

export default function InputDate({ dateVal, listId, itemId }: InputDateIProps) {
  const { state, onChange, setState } = useFormFields({
    time: dateVal ? (getDate(dateVal, 'onlyTime') as string) : '',
    date: dateVal ? (getDate(dateVal, 'onlyDate', true) as string) : '',
    fullDate: dateVal ? new Date(dateVal) : '',
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (state.fullDate) {
      if (!state.date) return;
      const date = (state.date as string).split('-');
      const newDate = state.fullDate as Date;
      alert(date[0]);
      newDate.setFullYear(Number(date[0]));
      setState(prev => ({ ...prev, fullDate: newDate }));
    }
  }, [state.date, state.time, state.fullDate, setState]);

  const setDateByVariant = (type: DeadlineType, value: number) => {
    const ownDate = deadlineActionHandler(type)(value);
    const date = getDate(ownDate.toISOString(), 'dateTime', true);
    setState(prev => ({ ...prev, date: date[0], time: date[1], fullDate: ownDate }));
  };

  const setIsOpenHandler = () => {
    setIsOpen(true);
  };

  const deadlineDate = useMemo(() => getLocaleDateString(state.fullDate as string), [state]);

  return (
    <section className={styles.modalSectionDate}>
      <h2 className={styles.deskModalTitles}>Срок:</h2>
      {dateVal || isOpen ? (
        <>
          <ul className={styles.variantsDeadlineList}>
            {variantsOfDeadline.map((item, index) => (
              <li
                className={styles.variantsDeadlineItem}
                onClick={() => setDateByVariant(item.type, item.value)}
                key={index}
              >
                {item.value} {item.inLocale}
              </li>
            ))}
          </ul>
          <input
            value={state.date ?? ''}
            className={styles.modalChangeDateInput}
            min="2000-01-01"
            type="date"
            onChange={onChange('date')}
          />
          <input
            value={state.time ?? ''}
            className={styles.modalChangeDateInput}
            type="time"
            onChange={onChange('time')}
          />
          <p className={styles.deadlineDate}>{deadlineDate}</p>
          <ContextConsumer Context={DeskWSocketContext}>
            {value => (
              <CompoundButton
                disabled={state.fullDate ? false : true}
                onClick={() =>
                  value?.emitEvent('changeItemDeadline')(listId, itemId, (state.fullDate as Date).toISOString())
                }
                variant="light"
              >
                Задать
              </CompoundButton>
            )}
          </ContextConsumer>
        </>
      ) : (
        <CompoundButton padding={{ y: '10' }} onClick={setIsOpenHandler} variant="success">
          Добавить срок
          <FaClock />
        </CompoundButton>
      )}
    </section>
  );
}
