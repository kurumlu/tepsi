import * as React from 'react';
import { FunctionComponent, ReactElement } from 'react';
import cn from 'classnames';

export type StepperSimpleProps = {
  activeStep?: number;
  dataQA?: string;
  size: number;
};

export const StepperSimple: FunctionComponent<StepperSimpleProps> = ({
  activeStep = 1,
  dataQA,
  size,
}) => {
  const listOfSteps: ReactElement[] = [];

  for (let i = 1; i < size + 1; ++i) {
    listOfSteps.push(
      <div
        className={cn('sd-m-stepper-simple__item', {
          'sd-m-stepper-simple__item--active': activeStep === i,
        })}
        key={i}
      />
    );
  }

  return (
    <div className="sd-m-stepper-simple" data-qa={dataQA}>
      {listOfSteps}
    </div>
  );
};
