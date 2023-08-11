import styles from '../../styles/Desk.module.scss';
import { useAppSelector } from '@/hooks/reduxHooks';
import { getDeskInfo } from '@/store/selectors/deskSelectors';
import DeskInputField from './ModalFieldsComponents/DeskInputField';
import { FaEdit } from 'react-icons/fa';
import ContextConsumer from '../GeneralComponents/ContextConsumer';
import { DeskColumnModalContext } from './ModalFieldsComponents/DeskColumnModalProvider';
import { EnumModal } from '@/types/modalDeskTypes';
import WspaceProvideLink from '../WspaceComponents/GeneralWspaceComponents/WspaceProvideLink';
import { CgInfo } from 'react-icons/cg';
import { selectSingleWorkingSpaceResult } from '@/store/api/wspaceApi';
import { SingleWorkingSpaceType } from '@/types/wspaceTypes';

export default function DeskInfo({ roleId }: { roleId: number }) {
  const deskInfo = useAppSelector(getDeskInfo);
  const wspaceInfo = useAppSelector(
    state => selectSingleWorkingSpaceResult(state, deskInfo.workingSpaceId) as SingleWorkingSpaceType,
  );
  return (
    <section className={styles.deskInfo}>
      <div className={styles.deskInfo__wrapper}>
        <div className={styles.deskInfo__ownInfo}>
          <div className={styles.deskInfo__nameInfo}>
            <ContextConsumer Context={DeskColumnModalContext}>
              {value => {
                return roleId !== 0 && roleId <= 2 ? (
                  <FaEdit
                    size={20}
                    onClick={() => value?.setActiveModalHandler({ type: EnumModal.DESK, content: null })}
                    cursor={'pointer'}
                  />
                ) : (
                  <CgInfo
                    size={25}
                    onClick={() => value?.setActiveModalHandler({ type: EnumModal.DESK, content: null })}
                    cursor={'pointer'}
                  />
                );
              }}
            </ContextConsumer>
            <DeskInputField name={deskInfo.name} inputId={deskInfo.id} roleId={roleId} />
          </div>
          <WspaceProvideLink roleId={roleId} inviteLink={wspaceInfo.workingSpace.inviteLink} />
        </div>
        {deskInfo.description && <p className={styles.deskInfo__description}>{deskInfo.description}</p>}
      </div>
    </section>
  );
}
