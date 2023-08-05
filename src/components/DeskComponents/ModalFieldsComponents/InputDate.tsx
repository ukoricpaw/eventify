import { useState } from 'react';
import getDate from '@/utils/getDate';
import styles from '../../../styles/Desk.module.scss';
import CompoundButton from '@/components/FormComponents/CompoundButton';
import { FaClock } from 'react-icons/fa';
import { DeadlineType, variantsOfDeadline } from '@/utils/getVariantsOfDeadline';
import { deadlineActionHandler } from '@/utils/getVariantsOfDeadline';
import useFormFields from '@/hooks/useFormFields';
import ContextConsumer from '@/components/GeneralComponents/ContextConsumer';
import { DeskWSocketContext } from '../GeneralDeskComponents/DeskWSocketProvider';

interface InputDateIProps {
  dateVal?: string;
  listId: number;
  itemId: number;
}

export default function InputDate({ dateVal, listId, itemId }: InputDateIProps) {
  const { state, onChange, setState } = useFormFields({
    time: dateVal ? getDate(dateVal, 'onlyTime') : '',
    date: dateVal ? getDate(dateVal, 'onlyDate', true) : '',
    fullDate: dateVal ?? '',
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const setDateByVariant = (type: DeadlineType, value: number) => {
    const ownDate = deadlineActionHandler(type)(value).toISOString();
    const date = getDate(ownDate, 'dateTime', true);
    setState(prev => ({ ...prev, date: date[0], time: date[1], fullDate: ownDate }));
  };

  const setIsOpenHandler = () => {
    setIsOpen(true);
  };

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
                {item.type + item.value}
              </li>
            ))}
          </ul>
          <input value={state.date ?? ''} min="2023-01-01" type="date" onChange={onChange('date')} />
          <input value={state.time ?? ''} type="time" onChange={onChange('time')} />
          <p>
            {state.date} - {state.time}
          </p>
          <ContextConsumer Context={DeskWSocketContext}>
            {value => (
              <CompoundButton
                onClick={() => value?.emitEvent('changeItemDeadline')(listId, itemId, state.fullDate)}
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
