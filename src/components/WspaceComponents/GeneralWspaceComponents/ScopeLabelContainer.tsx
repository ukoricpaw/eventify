import Container from '@/components/FormComponents/Container';
import CompoundLabel from '@/components/FormComponents/CompoundLabel';
import { IconType } from 'react-icons/lib';
interface ScopeLabelContainerIProps {
  color: string;
  value: string;
  children: string;
  Icon: IconType;
}

export default function ScopeLabelContainer({ Icon, value, children, color }: ScopeLabelContainerIProps) {
  return (
    <Container display="column">
      <CompoundLabel size="14px">
        <Icon size={20} color={color} title={value} /> {value}
      </CompoundLabel>
      <CompoundLabel size="14px">{children}</CompoundLabel>
    </Container>
  );
}
