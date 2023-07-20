import styles from '../../../styles/WorkingSpace.module.scss';
import ItemTitleWrapper from '../GeneralWspaceComponents/ItemTitleWrapper';
import CompoundButton from '../../FormComponents/CompoundButton';
import { useAppSelector } from '@/hooks/reduxHooks';
import { userSelector } from '@/store/slices/userSlice';
import { useRouter } from 'next/router';
import { getHref } from '@/utils/getHref';
import useItemSettings from '@/hooks/useItemSettings';

interface RightSectionItemSettingsIProps {
  wspaceName: string;
  wspaceId: number;
  wspaceRoleId: number;
}

export default function RightSectionItemSettings({
  wspaceRoleId,
  wspaceName,
  wspaceId,
}: RightSectionItemSettingsIProps) {
  const { userData } = useAppSelector(userSelector);
  const router = useRouter();
  const ItemList = useItemSettings(18, 'white', wspaceRoleId);
  return (
    <div className={styles.rightSection__itemSettings}>
      <ItemTitleWrapper wspace={wspaceName} ellipsis="350px" />
      <ul className={styles.itemSettingsList}>
        {ItemList.map(item => {
          return (
            <CompoundButton
              onClick={() => router.push(getHref(userData.id, wspaceId, item.name))}
              padding={{ x: '9', y: '4' }}
              variant="success"
              key={item.content}
            >
              {item.content}
              {item.icon}
            </CompoundButton>
          );
        })}
      </ul>
    </div>
  );
}
