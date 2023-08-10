import changeDeskBackground from '@/axios/http/changeDeskBackground';
import useInputImageFile from '@/hooks/useInputImageFile';
import { useState, useRef } from 'react';
import styles from '../../../styles/Modal.module.scss';
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
  const deleted = useRef<boolean>(false);
  const changeImageHandler = async (delete_img: boolean) => {
    setLoading(true);
    const result = await changeDeskBackground({ wsId, deskId, background: background ?? undefined, delete_img });
    refBackground.current = background;
    if (delete_img) deleted.current = true;
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
          <>
            <CompoundButton
              onClick={() => changeImageHandler(true)}
              padding={{ y: '2' }}
              disabled={backgroundUrl && !background && !deleted.current ? false : true}
              variant="light"
            >
              Сбросить
            </CompoundButton>
            <CompoundButton
              onClick={() => changeImageHandler(false)}
              padding={{ y: '10' }}
              disabled={background && background !== refBackground.current ? false : true}
              variant="light"
            >
              Сохранить
            </CompoundButton>
          </>
        )
      )}
    </section>
  );
}
