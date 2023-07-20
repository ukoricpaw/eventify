import { Context, useContext, ReactElement } from 'react';

export default function ContextConsumer<T>({
  Context,
  children,
}: {
  Context: Context<T>;
  children: (data: T) => ReactElement;
}) {
  const data = useContext(Context);
  return children(data);
}
