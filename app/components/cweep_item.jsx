/** @jsx React.DOM */

var CweepItem = React.createClass({
  render: function () {
    var cweep = this.props.cweep,
        style = {
          background: 'url(' + cweep.avatar + ')',
          backgroundSize: '40px 40px'
        };

    return (
      <li>
        <div className='avatar' style={style}></div>
        <div className='message'>{cweep.message}</div>
      </li>
    );
  }
});
