import styles from '../../../styles/Desk.module.scss';
import CompoundButton from '../../FormComponents/CompoundButton';
import { FaPlus } from 'react-icons/fa';
import CompoundInput from '../../FormComponents/CompoundInput';
import { useState, ChangeEvent, useCallback, useRef, useEffect, MouseEvent, memo } from 'react';
import ContextConsumer from '../../GeneralComponents/ContextConsumer';
import { DeskWSocketContext } from '../GeneralDeskComponents/DeskWSocketProvider';

export default memo(function AddNewColumnButton() {
  const [name, setName] = useState<string>('');
  const [active, setActive] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement>(null);

  const setNameHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const setActiveFalse = useCallback(() => {
    setActive(false);
  }, []);

  useEffect(() => {
    if (active) {
      document.body.addEventListener('click', setActiveFalse);
      ref.current?.focus();
    } else {
      document.body.removeEventListener('click', setActiveFalse);
    }
  }, [active, setActiveFalse]);

  const setActiveHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setActive(prev => !prev);
  };

  return (
    <section className={styles.buttonWrapper}>
      {!active ? (
        <CompoundButton
          onClick={setActiveHandler}
          className={styles.addNewColumnButton}
          gap="6"
          padding={{ y: '15', x: '40' }}
          width="300px"
          variant="success"
        >
          <FaPlus size={12} />
          Создать колонку
        </CompoundButton>
      ) : (
        <ContextConsumer Context={DeskWSocketContext}>
          {value => (
            <div className={styles.addNewColumnContainer} onClick={e => e.stopPropagation()}>
              <CompoundInput
                ref={ref}
                focus={true}
                value={name}
                placeholder="Название колонны"
                onChange={setNameHandler}
                padding={{ y: '15', x: '10' }}
                variant="light"
                width="280px"
                noBrBottom={true}
                onKeyDown={e => {
                  if (e.key == 'Enter') {
                    if (e.repeat) return;
                    value?.emitEvent('addNewColumn')(name);
                    setName('');
                  }
                }}
              />
              <CompoundButton
                className={styles.addNewColumnButton}
                noBrTop={true}
                onClick={() => {
                  value?.emitEvent('addNewColumn')(name);
                  setName('');
                }}
                variant="success"
                padding={{ y: '10', x: '40' }}
                width="300px"
              >
                Создать
              </CompoundButton>
            </div>
          )}
        </ContextConsumer>
      )}
    </section>
  );
});
