import { ReactNode } from 'react';
import styles from '../../../styles/WorkingSpace.module.scss';

interface ItemTitleWrapperIProps {
  wspace: string;
  ellipsis?: string;
  children?: ReactNode;
}

export default function ItemTitleWrapper({ wspace, ellipsis, children }: ItemTitleWrapperIProps) {
  return (
    <div className={styles.itemTitleContainer__wrapper}>
      <div className={styles.itemLetter}>{wspace.charAt(0).toUpperCase()}</div>
      <h3 className={`${styles.itemTitle} ellipsis`} title={wspace}>
        {wspace}
      </h3>
      <div className="childParagraph">{children}</div>
      <style jsx>
        {`
          .childParagraph {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-weight: 300;
          }
          .ellipsis {
            max-width: ${ellipsis ? ellipsis : '130px'};
          }
        `}
      </style>
    </div>
  );
}
