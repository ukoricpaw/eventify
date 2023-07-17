import styles from '../../styles/WorkingSpace.module.scss';
import { MouseEvent, ReactNode } from 'react';
import Link from 'next/link';
import { getHref } from '@/utils/getHref';
import useItemSettings from '@/hooks/useItemSettings';
import { useRouter } from 'next/router';

export interface ItemsInterface {
  name: string;
  icon: ReactNode;
  content: string;
}

interface LeftSectionItemSettingsIProps {
  wspaceId?: number;
  margin?: string;
}
export default function LeftSectionItemSettings({ wspaceId, margin }: LeftSectionItemSettingsIProps) {
  const handleStopPropogation = (e: MouseEvent<HTMLUListElement>) => {
    e.stopPropagation();
  };

  const ItemList = useItemSettings(25, 'gray');
  const { query } = useRouter();

  return (
    <ul className={`${styles.itemSettings} settingsStyles`} onClick={handleStopPropogation}>
      {ItemList.map(item => {
        return (
          <Link
            href={getHref(Number(query.user), query.id ? Number(query.id) : Number(wspaceId), item.name)}
            key={item.content}
          >
            <li className={styles.settingItem}>
              {item.icon}
              <p className={styles.settingContent}>{item.content}</p>
            </li>
          </Link>
        );
      })}
      <style jsx>
        {`
          ${margin && `.settingsStyles {margin: ${margin};}`}
        `}
      </style>
    </ul>
  );
}
