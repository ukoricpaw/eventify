import styles from '../../styles/Desk.module.scss';
import CompoundButton from '../FormComponents/CompoundButton';
import { useState, useCallback, lazy, Suspense } from 'react';

const DeskHistoryComponent = lazy(() => import('./DeskHistory'));

export default function LeftAsideSettings() {
  const [activeType, setActiveType] = useState<'history' | 'archive'>('history');

  const setActiveHandler = useCallback(() => {
    setActiveType(prev => (prev === 'archive' ? 'history' : 'archive'));
  }, []);

  return (
    <div className={styles.asideSettings}>
      <div className={styles.asideSettings__btns}>
        <CompoundButton
          onClick={setActiveHandler}
          variant="light"
          disabled={activeType === 'history' ? true : false}
          padding={{ y: '5' }}
        >
          История
        </CompoundButton>
        <CompoundButton
          onClick={setActiveHandler}
          variant="light"
          disabled={activeType === 'archive' ? true : false}
          padding={{ y: '5' }}
        >
          Архив
        </CompoundButton>
      </div>
      <Suspense fallback={<div>Загрузка...</div>}>
        {activeType === 'history' ? <DeskHistoryComponent /> : <></>}
      </Suspense>
    </div>
  );
}
