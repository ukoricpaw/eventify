import CompoundButton from '@/components/FormComponents/CompoundButton';
import CompoundInput from '@/components/FormComponents/CompoundInput';
import CompoundLabel from '@/components/FormComponents/CompoundLabel';
import FormGroup from '@/components/FormComponents/FormGroup';
import ModalLayout from '@/components/GeneralComponents/ModalLayout';
import styles from '../../../styles/WorkingSpace.module.scss';
import { MouseEvent } from 'react';
import { PostNewWS, selectWorkingSpacesResult, usePostNewWorkingSpaceMutation } from '@/store/api/wspaceApi';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/hooks/reduxHooks';
import { userSelector } from '@/store/slices/userSlice';
import useFormFields from '@/hooks/useFormFields';
import { WorkingSpacesResponce, NewWorkingSpaceResponse } from '@/types/wspaceTypes';

interface AddNewWspaceModalIProps {
  setActiveModal: () => void;
}

export default function AddNewWspaceModal({ setActiveModal }: AddNewWspaceModalIProps) {
  const { userData } = useAppSelector(userSelector);
  const data = useAppSelector(state => selectWorkingSpacesResult(state, userData.id) as WorkingSpacesResponce);
  const { state, onChange } = useFormFields({
    name: `Рабочее пространство ${data?.count ? data.count + 1 : ''}`,
    description: '',
  });
  const [postNewWS, { isLoading, error, isError }] = usePostNewWorkingSpaceMutation();
  const router = useRouter();
  const handlerSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const body: PostNewWS = {
      name: state.name,
    };
    if (state.description.trim() !== '') {
      body.description = state.description;
    }
    await postNewWS(body).then(res => {
      if ((res as { data: NewWorkingSpaceResponse }).data) {
        setActiveModal();
        if (router.pathname.split('/').reverse()[0] !== 'dashboard') {
          router.push(`/users/${userData.id}/dashboard`);
        }
      }
    });
  };

  return (
    <ModalLayout setActiveModal={setActiveModal}>
      <FormGroup>
        <h2 className={styles.addNewWSTitle}>Новое рабочее пространство</h2>
        <CompoundLabel>Название рабочего пространства</CompoundLabel>
        <CompoundInput value={state.name} onChange={onChange('name')} variant="success" padding={{ x: '10', y: '8' }} />
        <CompoundLabel>
          Описание <span>(необязательно)</span>
        </CompoundLabel>
        <textarea
          value={state.description}
          onChange={onChange('description')}
          className={styles.addNewWSTextArea}
          rows={6}
        />
        {isError && <p style={{ color: 'red' }}>{error as string}</p>}
        {isLoading ? (
          'Пожалуйста подождите...'
        ) : (
          <CompoundButton
            disabled={state.name.trim().length > 3 ? false : true}
            onClick={handlerSubmit}
            variant="light"
            padding={{ x: '10', y: '15' }}
            mt="15"
          >
            Создать
          </CompoundButton>
        )}
      </FormGroup>
    </ModalLayout>
  );
}
