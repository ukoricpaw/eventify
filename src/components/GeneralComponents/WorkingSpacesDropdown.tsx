import { IoIosArrowDropdown, IoIosArrowDropup } from 'react-icons/io';
import styles from '../../styles/General.module.scss';
import Link from 'next/link';
import { useAppSelector } from '@/hooks/reduxHooks';
import { selectWorkingSpacesResult } from '@/store/api/wspaceApi';
import { WorkingSpacesResponce } from '@/types/wspaceTypes';
import { useState, MouseEvent } from 'react';
import ItemTitleWrapper from '../WspaceComponents/GeneralWspaceComponents/ItemTitleWrapper';
import useClickBodyListener from '@/hooks/useClickBodyListener';

interface WSDropDownIProps {
  userId: number;
}

export default function WorkingSpacesDropdown({ userId }: WSDropDownIProps) {
  const { rows } = useAppSelector(state => selectWorkingSpacesResult(state, userId) as WorkingSpacesResponce);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const setActiveDropdownHandler = (dropDownId: number | null) => {
    setActiveDropdown(dropDownId);
  };
  const [activeDropDownCondition] = useClickBodyListener({
    colId: userId,
    activeCol: activeDropdown,
    setActiveHandler: setActiveDropdown,
  });

  const stopPropagationHandler = (e: MouseEvent<HTMLUListElement>) => {
    e.stopPropagation();
  };

  const setDropdownWithStoppingPropagation = (e: MouseEvent<HTMLLIElement>) => {
    e.stopPropagation();
    setActiveDropdownHandler(activeDropdown ? null : userId);
  };

  return (
    <div className={styles.workingSpaceDropdownContainer}>
      <li className={styles.ownLeftSection__wspaceTitle} onClick={setDropdownWithStoppingPropagation}>
        <p className={styles.wspaceTitle}>Рабочие пространства</p>
        {activeDropDownCondition ? <IoIosArrowDropup size={20} /> : <IoIosArrowDropdown size={20} />}
      </li>
      {activeDropDownCondition && (
        <ul className={styles.workingSpaceDropdown__List} onClick={stopPropagationHandler}>
          <li className={styles.workingSpaceDropdown__title}>Ваши рабочие пространства</li>
          {rows && rows.length ? (
            rows.map(ws => (
              <Link key={ws.id} href={`${process.env.NEXT_PUBLIC_CLIENT_URL}/users/${ws.userId}/wspace/${ws.id}/desks`}>
                <ItemTitleWrapper ellipsis="200px" wspace={ws.name} />
              </Link>
            ))
          ) : (
            <p className={styles.workingSpaceDropdown__emptyList}>У Вас ещё нет рабочих пространств</p>
          )}
        </ul>
      )}
    </div>
  );
}
