import ModalLayout from '@/components/GeneralComponents/ModalLayout';
import styles from '../../../styles/WorkingSpace.module.scss';
import { MouseEvent } from 'react';

interface LinkModalIProps {
  setActiveHandler: () => void;
  inviteLink: string | null;
}

export default function LinkModal({ setActiveHandler, inviteLink }: LinkModalIProps) {
  const copyLinkToClipboard = async (e: MouseEvent<HTMLParagraphElement>) => {};

  return (
    <ModalLayout setActiveModal={setActiveHandler}>
      <p
        onClick={copyLinkToClipboard}
        className={styles.inviteLink}
      >{`${process.env.NEXT_PUBLIC_CLIENT_URL}/invite/${inviteLink}`}</p>
    </ModalLayout>
  );
}
