import styles from '../../../styles/WorkingSpace.module.scss';
import { ChangeEvent, MouseEvent } from 'react';
import FormGroup from '../../FormComponents/FormGroup';
import default_picture from '../../../assets/images/default_picture.jpeg';
import Image from 'next/image';
import { selectWorkingSpacesResult } from '@/store/api/wspaceApi';
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
import { WorkingSpacesResponce } from '@/types/wspaceTypes';
import { DeskType } from '@/types/deskTypes';
import useInputImageFile from '@/hooks/useInputImageFile';

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
  const data = useAppSelector(state => selectWorkingSpacesResult(state, userData.id) as WorkingSpacesResponce);
  const { state, onChange } = useFormFields<DeskState>({
    wspaceNumber: wspaceId,
    name: '',
  });
  const [background, InputImageFile] = useInputImageFile({});
  const [postNewDesk, { isLoading, error, isError }] = usePostNewDeskInWorkingSpaceMutation();

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
    await postNewDesk(body).then(res => {
      if ((res as { data: DeskType }).data) {
        setActiveModal();
      }
    });
  };

  return (
    <ModalLayout setActiveModal={setActiveModal}>
      <h2 className={styles.modalTitle}>Создать доску</h2>
      <FormGroup>
        <div className={styles.backgroundContainer}>
          <p className={styles.backgroundContainer__title}>Фон:</p>
          <InputImageFile />
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
        {isError && <p style={{ color: 'red' }}>{error as string}</p>}
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
