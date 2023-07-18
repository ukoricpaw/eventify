import Image from 'next/image';
import styles from '../../../styles/General.module.scss';

export default function UserAvatar({ src, size }: { src: string; size: number }) {
  return (
    <Image
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
