import { SerializedError } from '@reduxjs/toolkit';

export default function Error({ error }: { error: SerializedError }) {
  return <main>{error.code}</main>;
}
