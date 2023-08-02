import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import styles from '../styles/Desk.module.scss';
import { useRef, useEffect, useState, KeyboardEvent, ChangeEvent, MouseEvent, useContext } from 'react';
import useDebounce from './useDebounce';
import { DeskWSocketContext } from '@/components/DeskComponents/GeneralDeskComponents/DeskWSocketProvider';

interface UseTextInputFieldIProps {
  id: number;
  textVal: string;
  condition: boolean;
  dragProps?: DraggableProvidedDragHandleProps | null;
  emitFunction: 'renameColumn' | 'renameFullDesk';
  paragraphHandler: (e: MouseEvent<HTMLParagraphElement>) => void;
  color?: boolean;
  capitalize?: boolean;
  size?: string;
  ml?: string;
  setNull: () => void;
  cp?: boolean;
}

export default function TextInputField({
  textVal,
  condition,
  dragProps,
  paragraphHandler,
  id,
  emitFunction,
  color,
  size,
  capitalize,
  ml,
  setNull,
  cp,
}: UseTextInputFieldIProps) {
  const [text, setText] = useState<string>(textVal);
  const inputRef = useRef<HTMLInputElement>(null);
  const mountedRef = useRef<boolean>(false);
  const socket = useContext(DeskWSocketContext);
  const textRef = useRef<string>(textVal);

  const debouncedValue = useDebounce({ value: text, delay: 1000 });

  const setTextValHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const keyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setNull();
    }
  };

  console.log(textVal);

  useEffect(() => {
    if (condition) {
      inputRef.current?.focus();
    } else {
      if (!text.trim().length) {
        setText(textRef.current);
      }
    }
  }, [condition]);

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    if (debouncedValue.trim().length > 0) {
      socket?.emitEvent(emitFunction)(id, debouncedValue);
      textRef.current = debouncedValue;
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
          className={`${styles.column__columnName} ${!color && styles['column__transparent']} 
          inputSettings`}
          onClick={e => e.stopPropagation()}
          value={text}
          onChange={setTextValHandler}
          onKeyDown={keyDownHandler}
        />
      ) : (
        <p
          {...dragProps}
          onClick={paragraphHandler}
          className={`${!color ? styles.column__columnName : ''} paragraphSettings`}
        >
          {text}
        </p>
      )}
      <style jsx>
        {`
          .paragraphSettings {
            ${color && 'background-color: transparent;'}
            ${capitalize && 'text-transform: capitalize;'}
            ${size && `font-size: ${size}px;`}
            ${cp && 'cursor: pointer'}
          }

          .inputSettings {
            ${size && `font-size: ${Number(size) - 6}px;`}
            ${capitalize && 'text-transform: capitalize;'}
            ${ml && `margin-left: ${ml}px`}
          }
        `}
      </style>
    </>
  );
}
