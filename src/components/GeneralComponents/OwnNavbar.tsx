import styles from '../../styles/General.module.scss';
import Link from 'next/link';
import { IoIosArrowDropdown } from 'react-icons/io';
import CompoundButton from '../FormComponents/CompoundButton';
import CompoundInput from '../FormComponents/CompoundInput';
import { useAppSelector } from '@/hooks/reduxHooks';
import { userSelector } from '@/store/slices/userSlice';
import { FaUser } from 'react-icons/fa';
import UserAvatar from '../WspaceComponents/UserAvatar';
import { AiOutlineSearch } from 'react-icons/ai';

export default function OwnNavbar() {
  const { data } = useAppSelector(userSelector);
  return (
    <nav className={styles.navContainer} aria-label="primary-navigation">
      <ul className={styles.navContainer__list}>
        <ul className={styles.navContainer__ownLeftSection}>
          <Link href="/">
            <li className={styles.leftListItem}>eventify</li>
          </Link>
          <li className={styles.ownLeftSection__wspaceTitle}>
            <p className={styles.wspaceTitle}>Рабочие пространства</p>
            <IoIosArrowDropdown size={20} cursor={'pointer'} />
          </li>
          <li className={styles.ownLeftSection__wspaceButton}>
            <CompoundButton size={'30'} variant={'light'} padding={{ y: '5' }}>
              Создать
            </CompoundButton>
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
          {data.avatar ? <UserAvatar size={40} src={data.avatar} /> : <FaUser color="white" size={40} />}
        </li>
      </ul>
    </nav>
  );
}
