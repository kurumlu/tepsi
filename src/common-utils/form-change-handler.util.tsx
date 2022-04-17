import { FunctionComponent, useEffect } from 'react';
import { useFormikContext } from 'formik';

export const FormChangeHandler: FunctionComponent = () => {
  const { isSubmitting, touched } = useFormikContext();

  useEffect(() => {
    const listener = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };

    if (!isSubmitting && Object.keys(touched).length > 0) {
      window.addEventListener('beforeunload', listener);
    }

    return () => {
      window.removeEventListener('beforeunload', listener);
    };
  }, [isSubmitting, touched]);

  return null;
};
