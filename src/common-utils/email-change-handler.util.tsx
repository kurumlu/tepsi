import { FunctionComponent, useEffect } from 'react';

export type EmailChangeHandlerProps = {
  email: string;
  onChange: (email: string) => void;
};

export const EmailChangeHandler: FunctionComponent<EmailChangeHandlerProps> = ({
  email,
  onChange,
}) => {
  useEffect(() => {
    onChange(email);
  }, [email, onChange]);

  return null;
};
