import React from 'react';

exports.ChirpItem = React.createClass({
  render: function () {
    var chirp = this.props.chirp,
        style = {
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
});
