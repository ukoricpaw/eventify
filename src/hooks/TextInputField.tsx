import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import styles from '../styles/Desk.module.scss';
import { useRef, useEffect, useState, useCallback, ChangeEvent, MouseEvent, useContext } from 'react';
import useDebounce from './useDebounce';
import { DeskWSocketContext } from '@/components/DeskComponents/GeneralDeskComponents/DeskWSocketProvider';

interface UseTextInputFieldIProps {
  id: number;
  textVal: string;
  condition: boolean;
  dragProps?: DraggableProvidedDragHandleProps | null;
  emitFunction: 'renameColumn' | 'renameDesk';
  paragraphHandler: (e: MouseEvent<HTMLParagraphElement>) => void;
}

export default function TextInputField({
  textVal,
  condition,
  dragProps,
  paragraphHandler,
  id,
  emitFunction,
}: UseTextInputFieldIProps) {
  const [text, setText] = useState<string>(textVal);
  const inputRef = useRef<HTMLInputElement>(null);
  const mountedRef = useRef<boolean>(false);
  const socket = useContext(DeskWSocketContext);

  const debouncedValue = useDebounce({ value: text, delay: 1000 });

  const setTextValHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }, []);

  useEffect(() => {
    if (condition) {
      inputRef.current?.focus();
    }
  }, [condition]);

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    if (debouncedValue.trim().length > 0) {
      socket?.emitEvent('renameColumn')(id, debouncedValue);
    }
  }, [debouncedValue]);

  useEffect(() => {
    setText(textVal);
  }, [textVal]);

  return (
    <>
      {condition ? (
        <input
          ref={inputRef}
          className={styles.column__columnName}
          onClick={e => e.stopPropagation()}
          value={text}
          onChange={setTextValHandler}
        />
      ) : (
        <p {...dragProps} onClick={paragraphHandler} className={styles.column__columnName}>
          {text}
        </p>
      )}
    </>
  );
}
