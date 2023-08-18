import CompoundButton from '@/components/FormComponents/CompoundButton';
import { BiUserPlus } from 'react-icons/bi';
import styles from '../../../styles/WorkingSpace.module.scss';
import { useState, Suspense, lazy } from 'react';

interface WspaceProvideLinkIProps {
  inviteLink: null | string;
}

const LazyLinkModal = lazy(() => import('./LinkModal'));

export default function WspaceProvideLink({ inviteLink }: WspaceProvideLinkIProps) {
  const [active, setActive] = useState<boolean>(false);

  const setNonActiveHandler = () => {
    setActive(false);
  };

  const setActiveHandler = () => {
    setActive(true);
  };

  return (
    <>
      <div className={styles.wspaceEditInvite}>
        <CompoundButton variant="success" onClick={setActiveHandler} padding={{ x: '12', y: '4' }}>
          <BiUserPlus size={18} />
          Пригласить пользователя в рабочее пространств
        </CompoundButton>
      </div>

      {active && (
        <Suspense fallback={<></>}>
          <LazyLinkModal inviteLink={inviteLink} setActiveHandler={setNonActiveHandler} />
        </Suspense>
      )}
    </>
  );
}
