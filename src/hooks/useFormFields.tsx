import { useState, useCallback, ChangeEvent } from 'react';

export default function useFormFields<PropType>(initialState: PropType) {
  const [state, setState] = useState<PropType>(initialState);
  const onChange = useCallback(
    (key: keyof PropType) =>
      (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>) => {
        setState(prev => ({
          ...prev,
          [key]: e.target.value,
        }));
      },
    [],
  );
  return { state, onChange };
}
