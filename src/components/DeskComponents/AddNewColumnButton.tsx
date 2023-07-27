import styles from '../../styles/Desk.module.scss';
import CompoundButton from '../FormComponents/CompoundButton';
import { FaPlus } from 'react-icons/fa';
import CompoundInput from '../FormComponents/CompoundInput';
import { useState, ChangeEvent, useCallback } from 'react';
import ContextConsumer from '../GeneralComponents/ContextConsumer';
import { DeskWSocketContext } from './DeskWSocketProvider';

export default function AddNewColumnButton() {
  const [name, setName] = useState<string>('');

  const setNameHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  return (
    <section className={styles.buttonWrapper}>
      <CompoundButton
        className={styles.addNewColumnButton}
        gap="6"
        padding={{ y: '15', x: '40' }}
        width="220px"
        variant="success"
      >
        <FaPlus size={12} />
        Создать колонку
      </CompoundButton>
      <CompoundInput
        value={name}
        onChange={setNameHandler}
        padding={{ y: '15', x: '40' }}
        variant="light"
        width="140px"
      />
      <ContextConsumer Context={DeskWSocketContext}>
        {value => (
          <CompoundButton
            onClick={() => value?.addNewColumn(name)}
            variant="success"
            padding={{ y: '15', x: '40' }}
            width="220px"
          >
            Создать
          </CompoundButton>
        )}
      </ContextConsumer>
    </section>
  );
}
