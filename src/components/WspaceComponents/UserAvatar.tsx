import Image from 'next/image';
import styles from '../../styles/General.module.scss';

export default function UserAvatar({ src, size }: { src: string; size: number }) {
  const loader = () => `${process.env.NEXT_PUBLIC_API_URL}/api/image/${src}`;
  return (
    <Image
      className={styles.userAvatar}
      loader={loader}
      alt="user_avatar"
      priority
      width={size}
      height={size}
      src={`${process.env.NEXT_PUBLIC_API_URL}/api/image/${src}`}
    />
  );
}
