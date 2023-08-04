import useInputImageFile from '@/hooks/useInputImageFile';
import { EnumModal } from '@/types/modalDeskTypes';
import { memo } from 'react';

interface SpecialInputFieldsIProps {
  type: EnumModal;
  backgroundUrl?: string;
}

export default memo(function SpecialInputFields({ type, backgroundUrl }: SpecialInputFieldsIProps) {
  const [background, ImageInputFile] = useInputImageFile({ backgroundUrl, width: 340, height: 200 });
  return <ImageInputFile />;
});
