import FormGroup from '../../FormComponents/FormGroup';
import { RxCross1 } from 'react-icons/rx';
import CompoundButton from '../../FormComponents/CompoundButton';
import ContextConsumer from '../../GeneralComponents/ContextConsumer';
import { DeskWSocketContext } from '../GeneralDeskComponents/DeskWSocketProvider';
import styles from '../../../styles/Desk.module.scss';
import { useState, ChangeEvent } from 'react';

interface AddNewItemTextInputIProps {
  setActiveColumnNull: () => void;
  columnId: number;
}

export default function AddNewItemTextInput({ columnId, setActiveColumnNull }: AddNewItemTextInputIProps) {
  const [name, setName] = useState<string>('');

  const setNameHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setName(e.target.value);
  };

  return (
    <ContextConsumer Context={DeskWSocketContext}>
      {value => (
        <FormGroup gap="8px">
          <textarea
            onKeyDown={e => {
              if (e.key === 'Enter') {
                if (e.repeat) return;
                value?.emitEvent('addNewItem')(e, columnId, name);
                setName('');
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
                value?.emitEvent('addNewItem')(e, columnId, name);
                setName('');
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
