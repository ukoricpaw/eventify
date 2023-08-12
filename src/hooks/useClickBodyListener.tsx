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

  useEffect(() => {
    const docRef = elementRef ? elementRef : document.body;
    if (activeColumnCondition) {
      docRef.addEventListener('click', setActiveColumnNull);
    }

    return () => {
      docRef.removeEventListener('click', setActiveColumnNull);
    };
  }, [activeCol, activeColumnCondition]);

  const setActiveColumnNull = () => {
    setActiveHandler && setActiveHandler(null);
  };

  return [activeColumnCondition, setActiveColumnNull];
}
