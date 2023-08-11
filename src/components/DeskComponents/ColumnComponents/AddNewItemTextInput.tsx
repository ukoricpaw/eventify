import FormGroup from '../../FormComponents/FormGroup';
import { RxCross1 } from 'react-icons/rx';
import CompoundButton from '../../FormComponents/CompoundButton';
import ContextConsumer from '../../GeneralComponents/ContextConsumer';
import { DeskWSocketContext } from '../GeneralDeskComponents/DeskWSocketProvider';
import styles from '../../../styles/Desk.module.scss';
import { useState, ChangeEvent, MouseEvent, KeyboardEvent, useEffect, useRef } from 'react';
import { DeskWSocketContextInterface } from '@/types/deskTypes';

interface AddNewItemTextInputIProps {
  setActiveColumnNull: () => void;
  columnId: number;
}

export default function AddNewItemTextInput({ columnId, setActiveColumnNull }: AddNewItemTextInputIProps) {
  const [name, setName] = useState<string>('');
  const inputItemNameRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputItemNameRef.current?.focus();
  }, []);

  const setNameHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setName(e.target.value);
  };

  const submitHandler = (
    e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLTextAreaElement>,
    value: DeskWSocketContextInterface | null,
  ) => {
    value?.emitEvent('addNewItem')(e, columnId, name);
    setName('');
  };

  return (
    <ContextConsumer Context={DeskWSocketContext}>
      {value => (
        <FormGroup gap="8px">
          <textarea
            ref={inputItemNameRef}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                if (e.repeat) return;
                submitHandler(e, value);
              }
            }}
            value={name}
            onChange={setNameHandler}
            rows={3}
            className={styles.itemNameInput}
            placeholder="Введите название для карточки"
          ></textarea>
          <div className={styles.inputButtons}>
            <CompoundButton
              onClick={e => {
                submitHandler(e, value);
              }}
              variant="success"
              padding={{ y: '8' }}
            >
              Добавить
            </CompoundButton>
            <RxCross1 onClick={setActiveColumnNull} className={styles.cancelButton} size={20} />
          </div>
        </FormGroup>
      )}
    </ContextConsumer>
  );
}
