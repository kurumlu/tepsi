import * as React from 'react';
import { FunctionComponent } from 'react';

export type ProgressProps = {
  progress: number;
};

export const Progress: FunctionComponent<ProgressProps> = ({ progress }) => (
  <div className="as-a-progress">
    <div
      className="as-a-progress__bar"
      style={{
        width: `${progress > 100 ? 100 : progress < 0 ? 0 : progress}%`,
      }}></div>
  </div>
);
