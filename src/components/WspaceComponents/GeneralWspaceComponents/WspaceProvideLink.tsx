import CompoundButton from '@/components/FormComponents/CompoundButton';
import { BiUserPlus } from 'react-icons/bi';
import styles from '../../../styles/WorkingSpace.module.scss';
import { useState, Suspense, lazy } from 'react';

interface WspaceProvideLinkIProps {
  roleId: number;
  inviteLink: null | string;
}

const LazyLinkModal = lazy(() => import('./LinkModal'));

export default function WspaceProvideLink({ roleId, inviteLink }: WspaceProvideLinkIProps) {
  const [active, setActive] = useState<boolean>(false);

  const setNonActiveHandler = () => {
    setActive(false);
  };

  const setActiveHandler = () => {
    setActive(true);
  };

  return (
    <>
      {roleId !== 0 && roleId <= 2 && (
        <div className={styles.wspaceEditInvite}>
          <CompoundButton variant="success" onClick={setActiveHandler} padding={{ x: '12', y: '4' }}>
            <BiUserPlus size={18} />
            Пригласить пользователя в рабочее пространств
          </CompoundButton>
        </div>
      )}
      {active && (
        <Suspense fallback={<></>}>
          <LazyLinkModal inviteLink={inviteLink} setActiveHandler={setNonActiveHandler} />
        </Suspense>
      )}
    </>
  );
}
