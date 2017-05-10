'use strict';

const genSmithChart = require('../lib/smith-chart'),
      React = require('react'),
      ReactDOM = require('react-dom');

ReactDOM.render(
  genSmithChart(React.createElement)({ r: 512 }),
  document.getElementById('root')
);
