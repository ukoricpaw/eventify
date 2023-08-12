import styles from '../../styles/General.module.scss';
import Link from 'next/link';
import { IoIosArrowDropdown } from 'react-icons/io';
import CompoundButton from '../FormComponents/CompoundButton';
import CompoundInput from '../FormComponents/CompoundInput';
import { useAppSelector } from '@/hooks/reduxHooks';
import { userSelector } from '@/store/slices/userSlice';
import { FaUser } from 'react-icons/fa';
import UserAvatar from '../WspaceComponents/GeneralWspaceComponents/UserAvatar';
import { AiOutlineSearch } from 'react-icons/ai';
import { ModalContext } from './CreateWspaceModalProvider';
import ContextConsumer from './ContextConsumer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WorkingSpacesDropdown from './WorkingSpacesDropdown';

export default function OwnNavbar() {
  const { userData } = useAppSelector(userSelector);
  return (
    <nav className={styles.navContainer} aria-label="primary-navigation">
      <ul className={styles.navContainer__list}>
        <ul className={styles.navContainer__ownLeftSection}>
          <Link href={`${process.env.NEXT_PUBLIC_CLIENT_URL}/users/${userData.id}/dashboard`}>
            <li className={styles.leftListItem}>eventify</li>
          </Link>
          <WorkingSpacesDropdown userId={userData.id} />
          <li className={styles.ownLeftSection__wspaceButton}>
            <ContextConsumer Context={ModalContext}>
              {value => (
                <CompoundButton onClick={value.setActiveModal} size={'30'} variant={'light'} padding={{ y: '5' }}>
                  Создать
                </CompoundButton>
              )}
            </ContextConsumer>
          </li>
        </ul>
        <li className={styles.navContainer__ownRightSection}>
          <CompoundInput
            padding={{
              x: '10',
              y: '5',
            }}
            width="250px"
            variant="light"
            type="text"
            placeholder="Найти рабочее пространство"
          >
            <AiOutlineSearch cursor={'pointer'} />
          </CompoundInput>
          {userData.avatar ? <UserAvatar size={40} src={userData.avatar} /> : <FaUser color="white" size={40} />}
        </li>
      </ul>
      <ToastContainer position="bottom-right" theme="light" />
    </nav>
  );
}
