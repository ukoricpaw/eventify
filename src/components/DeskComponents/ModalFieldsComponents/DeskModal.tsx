import ModalLayout from '@/components/GeneralComponents/ModalLayout';
import useProvideModalContent from '@/hooks/useProvideModalContent';
import { EnumModal, ModalGeneralType } from '@/types/modalDeskTypes';
import defineFieldsModalType from '@/utils/defineFieldsModalType';
import styles from '../../../styles/Desk.module.scss';
import { useState, useEffect } from 'react';
import ModalInputField from './ModalInputField';
import { DeskListItem, SingleDesk } from '@/types/deskListTypes';
import getNameByModaltype from '@/utils/getNameByModalType';
import CompoundButton from '@/components/FormComponents/CompoundButton';
import SpecialInputFields from './SpecialInputFields';

interface DeskModalIProps {
  modalHandler: () => void;
  type: EnumModal | null;
  modalContent: Omit<ModalGeneralType, 'type'>['content'] | null;
  roleId: number;
}

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
  const nameOfModal = getNameByModaltype(type as EnumModal, data.createdAt);
  const roleCondition = roleId !== 0 && roleId <= 2;
  return (
    <ModalLayout setActiveModal={modalHandler} wrapperHandler={() => setActiveFieldHandler(null)}>
      <section
        className={`${styles.deskModalSection} ${type === EnumModal.ITEM && styles.deskModalSectionColumn}`}
        id="modalRef"
      >
        <div className={styles.modal__title}>
          <div className={styles.modal__iconTitle}>
            {nameOfModal[0]({ size: 25 })}
            <span className={styles.nameOfModal}>{nameOfModal[1]}</span>
          </div>
          <span className={styles.modal__createdAt}>{nameOfModal[2]}</span>
        </div>
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
                    padding={{ y: '84' }}
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
                  rows={9}
                  name={data.description ?? ''}
                  setActiveHandler={setActiveFieldHandler}
                />
              )}
            </div>
          </div>
          {type !== EnumModal.COLUMN && (
            <SpecialInputFields
              roleCondition={roleCondition}
              wsId={(data as SingleDesk).workingSpaceId}
              deskId={(data as SingleDesk).id}
              listId={(data as DeskListItem).deskListId}
              itemId={data.id}
              type={type as EnumModal}
              backgroundUrl={(data as SingleDesk).background ?? ''}
              dateVal={(data as DeskListItem).deadline}
            />
          )}
        </section>
      </section>
    </ModalLayout>
  );
}
