import React from 'react';

export default function ship(props) {
  return (
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 48 48" xmlSpace="preserve" width={48} height={48} {...props}>
      <g className="nc-icon-wrapper">
        <path fill="#A67C52" d="M42,10H6c-0.552,0-1,0.448-1,1v31c0,1.105,0.895,2,2,2h34c1.105,0,2-0.895,2-2V11C43,10.448,42.552,10,42,10 z" />
        <path fill="#C19F85" d="M45,4H3C1.895,4,1,4.895,1,6v6c0,1.105,0.895,2,2,2h42c1.105,0,2-0.895,2-2V6C47,4.895,46.105,4,45,4z" />
        <polygon fill="#D1B43D" points="30,14 30,31 24,28 18,31 18,14 " />
        <rect x={16} y={4} fill="#EFD358" width={16} height={10} />
      </g>
    </svg>
  );
}
