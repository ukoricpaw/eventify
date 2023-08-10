import styles from '../styles/Column.module.scss';

export default function getBackgroundColorByDayDiff(dayDiff: number) {
  if (dayDiff > 1) {
    return styles.deadlineNotExpires;
  } else if (dayDiff < 1 && dayDiff > 0) {
    return styles.deadlineExpires;
  } else {
    return styles.deadlineExpired;
  }
}
