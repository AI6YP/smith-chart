// https://jsfiddle.net/b4ycbo4p/6/

function genSmithChart ($) {
  return function SmithChart(props) {
    const r = props.r;
    return $('div', {},
      $('div', {}, 'Smith Chart'),
      $('div', {},
        $('svg', { viewBox: [0, 0, 2 * r + 2, 2 * r + 2] },
          $('defs', {},
            $('style', {},
            `.l1 {
            	stroke: black;
              fill: none;
              stroke-linecap: round;
              stroke-opacity: 0.1;
            }`)
          ),
          $('line', {
            x1: 1, y1: r + 1,
            x2: 2 * r + 1, y2: r + 1,
            className: 'l1'
          }),
          [0,1,2,3,4,5]
          .map(e => Math.pow(2, -e) * r)
          .map((e, i) => $('circle', {
            key: i,
            cx: 2 * r - e + 1,
            cy: r + 1,
            r: e,
            className: 'l1'
          })),
          [1]
          .map((e, i) => $('path', {
          	className: 'l1',
          	d: `M ${2 * r},${r} a ${-r} 0 0 0 0 100 100`
          })
          )
        )
      )
    );
  };
}

module.exports = genSmithChart;

// ReactDOM.render(
//   genSmithChart(React.createElement)({ r: 256 }),
//   document.getElementById('container')
// );
