import ModalLayout from '@/components/GeneralComponents/ModalLayout';
import styles from '../../../styles/WorkingSpace.module.scss';
import { MouseEvent } from 'react';
import { FaLink } from 'react-icons/fa';
import { notifyWithSuccess } from '@/utils/notificationsFromToastify';
import copyToClipboard from '@/utils/copyToClipboard';

interface LinkModalIProps {
  setActiveHandler: () => void;
  inviteLink: string | null;
}

export default function LinkModal({ setActiveHandler, inviteLink }: LinkModalIProps) {
  const copyLinkToClipboard = async (e: MouseEvent<HTMLParagraphElement>) => {
    copyToClipboard(`${process.env.NEXT_PUBLIC_CLIENT_URL}/invite/${inviteLink}`);
    notifyWithSuccess('Ссылка была скопирована в буфер обмена');
  };
  return (
    <ModalLayout setActiveModal={setActiveHandler}>
      <section className={styles.linkModalSection}>
        <FaLink color="white" size={20} className={styles.linkIcon} />
        <div className={styles.copyLink}>
          <p className={styles.copyLink__invite}>
            Все у кого есть ссылка, могут стать участниками рабочего пространства
          </p>
          <p className={styles.copyLink__title} onClick={copyLinkToClipboard}>
            Копировать ссылку
          </p>
        </div>
      </section>
    </ModalLayout>
  );
}
