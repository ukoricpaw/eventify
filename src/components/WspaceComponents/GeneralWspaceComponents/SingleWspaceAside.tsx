import { SingleWorkingSpaceType } from '@/types/wspaceTypes';
import styles from '../../../styles/WorkingSpace.module.scss';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { useState, ReactElement } from 'react';
import { CgLock, CgLockUnlock } from 'react-icons/cg';
interface SingleWspaceSideIProps {
  data?: SingleWorkingSpaceType;
  noBorder?: boolean;
  children: ReactElement;
}

export default function SingleWspaceAside({ data, children, noBorder }: SingleWspaceSideIProps) {
  const [isHide, setHide] = useState<boolean>(false);
  const hideHandler = () => {
    setHide(prev => !prev);
  };

  return (
    <aside className={styles.singleAside}>
      <div className={`${styles.singleContentAside} ${isHide ? styles.singleContentAsideHided : ''}`}>
        <div className={styles.singleAside__titleContainer}>
          <h2 className={styles.singleAside__title}>{data?.workingSpace.name}</h2>
          <p className={styles.singleAside__isPrivate}>
            {data?.workingSpace.private ? (
              <CgLock size={25} color="red" title="Приватная" />
            ) : (
              <CgLockUnlock size={25} color="lightblue" title="Публичная" />
            )}
          </p>
        </div>
        {data && children}
      </div>
      <div style={noBorder ? { borderTopRightRadius: 0 } : {}} className={styles.arrowAside} onClick={hideHandler}>
        {isHide ? <AiOutlineArrowRight /> : <AiOutlineArrowLeft />}
      </div>
    </aside>
  );
}
