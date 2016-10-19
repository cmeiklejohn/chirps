let React = require('react');
let ReactDOM = require('react-dom');
var app = require('./components/app.jsx');

ReactDOM.render(
    <app.app />,
    document.getElementById('content')
);