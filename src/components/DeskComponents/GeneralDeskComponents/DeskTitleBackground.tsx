import styles from '../../../styles/Desk.module.scss';
import default_picture from '../../../assets/images/default_picture.jpeg';
import Image from 'next/image';
import Head from 'next/head';
import { useAppSelector } from '@/hooks/reduxHooks';
import { titleBackgroundSelector } from '@/store/selectors/deskSelectors';

export default function DeskTitleBackground() {
  const { name, background } = useAppSelector(titleBackgroundSelector);
  const title = `${name} | Eventify`;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Image
        draggable={false}
        className={styles.deskBackground}
        alt="background Image"
        loader={({ src, width }) => `${src}?w=${width}`}
        src={background ? `${process.env.NEXT_PUBLIC_API_URL}/api/image/${background}` : default_picture}
        priority
        width={100}
        height={100}
        placeholder="blur"
        blurDataURL={background ? `${process.env.NEXT_PUBLIC_API_URL}/api/image/${background}` : default_picture.src}
      />
    </>
  );
}
