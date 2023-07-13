export default function getCookies(cookies: any) {
  const cookiesKeys = Object.keys(cookies);
  return cookiesKeys.reduce((acc, cookieKey) => {
    return acc + `${cookieKey}=${cookies[cookieKey]}; `;
  }, '');
}
