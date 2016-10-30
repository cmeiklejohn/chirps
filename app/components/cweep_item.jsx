import React from 'react';

exports.CweepItem = React.createClass({
  render: function () {
    var cweep = this.props.cweep,
        style = {
          background: 'url(' + cweep.avatar + ')',
          backgroundSize: '52px 52px'
        };

    return (
      <li>
        <div className='avatar' style={style}></div>
        <div className='message'>{cweep.message}</div>
      </li>
    );
  }
});
