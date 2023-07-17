import CompoundButton from '../FormComponents/CompoundButton';
import CompoundInput from '../FormComponents/CompoundInput';
import CompoundLabel from '../FormComponents/CompoundLabel';
import FormGroup from '../FormComponents/FormGroup';
import ModalLayout from '../GeneralComponents/ModalLayout';
import styles from '../../styles/WorkingSpace.module.scss';
import { ChangeEvent, MouseEvent, useState } from 'react';
import { PostNewWS, usePostNewWorkingSpaceMutation } from '@/store/api/wspaceApi';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/hooks/reduxHooks';
import { userSelector } from '@/store/slices/userSlice';
import { useGetWorkingSpacesClientQuery } from '@/store/api/wspaceApi';

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
  const [info, setInfo] = useState<InfoType>({
    name: `Рабочее пространство ${data?.count ? data.count + 1 : ''}`,
    description: '',
  });
  const [postNewWS, { isLoading, error }] = usePostNewWorkingSpaceMutation();
  const router = useRouter();

  const changeDescriptionHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInfo(prev => ({ ...prev, description: e.target.value }));
  };

  const changeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInfo(prev => ({ ...prev, name: e.target.value }));
  };

  const handlerSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const body: PostNewWS = {
      name: info.name,
    };
    if (info.description.trim() !== '') {
      body.description = info.description;
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
        <CompoundInput value={info.name} onChange={changeNameHandler} variant="success" padding={{ x: '10', y: '8' }} />
        <CompoundLabel>
          Описание <span>(необязательно)</span>
        </CompoundLabel>
        <textarea
          value={info.description}
          onChange={changeDescriptionHandler}
          className={styles.addNewWSTextArea}
          rows={6}
        />
        {isLoading ? (
          'Пожалуйста подождите...'
        ) : (
          <CompoundButton
            disabled={info.name.trim().length > 3 ? false : true}
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
