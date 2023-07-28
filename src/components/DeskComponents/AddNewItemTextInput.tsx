import FormGroup from '../FormComponents/FormGroup';
import { RxCross1 } from 'react-icons/rx';
import CompoundButton from '../FormComponents/CompoundButton';
import ContextConsumer from '../GeneralComponents/ContextConsumer';
import { DeskWSocketContext } from './DeskWSocketProvider';
import styles from '../../styles/Desk.module.scss';
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
    <FormGroup gap="8px">
      <textarea
        value={name}
        onChange={setNameHandler}
        rows={3}
        className={styles.itemNameInput}
        placeholder="Введите название для карточки"
      ></textarea>
      <div className={styles.inputButtons}>
        <ContextConsumer Context={DeskWSocketContext}>
          {value => (
            <CompoundButton
              onClick={e => {
                value?.addNewItem(e, columnId, name);
                setName('');
              }}
              variant="success"
              padding={{ y: '8' }}
            >
              Добавить
            </CompoundButton>
          )}
        </ContextConsumer>
        <RxCross1 onClick={setActiveColumnNull} className={styles.cancelButton} size={20} />
      </div>
    </FormGroup>
  );
}
