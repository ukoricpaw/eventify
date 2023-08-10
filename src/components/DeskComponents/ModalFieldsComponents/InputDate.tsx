import { useState, ChangeEvent, useContext, useRef } from 'react';
import getDate from '@/utils/getDate';
import styles from '../../../styles/Modal.module.scss';
import CompoundButton from '@/components/FormComponents/CompoundButton';
import { FaClock } from 'react-icons/fa';
import { DeadlineType } from '@/utils/getVariantsOfDeadline';
import { deadlineActionHandler } from '@/utils/getVariantsOfDeadline';
import useFormFields from '@/hooks/useFormFields';
import { DeskWSocketContext } from '../GeneralDeskComponents/DeskWSocketProvider';
import changeFullDateByInput from '@/utils/changeFullDateByInput';
import getDateAndTimeForDisplay from '@/utils/getDateAndTimeForDisplay';
import VariantsOfDeadline from './VariantsOfDeadline';

interface InputDateIProps {
  dateVal?: string;
  listId: number;
  itemId: number;
  roleCondition: boolean;
}

interface ChangeOrAddDeadlineButtonIProps {
  title: string;
  fullDate: string;
  emitEvent: () => void;
  memoizedDate: string;
  action: 'delete' | 'change';
}

interface OpenWindowToChangeDeadlineIProps {
  title: string;
  setIsOpenHandler: () => void;
}

export default function InputDate({ dateVal, listId, itemId, roleCondition }: InputDateIProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { state, setState } = useFormFields({
    fullDate: dateVal ? new Date(dateVal) : new Date(),
  });
  const [time, date, deadlineDate] = getDateAndTimeForDisplay(state.fullDate);
  const memoizedDate = useRef<string>(deadlineDate as string);
  const WSocketEmitEvent = useContext(DeskWSocketContext);
  const setDateByVariant = (type: DeadlineType, value: number) => {
    const ownDate = deadlineActionHandler(type)(value);
    const date = getDate(ownDate.toISOString(), 'dateTime', true);
    setState(prev => ({ ...prev, date: date[0], time: date[1], fullDate: ownDate }));
  };

  const setIsOpenHandler = () => {
    setIsOpen(true);
  };

  const emitEventToChangeDeadline = () => {
    WSocketEmitEvent?.emitEvent('changeItemDeadline')(listId, itemId, (state.fullDate as Date).toISOString());
    memoizedDate.current = deadlineDate as string;
  };
  const emitEventToChangeDeadlineToNull = () => {
    WSocketEmitEvent?.emitEvent('changeItemDeadline')(listId, itemId, null);
  };

  const changeFullDate = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.includes(':')) {
      changeFullDateByInput(state.fullDate, setState, 'time', e.target.value);
    } else {
      changeFullDateByInput(state.fullDate, setState, 'date', e.target.value);
    }
  };
  return (
    <section className={styles.modalSectionDate}>
      <h2 className={styles.deskModalTitles}>Срок:</h2>
      {roleCondition ? (
        dateVal || isOpen ? (
          isOpen ? (
            <>
              <VariantsOfDeadline setDateByVariant={setDateByVariant} />
              <input
                value={date ?? ''}
                className={styles.modalChangeDateInput}
                min="2000-01-01"
                max="2100-01-01"
                type="date"
                onChange={changeFullDate}
              />
              <input value={time ?? ''} className={styles.modalChangeDateInput} type="time" onChange={changeFullDate} />
              <DeadlineInLocale deadlineDate={deadlineDate as string} />
              <ChangeOrAddDeadlineButton
                action="change"
                memoizedDate={memoizedDate.current}
                fullDate={deadlineDate as string}
                title={'Задать'}
                emitEvent={emitEventToChangeDeadline}
              />
            </>
          ) : (
            <>
              <DeadlineInLocale deadlineDate={deadlineDate as string} />
              <OpenWindowToChangeDeadline title={'Изменить срок'} setIsOpenHandler={setIsOpenHandler} />
              <ChangeOrAddDeadlineButton
                action="delete"
                memoizedDate={memoizedDate.current}
                fullDate={deadlineDate as string}
                title={'Сбросить срок'}
                emitEvent={emitEventToChangeDeadlineToNull}
              />
            </>
          )
        ) : (
          <OpenWindowToChangeDeadline title={'Добавить срок'} setIsOpenHandler={setIsOpenHandler} />
        )
      ) : (
        <DeadlineInLocale deadlineDate={dateVal ? (deadlineDate as string) : 'Срок выполнения не указан'} />
      )}
    </section>
  );
}

function OpenWindowToChangeDeadline({ setIsOpenHandler, title }: OpenWindowToChangeDeadlineIProps) {
  return (
    <CompoundButton padding={{ y: '10' }} onClick={setIsOpenHandler} variant="success">
      {title}
      <FaClock />
    </CompoundButton>
  );
}

function ChangeOrAddDeadlineButton({
  fullDate,
  memoizedDate,
  emitEvent,
  title,
  action,
}: ChangeOrAddDeadlineButtonIProps) {
  return (
    <CompoundButton
      disabled={fullDate ? (fullDate !== memoizedDate ? false : action !== 'change' ? false : true) : true}
      onClick={emitEvent}
      variant="light"
    >
      {title}
    </CompoundButton>
  );
}

function DeadlineInLocale({ deadlineDate }: { deadlineDate: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <FaClock size={18} />
      <time className={styles.deadlineDate}>{deadlineDate}</time>
    </div>
  );
}
