import * as React from 'react';
import {Chirp} from '../../shared/chirp'

export interface Props {
  chirp: Chirp
}

export function ChirpItem(props: Props) {
  let chirp = props.chirp;
  let style = {
    background: 'url(' + chirp.avatar + ')',
    backgroundSize: '52px 52px'
  };

  return (
    <li>
      <div className='avatar' style={style}></div>
      <div className='message'>{chirp.message}</div>
    </li>
  );
}

