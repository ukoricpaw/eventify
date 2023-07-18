import { DeskType } from '@/types/deskTypes';
import styles from '../../../styles/WorkingSpace.module.scss';
import Image from 'next/image';
import Link from 'next/link';

export default function RightSectionDeskItem({ desk }: { desk: DeskType }) {
  return (
    <Link href="/">
      <div className={styles.rightSection__deskItem}>
        {desk.background ? (
          <Image
            className={styles.rightSection__deskImage}
            loader={({ src, width }) => src + '?w=' + width}
            alt="deskImage"
            width={100}
            height={100}
            src={`${process.env.NEXT_PUBLIC_API_URL}/api/image/${desk.background}`}
          />
        ) : (
          <div className={styles.rightSection__deskDefaultImage}></div>
        )}
        <p title={desk.name} className={styles.deskTitle}>
          {desk.name}
        </p>
      </div>
    </Link>
  );
}
