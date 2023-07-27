import styles from '../../styles/Desk.module.scss';
import CompoundButton from '../FormComponents/CompoundButton';
import { useState, useCallback, lazy, Suspense } from 'react';
import { activeType } from '@/utils/deskAsideButtons';
import useDeskAsideButtons from '@/utils/deskAsideButtons';
import DeskArchive from './DeskArchive';

const DeskHistoryComponent = lazy(() => import('./DeskHistory'));
const LeftSectionItemSettingsComponent = lazy(
  () => import('../WspaceComponents/LeftSectionComponents/LeftSectionItemSettings'),
);

interface LeftAsideSettingsIProps {
  wspaceId: number;
  wspaceRoleId: number;
}

export default function LeftAsideSettings({ wspaceRoleId, wspaceId }: LeftAsideSettingsIProps) {
  const [activeType, setActiveType] = useState<activeType>('settings');

  const deskAsideButtons = useDeskAsideButtons();

  const setActiveHandler = useCallback((type: activeType) => {
    setActiveType(type);
  }, []);

  return (
    <div className={styles.asideSettings}>
      <div className={styles.asideSettings__btns}>
        {deskAsideButtons.map(button => (
          <CompoundButton
            key={button.title}
            title={button.title}
            onClick={() => setActiveHandler(button.type)}
            variant="light"
            disabled={activeType === button.type ? true : false}
            padding={{ y: '5' }}
          >
            {button.icon}
          </CompoundButton>
        ))}
      </div>
      <Suspense fallback={<div>Загрузка...</div>}>
        {activeType === 'history' ? (
          <DeskHistoryComponent />
        ) : activeType === 'settings' ? (
          <LeftSectionItemSettingsComponent margin="25px 0 0" wspaceRoleId={wspaceRoleId} wspaceId={wspaceId} />
        ) : (
          <DeskArchive />
        )}
      </Suspense>
    </div>
  );
}
