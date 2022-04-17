import * as React from 'react';
import { FunctionComponent } from 'react';

export const PlaceholderTile: FunctionComponent = () => (
  <div className="as-m-product-tile">
    <svg
      style={{ width: '100%', height: 'auto' }}
      preserveAspectRatio="none"
      role="img"
      viewBox="0 0 316 620">
      <path fill="#fff" d="M-1-1h1002v1002H-1z" />
      <g fill="#f3f3f3">
        <rect width="316" height="474" rx="5" ry="5" />
        <rect width="186" height="20" y="480" rx="0" ry="0" />
        <circle cx="6" cy="536" r="6" />
        <circle cx="22" cy="536" r="6" />
        <circle cx="38" cy="536" r="6" />
        <circle cx="54" cy="536" r="6" />
        <circle cx="70" cy="536" r="6" />
        <rect width="53" height="14" y="556" rx="0" ry="0" />
        <rect width="147" height="16" y="586" rx="0" ry="0" />
      </g>
    </svg>
  </div>
);
