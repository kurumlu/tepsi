import { FunctionComponent, useEffect } from 'react';
import { useFormikContext } from 'formik';

export type SubmitErrorHandlerProps = {
  onSubmitError: (errors: string[]) => void;
};

export const SubmitErrorHandler: FunctionComponent<SubmitErrorHandlerProps> = ({
  onSubmitError,
}) => {
  const { errors, isSubmitting, isValid, submitCount } = useFormikContext();

  useEffect(() => {
    if (submitCount > 0 && !isValid && !isSubmitting) {
      onSubmitError(Object.keys(errors));
    }
  }, [submitCount, isSubmitting]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
};
