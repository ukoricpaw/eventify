export const getHref = (userId: number, wspaceId: number, name: string) =>
  `/users/${userId}/wspace/${wspaceId}/${name}`;
