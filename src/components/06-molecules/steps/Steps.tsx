import * as React from 'react';
import {
  FunctionComponent,
  Children,
  isValidElement,
  cloneElement,
  ReactNode,
} from 'react';
import cn from 'classnames';

export type StepsProps = {
  dataQA?: string;
};

export type StepProps = {
  title: string;
  index?: number;
  current?: boolean;
  passed?: boolean;
};

type StepsComposition = {
  Step: FunctionComponent<StepProps>;
};

const Step: StepsComposition['Step'] = ({ current, passed, index, title }) => (
  <div
    className={cn('sd-m-step', {
      'sd-m-step--active': current,
      'sd-m-step--passed': passed,
    })}>
    <div className="sd-m-step__number">{index + 1}</div>
    <div className="sd-m-step__content">{title}</div>
  </div>
);

export const Steps: FunctionComponent<StepsProps> & StepsComposition = ({
  dataQA,
  children,
}) => {
  const filteredChildren = Children.toArray(children).filter(Boolean);
  if (filteredChildren.length === 0) {
    return null;
  }

  return (
    <div className="sd-m-steps" data-qa={dataQA}>
      <div className="sd-m-steps__content">
        {filteredChildren.map(
          (child: ReactNode, index: number) =>
            isValidElement(child) &&
            cloneElement(child, {
              index,
            })
        )}
      </div>
    </div>
  );
};

Steps.Step = Step;
