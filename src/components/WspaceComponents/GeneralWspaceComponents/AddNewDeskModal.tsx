import styles from '../../../styles/WorkingSpace.module.scss';
import { ChangeEvent, MouseEvent } from 'react';
import FormGroup from '../../FormComponents/FormGroup';
import default_picture from '../../../assets/images/default_picture.jpeg';
import Image from 'next/image';
import { useGetWorkingSpacesClientQuery } from '@/store/api/wspaceApi';
import { useState } from 'react';
import CompoundInput from '../../FormComponents/CompoundInput';
import CompoundLabel from '../../FormComponents/CompoundLabel';
import CompoundButton from '../../FormComponents/CompoundButton';
import { usePostNewDeskInWorkingSpaceMutation } from '@/store/api/wspaceApi';
import { PostNewDesk } from '@/store/api/wspaceApi';
import ModalLayout from '../../GeneralComponents/ModalLayout';
import { useAppSelector } from '@/hooks/reduxHooks';
import { userSelector } from '@/store/slices/userSlice';
import useFormFields from '@/hooks/useFormFields';

interface AddNewDeskModalIProps {
  setActiveModal: () => void;
  wspaceId: number;
}

interface DeskState {
  wspaceNumber: number;
  name: string;
}

export default function AddNewDeskModal({ setActiveModal, wspaceId }: AddNewDeskModalIProps) {
  const { userData } = useAppSelector(userSelector);
  const { data } = useGetWorkingSpacesClientQuery(userData.id);
  const { state, onChange } = useFormFields<DeskState>({
    wspaceNumber: wspaceId,
    name: '',
  });
  const [background, setBackground] = useState<Blob | null>(null);
  const [postNewDesk, { isLoading, error }] = usePostNewDeskInWorkingSpaceMutation();

  const setBackgroundHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      setBackground(e.target.files[0]);
    }
  };

  const postNewDeskHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const body: PostNewDesk = {
      id: state.wspaceNumber,
      body: {
        name: state.name,
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
          <CompoundInput
            padding={{ x: '10', y: '10' }}
            onChange={onChange('name')}
            value={state.name}
            variant="success"
          />
        </div>
        <div className={styles.changeWspaceContainer}>
          <CompoundLabel>Рабочее пространство</CompoundLabel>
          <select className={styles.selectContainer} onChange={onChange('wspaceNumber')} value={state.wspaceNumber}>
            {data?.rows.map(item =>
              item.working_space_roles[0].roleId !== 3 ? (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ) : (
                ''
              ),
            )}
          </select>
        </div>
        {isLoading ? (
          'Пожалуйста подождите...'
        ) : (
          <CompoundButton
            disabled={state.name.trim().length > 3 ? false : true}
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
