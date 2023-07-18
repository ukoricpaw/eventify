import CompoundButton from '@/components/FormComponents/CompoundButton';
import CompoundInput from '@/components/FormComponents/CompoundInput';
import CompoundLabel from '@/components/FormComponents/CompoundLabel';
import FormGroup from '@/components/FormComponents/FormGroup';
import ModalLayout from '@/components/GeneralComponents/ModalLayout';
import styles from '../../../styles/WorkingSpace.module.scss';
import { ChangeEvent, MouseEvent, useState } from 'react';
import { PostNewWS, usePostNewWorkingSpaceMutation } from '@/store/api/wspaceApi';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/hooks/reduxHooks';
import { userSelector } from '@/store/slices/userSlice';
import { useGetWorkingSpacesClientQuery } from '@/store/api/wspaceApi';
import useFormFields from '@/hooks/useFormFields';

interface AddNewWspaceModalIProps {
  setActiveModal: () => void;
}

type InfoType = {
  name: string;
  description: string;
};

export default function AddNewWspaceModal({ setActiveModal }: AddNewWspaceModalIProps) {
  const { userData } = useAppSelector(userSelector);
  const { data } = useGetWorkingSpacesClientQuery(userData.id);
  const { state, onChange } = useFormFields({
    name: `Рабочее пространство ${data?.count ? data.count + 1 : ''}`,
    description: '',
  });
  const [postNewWS, { isLoading, error }] = usePostNewWorkingSpaceMutation();
  const router = useRouter();

  const handlerSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const body: PostNewWS = {
      name: state.name,
    };
    if (state.description.trim() !== '') {
      body.description = state.description;
    }
    await postNewWS(body);
    if (router.pathname.split('/').reverse()[0] !== 'dashboard') {
      router.push(`/users/${userData.id}/dashboard`);
    }
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
