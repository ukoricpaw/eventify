import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useGetWorkingSpacesClientQuery, useGetSingleWorkingSpaceClientQuery } from '@/store/api/wspaceApi';
import { useAppSelector, useAppDispatch } from '@/hooks/reduxHooks';
import { userSelector } from '@/store/slices/userSlice';
import { clearArchive, getSingleDesk } from '@/store/slices/deskSlice';
import styles from '../../../styles/Desk.module.scss';
import { layoutSelector } from '@/store/selectors/deskSelectors';
import CreateWspaceModalProvider from '../../GeneralComponents/CreateWspaceModalProvider';
import OwnNavbar from '../../GeneralComponents/OwnNavbar';
import homeStyles from '../../../styles/General.module.scss';
import DeskInfo from '../DeskInfo';
import DeskAsideInfo from '../DeskAsideInfo';
import DeskWSocketProvider from './DeskWSocketProvider';
import DeskTitleBackground from './DeskTitleBackground';
import DeskColumnModalProvider from './DeskColumnModalProvider';
interface DeskLayoutIProps {
  children: ReactNode;
}

export default function DeskLayout({ children }: DeskLayoutIProps) {
  const { query } = useRouter();
  const { userData } = useAppSelector(userSelector);
  const { isLoading, isError } = useAppSelector(layoutSelector);
  const dispatch = useAppDispatch();
  const wspaceData = useGetWorkingSpacesClientQuery(userData.id);
  const singleWspace = useGetSingleWorkingSpaceClientQuery(Number(query.id));
  useEffect(() => {
    dispatch(getSingleDesk({ wspaceId: Number(query.id), deskId: Number(query.deskId) }));
    return () => {
      dispatch(clearArchive());
    };
  }, []);

  const render = () => {
    if (wspaceData.isLoading || isLoading || singleWspace.isLoading) {
      return <div>Loading...</div>;
    }

    if (wspaceData.isError || isError || singleWspace.isError) {
      return <div>Error</div>;
    }

    return (
      <DeskWSocketProvider wspaceId={Number(query.id)} deskId={Number(query.deskId)}>
        <DeskTitleBackground />
        <CreateWspaceModalProvider>
          <OwnNavbar />
          <DeskColumnModalProvider>
            <div className={styles.deskContainer}>
              <DeskAsideInfo />
              <div className={styles.deskWrapper}>
                <DeskInfo
                  roleId={singleWspace.data?.workingSpaceRole ? singleWspace.data.workingSpaceRole.roleId : 0}
                />
                <main className={homeStyles.mainContainer}>
                  <div className={homeStyles.mainWrapper}>{children}</div>
                </main>
              </div>
            </div>
          </DeskColumnModalProvider>
        </CreateWspaceModalProvider>
      </DeskWSocketProvider>
    );
  };

  return render();
}
