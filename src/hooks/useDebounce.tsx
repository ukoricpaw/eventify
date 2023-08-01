import { useEffect, useState } from 'react';

interface UseDebounceIProps<T> {
  value: T;
  delay: number;
}

export default function useDebounce<ValueType>({ value, delay }: UseDebounceIProps<ValueType>) {
  const [debouncedValue, setDebouncedValue] = useState<ValueType>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
