import * as React from 'react';
import { ChirpItem as ChirpItem } from './chirp_item';
import { Chirp } from '../../shared/chirp';

export interface Props {
  chirps: Chirp[] | 'loading';
}

export function Chirps(props: Props) {
  if (props.chirps === 'loading') {
    return <div>Loading...</div>;
  } else {
    let chirps = props.chirps.map(function (chirp, i) {
      return <ChirpItem key={i} chirp={chirp} />
    });
    return (
      <ul className='chirp-list' >{chirps}</ul>
    );
  }
}
