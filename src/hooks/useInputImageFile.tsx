import Image from 'next/image';
import { useState, ChangeEvent, ReactElement } from 'react';
import default_picture from '../assets/images/default_picture.jpeg';
import styles from '../styles/WorkingSpace.module.scss';

interface InputImageFileIProps {
  backgroundUrl?: string;
  width?: number;
  height?: number;
  roleCondition?: boolean;
}

export default function useInputImageFile({
  backgroundUrl,
  width,
  height,
  roleCondition,
}: InputImageFileIProps): [Blob | null, () => ReactElement] {
  const [dataUrl, setDataUrl] = useState<string>('');
  const [background, setBackground] = useState<Blob | null>(null);

  const setBackgroundHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setDataUrl(reader.result as string);
      };

      setBackground(e.target.files[0]);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  function ImageComponent() {
    return (
      <>
        {!dataUrl ? (
          backgroundUrl ? (
            <Image
              style={{ width: width || 340, height: height || 200 }}
              className={styles.backgroundDefaultImage}
              src={`${process.env.NEXT_PUBLIC_API_URL}/api/image/${backgroundUrl}`}
              loader={({ src, width }) => src + '?w=' + width}
              height={height || 200}
              width={width || 340}
              alt="background"
              priority
            />
          ) : (
            <Image
              style={{ width: width || 340, height: height || 200 }}
              className={styles.backgroundDefaultImage}
              src={default_picture}
              alt="background"
              height={height || 200}
              width={width || 340}
              priority
            />
          )
        ) : (
          <Image
            style={{ width: width || 340, height: height || 200 }}
            className={styles.backgroundDefaultImage}
            src={dataUrl}
            alt="background"
            height={height || 200}
            width={width || 340}
            priority
          />
        )}
        {(roleCondition || roleCondition == undefined) && (
          <>
            <input
              className={styles.changeFileInput}
              onChange={setBackgroundHandler}
              type="file"
              accept="image/jpeg, image/png"
              id="image"
              style={{ display: 'none' }}
            />
            <label className={styles.backgroundThemeInput} htmlFor="image">
              Задать фон
            </label>
          </>
        )}
      </>
    );
  }

  return [background, ImageComponent];
}
