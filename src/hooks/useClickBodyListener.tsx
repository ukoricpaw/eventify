import { useEffect } from 'react';

interface useClickBodyListenerIProps {
  activeCol?: number | null;
  colId: number;
  setActiveHandler?: (column: number | null) => void;
  elementRef?: HTMLDivElement;
}

export default function useClickBodyListener({
  activeCol,
  colId,
  setActiveHandler,
  elementRef,
}: useClickBodyListenerIProps): [boolean, () => void] {
  const activeColumnCondition = activeCol === colId;
  const docRef = elementRef ? elementRef : document.body;

  useEffect(() => {
    if (activeColumnCondition) {
      docRef.addEventListener('click', setActiveColumnNull);
    }

    return () => {
      docRef.removeEventListener('click', setActiveColumnNull);
    };
  }, [activeCol, docRef, activeColumnCondition]);

  const setActiveColumnNull = () => {
    console.log('null');
    setActiveHandler && setActiveHandler(null);
  };

  return [activeColumnCondition, setActiveColumnNull];
}
