import changeDeskBackground from '@/axios/http/changeDeskBackground';
import useInputImageFile from '@/hooks/useInputImageFile';
import { useState, useRef } from 'react';
import styles from '../../../styles/Desk.module.scss';
import { SpecialInputFieldsIProps } from './SpecialInputFields';
import CompoundButton from '@/components/FormComponents/CompoundButton';

export default function InputImage({
  backgroundUrl,
  wsId,
  deskId,
  roleCondition,
}: Omit<SpecialInputFieldsIProps, 'type' | 'listId' | 'itemId' | 'dateVal'>) {
  const [background, ImageInputFile] = useInputImageFile({
    backgroundUrl,
    width: 340,
    height: 200,
    roleCondition,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const refBackground = useRef<Blob | null>(null);
  const changeImageHandler = async () => {
    setLoading(true);
    const result = await changeDeskBackground({ wsId, deskId, background: background ?? undefined, delete_img: false });
    refBackground.current = background;
    setLoading(false);
    alert(result);
  };

  return (
    <section className={styles.deskImageInputSection}>
      <h2 className={styles.deskModalTitles}>Тема доски</h2>
      <ImageInputFile />
      {loading ? (
        <p>Подождите пожалуйста...</p>
      ) : (
        roleCondition && (
          <CompoundButton
            onClick={changeImageHandler}
            padding={{ y: '10' }}
            disabled={background && background !== refBackground.current ? false : true}
            variant="light"
          >
            Сохранить
          </CompoundButton>
        )
      )}
    </section>
  );
}
