import Image from 'next/image';
import styles from '../../../styles/General.module.scss';

export default function UserAvatar({ src, size, noCursor }: { src: string; size: number; noCursor?: boolean }) {
  return (
    <Image
      style={{ cursor: noCursor ? 'default' : 'pointer' }}
      className={styles.userAvatar}
      loader={({ src, width }) => src + '?w=' + width}
      alt="user_avatar"
      priority
      width={size}
      height={size}
      src={`${process.env.NEXT_PUBLIC_API_URL}/api/image/${src}`}
    />
  );
}
