import styles from '../../../styles/Desk.module.scss';
import { FaInfo } from 'react-icons/fa';
import { Suspense, lazy } from 'react';
import ContextConsumer from '../../GeneralComponents/ContextConsumer';
import { ColumnInfoContext } from '../GeneralDeskComponents/ColumnInfoProvider';
import { RxCross1 } from 'react-icons/rx';
import { DeskColumnModalContext } from '../GeneralDeskComponents/DeskColumnModalProvider';
import { EnumModal } from '@/types/modalDeskTypes';

const MoreInfoPrivateListLazy = lazy(() => import('./MoreInfoPrivateList'));

export default function MoreInfoWrapper({ setActiveColumnNull }: { setActiveColumnNull: () => void }) {
  return (
    <ContextConsumer Context={ColumnInfoContext}>
      {value => {
        return (
          <div className={styles.moreInfoWrapper} onClick={e => e.stopPropagation()}>
            <div className={styles.moreInfoWrapper__header}>
              <h3 className={styles.moreInfoWrapper__title}>Действия с колонной</h3>
              <RxCross1 className={styles.moreInfoWrapper__close} size={20} onClick={setActiveColumnNull} />
            </div>
            <ul className={styles.moreInfoList}>
              <ContextConsumer Context={DeskColumnModalContext}>
                {columnModalValue => (
                  <li
                    className={styles.moreInfoList__item}
                    onClick={() => {
                      setActiveColumnNull();
                      columnModalValue?.setActiveModalHandler({
                        type: EnumModal.COLUMN,
                        content: value?.listId ?? 0,
                      });
                    }}
                  >
                    <FaInfo size={12} /> Информация о колонне...
                  </li>
                )}
              </ContextConsumer>
              {value && value.roleId !== 0 && value.roleId <= 2 && (
                <Suspense fallback={<></>}>
                  <MoreInfoPrivateListLazy name={value.name} listId={value.listId} />
                </Suspense>
              )}
            </ul>
          </div>
        );
      }}
    </ContextConsumer>
  );
}
