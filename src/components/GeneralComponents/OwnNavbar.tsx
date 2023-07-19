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
import { memo } from 'react';

export default memo(function OwnNavbar() {
  const { userData } = useAppSelector(userSelector);
  return (
    <nav className={styles.navContainer} aria-label="primary-navigation">
      <ul className={styles.navContainer__list}>
        <ul className={styles.navContainer__ownLeftSection}>
          <Link href="/">
            <li className={styles.leftListItem}>eventify</li>
          </Link>
          <li className={styles.ownLeftSection__wspaceTitle}>
            <Link href={`/users/${userData.id}/dashboard`}>
              <p className={styles.wspaceTitle}>Рабочие пространства</p>
            </Link>
            <IoIosArrowDropdown size={20} cursor={'pointer'} />
          </li>
          <li className={styles.ownLeftSection__wspaceButton}>
            <ModalContext.Consumer>
              {value => (
                <CompoundButton onClick={value.setActiveModal} size={'30'} variant={'light'} padding={{ y: '5' }}>
                  Создать
                </CompoundButton>
              )}
            </ModalContext.Consumer>
          </li>
        </ul>
        <li className={styles.navContainer__ownRightSection}>
          <CompoundInput
            padding={{
              x: '10',
              y: '5',
            }}
            variant="light"
            type="text"
            placeholder="Найти"
          >
            <AiOutlineSearch cursor={'pointer'} />
          </CompoundInput>
          {userData.avatar ? <UserAvatar size={40} src={userData.avatar} /> : <FaUser color="white" size={40} />}
        </li>
      </ul>
    </nav>
  );
});
