// https://jsfiddle.net/b4ycbo4p/10/

function t (x, y) {
	return `translate(${x},${y})`;
}

function genSmithChart ($) {

  function Re (props) {
    const r = props.r;
    return $('g', {},
    	props.lines
      .map(x => r / (1 + x))
      .map((e, i) => $('circle', {
        key: i,
        cx: 2 * r - e,
        cy: r,
        r: e,
        className: 'l1'
      }))
    );
  }

  function Im (props) {
    const r = props.r;
    return $('g', {},
      props.lines
      .map(x => [
      	$('circle', {
        	key: 0,
          cx: 2 * r,
          cy: r - (r / x),
          r: (r / x),
          className: 'l1'
        }),
        $('circle', {
        	key: 1,
          cx: 2 * r,
          cy: r + (r / x),
          r: (r / x),
          className: 'l1'
        })
/* 			$('path', {
          className: 'l1',
          d: `M ${2 * r},${r} A ${r} ${r} 0 0 1 ${r},0`
        }),
        $('path', {
          className: 'l1',
          d: `M ${2 * r},${r} A ${r} ${r} 0 0 0 ${r},${2 * r}`
        }) */
      ]
      ),
      $('line', {
        x1: 0, y1: r,
        x2: 2 * r, y2: r,
        className: 'l1'
      })
    );
  }

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
              stroke-linecap: square; /* butt */
              stroke-opacity: 0.1;
            }`)
          ),
          $('g', {transform: t(.5, .5)},
            $(Re, {r: r, lines: [0, .2, .5, 1, 2, 5]}),
            $(Im, {r: r, lines: [.5, 1, 2, 5]})
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
