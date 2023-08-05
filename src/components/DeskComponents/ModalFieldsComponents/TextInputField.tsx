import styles from '../../../styles/Desk.module.scss';
import { useRef, useEffect, useState, KeyboardEvent, ChangeEvent, MouseEvent, useContext } from 'react';
import { DeskWSocketContext } from '@/components/DeskComponents/GeneralDeskComponents/DeskWSocketProvider';
import { FieldsActionTypes } from '@/utils/defineFieldsModalType';
import EmitModalEvent from '@/utils/emitModalEvent';

interface UseTextInputFieldIProps {
  id: number;
  textVal: string;
  condition: boolean;
  emitFunction: FieldsActionTypes;
  paragraphHandler: (e: MouseEvent<HTMLParagraphElement>) => void;
  color?: boolean;
  size?: string;
  ml?: string;
  setNull: () => void;
  cursor?: boolean;
  rows?: number;
  deskListId: number | null;
  inputId?: string;
  mw?: string;
}

export default function TextInputField({
  textVal,
  condition,
  paragraphHandler,
  id,
  emitFunction,
  color,
  size,
  ml,
  setNull,
  cursor,
  rows,
  deskListId,
  inputId,
  mw,
}: UseTextInputFieldIProps) {
  const [text, setText] = useState<string>(textVal);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const socket = useContext(DeskWSocketContext);
  const immediateText = useRef<string>(textVal);

  const setTextValHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    immediateText.current = e.target.value;
  };

  const keyDownHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      setNull();
    }
  };

  useEffect(() => {
    if (condition) {
      inputRef.current?.focus();
      if (inputRef.current) {
        inputRef.current.selectionStart = text.length;
        inputRef.current.selectionEnd = text.length;
      }
    } else {
      if (!text.trim().length) {
        setText(textVal);
      }
    }
    return () => {
      if (condition) {
        if (
          (immediateText.current !== textVal &&
            immediateText.current.trim() !== '' &&
            (!inputId || inputId === `${id}/1`)) ||
          (immediateText.current !== textVal && inputId === `${id}/2`)
        ) {
          EmitModalEvent({ debouncedValue: immediateText.current, deskListId, emitFunction, socket, id });
        }
      }
    };
  }, [condition]);

  useEffect(() => {
    setText(textVal);
    immediateText.current = textVal;
  }, [textVal]);

  return (
    <>
      {condition ? (
        <textarea
          ref={inputRef}
          rows={rows ?? 1}
          className={`${styles.column__columnName} ${!color && styles['column__transparent']} 
        inputSettings`}
          onClick={e => {
            e.stopPropagation();
          }}
          placeholder={inputId == `${id}/2` ? 'Введите описание...' : ''}
          value={text}
          onChange={setTextValHandler}
          onKeyDown={keyDownHandler}
        />
      ) : (
        <p
          onClick={paragraphHandler}
          className={`${!color ? styles.column__columnName : ''} ${
            (inputId == `${id}/1` || !inputId) && styles.column__paragraph
          } paragraphSettings`}
        >
          {text}
        </p>
      )}
      <style jsx>
        {`
          .paragraphSettings {
            ${color ? 'background-color: transparent;' : ''}
            ${size ? `font-size: ${size}px;` : ''}
            ${cursor ? 'cursor: pointer;' : 'cursor: auto;'}
            transition: all 0.15s;
            word-wrap: break-word;
            ${mw ? `max-width: ${mw}px;` : ''}
            font-weight: 300;
          }

          ${cursor &&
          '.paragraphSettings:hover {background-color: rgba(0, 0, 0, 0.25);border-radius: 5px;padding: 5px;box-sizing: border-box;}'}

          .inputSettings {
            cursor: auto;
            ${mw ? `width: ${mw}px;` : ''}
            ${!mw ? 'word-wrap: break-word' : ''};
            ${size ? `font-size: ${Number(size) - 6}px;` : ''}
            ${ml ? `margin-left: ${ml}px` : ''}
          }
        `}
      </style>
    </>
  );
}
