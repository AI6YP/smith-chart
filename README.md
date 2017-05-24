# Smith Chart

Stateless React component to render [Smith Chart](http://www.arrl.org/files/file/Antenna%20Book%20Supplemental%20Files/22nd%20Edition/Smith%20Chart%20Supplement%20-%20Corrected%20Jan%202012.pdf)

![result](https://rawgit.com/drom/smith-chart/master/res.svg)

## Usage

```js
const genSmithChart = require('smith-chart'),
      React = require('react'),
      ReactDOM = require('react-dom');

ReactDOM.render(
  genSmithChart(React.createElement)({ r: 512 }),
  document.getElementById('root')
);
```
