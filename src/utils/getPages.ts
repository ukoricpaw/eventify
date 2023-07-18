export default function getPages(pagesCount: number, currentPage: number) {
  if (pagesCount <= 6) {
    const arr = [...Array(pagesCount)];
    return arr.map((_, index) => index + 1);
  } else if (currentPage <= 4) {
    const arr = [...Array(6)];
    return arr.map((_, index) => index + 1);
  } else if (currentPage > 4 && currentPage < pagesCount - 3) {
    const currentWindow = [];
    for (let i = currentPage - 3; i <= currentPage + 3; i++) {
      currentWindow.push(i);
    }
    return currentWindow;
  } else {
    const currentWindow = [];
    for (let i = pagesCount - 5; i <= pagesCount; i++) {
      currentWindow.push(i);
    }
    return currentWindow;
  }
}
