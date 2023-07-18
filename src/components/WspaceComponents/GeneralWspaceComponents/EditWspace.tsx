import styles from '../../../styles/WorkingSpace.module.scss';
import FormGroup from '@/components/FormComponents/FormGroup';
import CompoundInput from '@/components/FormComponents/CompoundInput';
import CompoundButton from '@/components/FormComponents/CompoundButton';
import CompoundLabel from '@/components/FormComponents/CompoundLabel';
import { MouseEvent } from 'react';
import { SingleWorkingSpaceType } from '@/types/wspaceTypes';
import Container from '@/components/FormComponents/Container';
import { CgLock, CgLockUnlock } from 'react-icons/cg';
import ScopeLabelContainer from './ScopeLabelContainer';
import { useUpdateWspaceMutation } from '@/store/api/wspaceApi';
import useFormFields from '@/hooks/useFormFields';
import DeleteWspace from './DeleteWspace';

interface EditWspaceState {
  name?: string;
  description?: string;
  isPrivate?: '1' | '2';
}

export default function EditWspace({ data }: { data: SingleWorkingSpaceType }) {
  const { state, onChange } = useFormFields({
    name: data.workingSpace.name,
    description: data.workingSpace.description ?? '',
    isPrivate: data.workingSpace.private ? '1' : '2',
  });

  const [updateWspace, { isLoading }] = useUpdateWspaceMutation();

  const handlerSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const body: Omit<EditWspaceState, 'isPrivate'> & { isPrivate?: string } = {};
    if (state.name && state.name.trim() !== data.workingSpace.name.trim()) {
      body['name'] = state.name;
    }
    if (state.description?.trim() !== '') {
      body['description'] = state.description;
    }
    if (
      (!data.workingSpace.private && state.isPrivate === '1') ||
      (data.workingSpace.private && state.isPrivate === '2')
    ) {
      body['isPrivate'] = state.isPrivate === '1' ? 'true' : 'false';
    }
    await updateWspace({
      wspaceId: data.workingSpace.id,
      wspaceBody: body,
    });
    alert('Обновлено');
  };

  return (
    <section className={styles.settings__editWspaceSection}>
      <FormGroup>
        <Container display="column">
          <CompoundLabel size="20px">Название</CompoundLabel>
          <CompoundInput
            variant="success"
            width="80%"
            padding={{ x: '10', y: '10' }}
            value={state.name}
            onChange={onChange('name')}
          />
        </Container>
        <Container display="column">
          <CompoundLabel size="20px">Описание (необязательно)</CompoundLabel>
          <textarea
            className={styles.settings__textArea}
            value={state.description ?? ''}
            onChange={onChange('description')}
          />
        </Container>
        <Container>
          <CompoundLabel size="20px">Настройки видимости</CompoundLabel>
          <select
            onChange={onChange('isPrivate')}
            className={styles.settings_isPrivateSelect}
            defaultValue={data.workingSpace.private ? '1' : '2'}
          >
            <option value="1">Приватная</option>
            <option value="2">Публичная</option>
          </select>
        </Container>
        {data.workingSpace.private ? (
          <ScopeLabelContainer color="red" value="Приватная" Icon={CgLock}>
            Приватное рабочее пространство. Не видно никому кроме участников.
          </ScopeLabelContainer>
        ) : (
          <ScopeLabelContainer color="lightblue" value="Публичная" Icon={CgLockUnlock}>
            Публичное рабочее пространство. Видно всем пользователям.
          </ScopeLabelContainer>
        )}
        <DeleteWspace />
        {isLoading ? (
          'Пожалуйста подождите'
        ) : (
          <CompoundButton
            disabled={state.name && state.name.trim().length > 3 ? false : true}
            mt="60"
            width="82%"
            variant="light"
            onClick={handlerSubmit}
          >
            Сохранить
          </CompoundButton>
        )}
      </FormGroup>
    </section>
  );
}
