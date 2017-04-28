// https://jsfiddle.net/b4ycbo4p/3/

function genSmithChart ($) {
	return function SmithChart(props) {
    const r = props.r;
    return $('div', {},
      $('div', {}, 'Smith Chart'),
      $('div', {},
        $('svg', { viewBox: [0, 0, 2 * r + 2, 2 * r + 2] },
          $('defs', {},
            $('style', {}, ' .l1 { stroke: black; fill: none; }'
            )
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
            }))
        )
      )
    );
  };
}

module.exports = genSmithChart;
