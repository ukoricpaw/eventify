import WorkingSpaceLayout from '@/components/GeneralComponents/WorkingSpaceLayout';
import RightSectionDeskList from '@/components/WspaceComponents/RightSectionComponents/RightSectionItemDesksList';
import styles from '../../../../../../styles/WorkingSpace.module.scss';
import { wrapper } from '@/store';

export default function DesksPage() {
  return (
    <WorkingSpaceLayout>
      <h1 className={styles.wspacePageTitle}>Доски рабочего пространства</h1>
      <RightSectionDeskList />
    </WorkingSpaceLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ctx => {
  const user = store.getState().userReducer.userData.email;
  if (!user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
});
