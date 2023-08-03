import styles from '../../styles/Desk.module.scss';
import { useAppSelector } from '@/hooks/reduxHooks';
import { getDeskInfo } from '@/store/selectors/deskSelectors';
import DeskInputField from './DeskInputField';
import { FaEdit } from 'react-icons/fa';
import ContextConsumer from '../GeneralComponents/ContextConsumer';
import { DeskColumnModalContext } from './GeneralDeskComponents/DeskColumnModalProvider';
import { EnumModal } from '@/types/modalDeskTypes';

export default function DeskInfo({ roleId }: { roleId: number }) {
  const deskInfo = useAppSelector(getDeskInfo);

  return (
    <section className={styles.deskInfo}>
      <div className={styles.deskInfo__wrapper}>
        <div className={styles.deskInfo__nameInfo}>
          {roleId !== 0 && roleId <= 2 && (
            <ContextConsumer Context={DeskColumnModalContext}>
              {value => (
                <FaEdit
                  size={20}
                  onClick={() => value?.setActiveModalHandler({ type: EnumModal.DESK, content: null })}
                  cursor={'pointer'}
                />
              )}
            </ContextConsumer>
          )}
          <DeskInputField name={deskInfo.name} inputId={deskInfo.id} roleId={roleId} />
        </div>
        {deskInfo.description && <p className={styles.deskInfo__description}>{deskInfo.description}</p>}
      </div>
    </section>
  );
}
