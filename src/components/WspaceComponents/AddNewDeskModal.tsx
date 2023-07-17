import styles from '../../styles/WorkingSpace.module.scss';
import { ChangeEvent, MouseEvent } from 'react';
import FormGroup from '../FormComponents/FormGroup';
import default_picture from '../../assets/images/default_picture.jpeg';
import Image from 'next/image';
import { useGetWorkingSpacesClientQuery } from '@/store/api/wspaceApi';
import { useState } from 'react';
import CompoundInput from '../FormComponents/CompoundInput';
import CompoundLabel from '../FormComponents/CompoundLabel';
import CompoundButton from '../FormComponents/CompoundButton';
import { usePostNewDeskInWorkingSpaceMutation } from '@/store/api/wspaceApi';
import { PostNewDesk } from '@/store/api/wspaceApi';
import ModalLayout from '../GeneralComponents/ModalLayout';
import { useAppSelector } from '@/hooks/reduxHooks';
import { userSelector } from '@/store/slices/userSlice';

interface AddNewDeskModalIProps {
  setActiveModal: () => void;
  wspaceId: number;
}

export default function AddNewDeskModal({ setActiveModal, wspaceId }: AddNewDeskModalIProps) {
  const { userData } = useAppSelector(userSelector);
  const { data } = useGetWorkingSpacesClientQuery(userData.id);
  const [background, setBackground] = useState<Blob | null>(null);
  const [wspaceNumber, setWspaceId] = useState<number>(wspaceId);
  const [name, setName] = useState<string>('');
  const [postNewDesk, { isLoading, error }] = usePostNewDeskInWorkingSpaceMutation();

  const setBackgroundHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      setBackground(e.target.files[0]);
    }
  };

  const changeWspaceNumber = (e: ChangeEvent<HTMLSelectElement>) => {
    setWspaceId(Number(e.target.value));
  };

  const setNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const postNewDeskHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const body: PostNewDesk = {
      id: wspaceNumber,
      body: {
        name,
      },
    };
    if (background) {
      body.body.background = background;
    }
    await postNewDesk(body);
    setActiveModal();
  };

  return (
    <ModalLayout setActiveModal={setActiveModal}>
      <h2 className={styles.modalTitle}>Создать доску</h2>
      <FormGroup>
        <div className={styles.backgroundContainer}>
          <p className={styles.backgroundContainer__title}>Фон:</p>
          {!background && (
            <Image
              className={styles.backgroundDefaultImage}
              src={default_picture}
              alt="background"
              width={340}
              height={200}
              priority
            />
          )}
          <input
            className={styles.changeFileInput}
            onChange={setBackgroundHandler}
            type="file"
            accept="image/jpeg, image/png"
          />
        </div>
        <div className={styles.nameInputContainer}>
          <CompoundLabel>Название доски</CompoundLabel>
          <CompoundInput padding={{ x: '10', y: '10' }} onChange={setNameHandler} value={name} variant="success" />
        </div>
        <div className={styles.changeWspaceContainer}>
          <CompoundLabel>Рабочее пространство</CompoundLabel>
          <select className={styles.selectContainer} onChange={changeWspaceNumber} value={wspaceNumber}>
            {data?.rows.map(item => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        {isLoading ? (
          'Пожалуйста подождите...'
        ) : (
          <CompoundButton
            disabled={name.trim().length > 3 ? false : true}
            mt="15"
            padding={{ x: '30', y: '10' }}
            variant="light"
            onClick={postNewDeskHandler}
          >
            Создать
          </CompoundButton>
        )}
      </FormGroup>
    </ModalLayout>
  );
}
