import { DeskType } from '@/types/deskTypes';
import styles from '../../styles/WorkingSpace.module.scss';
import Image from 'next/image';
import Link from 'next/link';

export default function RightSectionDeskItem({ desk }: { desk: DeskType }) {
  const loader = () => `${process.env.NEXT_PUBLIC_API_URL}/api/image/${desk.background}`;

  return (
    <Link href="/">
      <div className={styles.rightSection__deskItem}>
        {desk.background ? (
          <Image
            className={styles.rightSection__deskImage}
            loader={loader}
            alt="deskImage"
            width={100}
            height={100}
            src={`${process.env.NEXT_PUBLIC_API_URL}/api/image/${desk.background}`}
          />
        ) : (
          <div className={styles.rightSection__deskDefaultImage}></div>
        )}
        <p className={styles.deskTitle}>{desk.name}</p>
      </div>
    </Link>
  );
}
