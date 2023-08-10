import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useGetWorkingSpacesClientQuery, useGetSingleWorkingSpaceClientQuery } from '@/store/api/wspaceApi';
import { useAppSelector, useAppDispatch } from '@/hooks/reduxHooks';
import { userSelector } from '@/store/slices/userSlice';
import { clearArchive } from '@/store/slices/listsSlice';
import { getSingleDesk } from '@/store/thunks/fetchSingleDeskThunks';
import styles from '../../../styles/Desk.module.scss';
import { layoutSelector } from '@/store/selectors/deskSelectors';
import CreateWspaceModalProvider from '../../GeneralComponents/CreateWspaceModalProvider';
import OwnNavbar from '../../GeneralComponents/OwnNavbar';
import DeskInfo from '../DeskInfo';
import DeskAsideInfo from '../DeskAsideInfo';
import DeskWSocketProvider from './DeskWSocketProvider';
import DeskTitleBackground from './DeskTitleBackground';
import DeskColumnModalProvider from '../ModalFieldsComponents/DeskColumnModalProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface DeskLayoutIProps {
  children: ReactNode;
}

export const notify = (message: string) => toast(message);

export default function DeskLayout({ children }: DeskLayoutIProps) {
  const { query } = useRouter();
  const { userData } = useAppSelector(userSelector);
  const { isLoading, isError } = useAppSelector(layoutSelector);
  const dispatch = useAppDispatch();
  const wspaceData = useGetWorkingSpacesClientQuery(userData.id);
  const singleWspace = useGetSingleWorkingSpaceClientQuery(Number(query.id));
  const roleIdCondition = singleWspace.data?.workingSpaceRole ? singleWspace.data.workingSpaceRole.roleId : 0;
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
          <DeskColumnModalProvider wspaceRoleId={roleIdCondition}>
            <div className={styles.deskContainer}>
              <DeskAsideInfo />
              <main className={styles.deskWrapper}>
                <DeskInfo roleId={roleIdCondition} />
                {children}
              </main>
            </div>
          </DeskColumnModalProvider>
        </CreateWspaceModalProvider>
        <ToastContainer position="bottom-right" theme='light'/>
      </DeskWSocketProvider>
    );
  };

  return render();
}
