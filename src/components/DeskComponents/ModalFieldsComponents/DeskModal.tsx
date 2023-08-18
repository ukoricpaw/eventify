import ModalLayout from '@/components/GeneralComponents/ModalLayout';
import useProvideModalContent from '@/hooks/useProvideModalContent';
import { EnumModal, ModalGeneralType } from '@/types/modalDeskTypes';
import defineFieldsModalType from '@/utils/defineFieldsModalType';
import styles from '../../../styles/Modal.module.scss';
import { useState, useEffect } from 'react';
import ModalInputField from './ModalInputField';
import { DeskListItem, SingleDesk } from '@/types/deskListTypes';
import CompoundButton from '@/components/FormComponents/CompoundButton';
import { Suspense, lazy } from 'react';
import ModalTitle from './ModalTitle';
import { DeskEntities } from '@/types/deskTypes';

interface DeskModalIProps {
  modalHandler: () => void;
  type: EnumModal | null;
  modalContent: Omit<ModalGeneralType, 'type'>['content'] | null;
  roleId: number;
}

const LazySpecialInputFields = lazy(() => import('./SpecialInputFields'));

export default function DeskModal({ modalHandler, type, modalContent, roleId }: DeskModalIProps) {
  const data = useProvideModalContent({ type, content: modalContent });
  const [activeField, setActiveField] = useState<string | null>(null);

  const setActiveFieldHandler = (activeField: string | null) => {
    setActiveField(activeField);
  };

  useEffect(() => {
    if (!data) modalHandler();
  }, [data]);

  if (!data) return null;

  const fieldsType = defineFieldsModalType(type as EnumModal);
  const roleCondition = roleId !== 0 && roleId <= 2;
  return (
    <ModalLayout setActiveModal={modalHandler} wrapperHandler={() => setActiveFieldHandler(null)}>
      <section
        className={`${styles.deskModalSection} ${type === EnumModal.ITEM && styles.deskModalSectionColumn}`}
        id="modalRef"
      >
        <ModalTitle data={data as DeskEntities} createdAt={data.createdAt} type={type as EnumModal} />
        <section className={`${styles.deskModalInfo} ${type === EnumModal.ITEM && styles.deskModalInfoColumn}`}>
          <div className={styles.deskModalLeftSide}>
            <div className={styles.modal__nameField}>
              <p className={styles.deskModalTitles}>Название:</p>
              <ModalInputField
                listId={(data as DeskListItem).deskListId ?? null}
                emitHandler={fieldsType[0]}
                inputId={`${data.id}/1`}
                roleCondition={roleCondition}
                activeId={activeField}
                rows={1}
                name={data.name}
                setActiveHandler={setActiveFieldHandler}
              />
            </div>
            <div className={styles.modal__nameField}>
              <p className={styles.deskModalTitles}>Описание:</p>
              {!data.description && activeField !== `${data.id}/2` ? (
                !roleCondition ? (
                  <em>Описания нет</em>
                ) : (
                  <CompoundButton
                    variant="light"
                    onClick={() => setActiveFieldHandler(`${data.id}/2`)}
                    padding={{ y: '98' }}
                  >
                    Добавить описание
                  </CompoundButton>
                )
              ) : (
                <ModalInputField
                  listId={(data as DeskListItem).deskListId ?? null}
                  emitHandler={fieldsType[1]}
                  inputId={`${data.id}/2`}
                  roleCondition={roleCondition}
                  activeId={activeField}
                  rows={10}
                  name={data.description ?? ''}
                  setActiveHandler={setActiveFieldHandler}
                />
              )}
            </div>
          </div>
          {type !== EnumModal.COLUMN && (
            <Suspense fallback={<>Подождите пожалуйста...</>}>
              <LazySpecialInputFields
                roleCondition={roleCondition}
                wsId={(data as SingleDesk).workingSpaceId}
                deskId={(data as SingleDesk).id}
                listId={(data as DeskListItem).deskListId}
                itemId={data.id}
                type={type as EnumModal}
                backgroundUrl={(data as SingleDesk).background ?? ''}
                dateVal={(data as DeskListItem).deadline}
              />
            </Suspense>
          )}
        </section>
      </section>
    </ModalLayout>
  );
}
