import ModalLayout from '@/components/GeneralComponents/ModalLayout';
import useProvideModalContent from '@/hooks/useProvideModalContent';
import { EnumModal, ModalGeneralType } from '@/types/modalDeskTypes';
import defineFieldsModalType from '@/utils/defineFieldsModalType';
import styles from '../../../styles/Desk.module.scss';
import { useState, useCallback } from 'react';
import ModalInputField from '../ModalInputField';
import { DeskListItem } from '@/types/deskListTypes';

interface DeskModalIProps {
  modalHandler: () => void;
  type: EnumModal | null;
  modalContent: Omit<ModalGeneralType, 'type'>['content'] | null;
}

export default function DeskModal({ modalHandler, type, modalContent }: DeskModalIProps) {
  const data = useProvideModalContent({ type, content: modalContent });
  const [activeField, setActiveField] = useState<string | null>(null);

  const setActiveFieldHandler = useCallback((activeField: string | null) => {
    setActiveField(activeField);
  }, []);

  if (!data) return null;

  const fieldsType = defineFieldsModalType(type as EnumModal);

  return (
    <ModalLayout setActiveModal={modalHandler} wrapperHandler={() => setActiveFieldHandler(null)}>
      <section className={styles.deskModalSection} id="modalRef">
        <div className={styles.modal__nameField}>
          <h3>Название:</h3>
          <ModalInputField
            listId={(data as DeskListItem).deskListId ?? null}
            emitHandler={fieldsType[0]}
            inputId={`${data.id}/1`}
            roleId={2}
            activeId={activeField}
            rows={1}
            name={data.name}
            setActiveHandler={setActiveFieldHandler}
          />
        </div>
        <div className={styles.modal__nameField}>
          <h3>Описание:</h3>
          <ModalInputField
            listId={(data as DeskListItem).deskListId ?? null}
            emitHandler={fieldsType[1]}
            inputId={`${data.id}/2`}
            roleId={2}
            activeId={activeField}
            rows={5}
            name={data.description ?? 's'}
            setActiveHandler={setActiveFieldHandler}
          />
        </div>
      </section>
    </ModalLayout>
  );
}
