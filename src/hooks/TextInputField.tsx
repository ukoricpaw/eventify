import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import styles from '../styles/Desk.module.scss';
import { useRef, useEffect, useState, KeyboardEvent, ChangeEvent, MouseEvent, useContext } from 'react';
import useDebounce from './useDebounce';
import { DeskWSocketContext } from '@/components/DeskComponents/GeneralDeskComponents/DeskWSocketProvider';
import { FieldsActionTypes } from '@/utils/defineFieldsModalType';

interface UseTextInputFieldIProps {
  id: number;
  textVal: string;
  condition: boolean;
  dragProps?: DraggableProvidedDragHandleProps | null;
  emitFunction: FieldsActionTypes;
  paragraphHandler: (e: MouseEvent<HTMLParagraphElement>) => void;
  color?: boolean;
  size?: string;
  ml?: string;
  setNull: () => void;
  cp?: boolean;
  rows?: number;
  mw?: boolean;
  deskListId: number | null;
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
  ml,
  setNull,
  cp,
  rows,
  mw,
  deskListId,
}: UseTextInputFieldIProps) {
  const [text, setText] = useState<string>(textVal);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const mountedRef = useRef<boolean>(false);
  const socket = useContext(DeskWSocketContext);
  const textRef = useRef<string>(textVal);

  const debouncedValue = useDebounce({ value: text, delay: 500 });

  const setTextValHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const keyDownHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      setNull();
    }
  };

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
      if (emitFunction === 'renameItem' || emitFunction === 'changeDescription') {
        if (deskListId) {
          socket?.emitEvent(emitFunction)(deskListId, id, debouncedValue);
        }
      } else {
        socket?.emitEvent(emitFunction)(id, debouncedValue);
      }
      textRef.current = debouncedValue;
    } else if (emitFunction === 'changeColumnDescription' || emitFunction === 'changeDeskDescription') {
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
        <textarea
          {...dragProps}
          ref={inputRef}
          rows={rows ?? 1}
          className={`${styles.column__columnName} ${!color && styles['column__transparent']} 
        inputSettings`}
          onClick={e => {
            e.stopPropagation();
          }}
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
            ${color ? 'background-color: transparent;' : ''}
            ${size ? `font-size: ${size}px;` : ''}
            ${cp ? 'cursor: pointer;' : ''}
            transition: all 0.15s
          }

          .paragraphSettings:hover {
            background-color: rgba(0, 0, 0, 0.25);
            border-radius: 5px;
            padding: 5px;
            box-sizing: border-box;
          }

          .inputSettings {
            cursor: auto;
            ${mw ? 'max-width: 100%;' : ''}
            resize: none;
            ${size ? `font-size: ${Number(size) - 6}px;` : ''}
            ${ml ? `margin-left: ${ml}px` : ''}
          }
        `}
      </style>
    </>
  );
}
