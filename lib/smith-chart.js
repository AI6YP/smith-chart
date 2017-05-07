// https://jsfiddle.net/b4ycbo4p/22/

function t (x, y) {
  return `translate(${x},${y})`;
}

function genSmithChart ($) {

  function pos (re, im) {
    const alfa = Math.atan(im / re);
    const x =  re * (Math.cos(2 * alfa) - 1);
    const y = -re * Math.sin(2 * alfa);
    return [x, y];
  }

  function ReLine (props) {
    const x = props.x;
    const y = props.y;
    const r = x;
    const [x0, y0] = pos(x, y);
    const flag = (x > y) ? 1 : 0;
    return $('path', {
      d: `M ${x0},${y0} A ${r} ${r} 0 ${flag} 0 ${x0},${-y0}`
    });
  }

  function Re (props) {
    const r = props.r;
    return $('g', {
    	transform: t(2 * r, r),
      className: 'l1'
    },
    	props.lines
      .map(desc => [r / (1 + desc[0]), r / (desc[1])])
      .map(desc => $(ReLine, {x: desc[0], y: desc[1]})),
      $('circle', {
        cx: -r,
        r: r
      })
    );
  }

  function ImLine (props) {
    const y = props.y;
    const x = props.x;
    const r = props.r;
    console.log(y, r);

    const r0 = Math.abs(y);
    const r1 = props.r;
    const r2 = x * r;
    const sweep = (y > 0) ? 1 : 0;
    const [x0, y0] = pos(r2, y);
    const [x1, y1] = pos(r1, y);
    return $('path', {
      d: `M ${x0},${y0} A ${r0} ${r0} 0 0 ${sweep} ${x1},${y1}`
    });
  }

  function Im (props) {
    const r = props.r;
    return $('g', {
    	transform: t(2 * r, r),
      className: 'l1'
    },
      props.lines
      .map(desc => [r / desc[0], 1 / (1 + desc[1])])
      .map(desc => [
      	$(ImLine, {y:  desc[0], x: desc[1], r: r}),
        $(ImLine, {y: -desc[0], x: desc[1], r: r})
      ]),
      $('line', {
        x1: 0, y1: 0,
        x2: -2 * r, y2: 0,
        className: 'l1'
      })
    );
  }

  return function SmithChart(props) {
    const r = props.r;
    return $('div', {},
      $('div', {}, 'Smith Chart'),
      $('div', {},
        $('svg', {
          xmlns: 'http://www.w3.org/2000/svg',
          'xmlns:xlink': 'http://www.w3.org/1999/xlink',
        	viewBox: [0, 0, 2 * r + 1, 2 * r + 1],
          height: r + 1,
          width: r + 1
        },
          $('defs', {},
            $('style', {},
            `.l1 {
            	stroke: black;
              fill: none;
              stroke-linecap: round; /* butt; square; */
              /* stroke-opacity: 0.1; */
            }`)
          ),
          $('g', {transform: t(.5, .5)},
            $(Re, {r: r, lines: [
            	[.05, .2], [.1, 1], [.15, .2], [.2, 2],
              [.3, 1], [.4, 2],
              [.5, 1], [.6, 2],
              [.7, 1], [.8, 2], [.9, 1],
              [1, 5],
              [1.2, 2], [1.4, 2], [1.6, 2], [1.8, 2],
              [2, 5], [3, 5], [4, 5], [5, 10],
              [10, 20], [20, 20]
            ]}),
            $(Im, {r: r, lines: [
            	[.05, .2], [.1, 1], [.15, .2], [.2, 2],
              [.3, 1], [.4, 2],
              [.5, 1], [.6, 2],
              [.7, 1], [.8, 2], [.9, 1],
              [1, 10],
              [1.2, 2], [1.4, 2], [1.6, 2], [1.8, 2],
              [2, 5], [3, 5], [4, 5], [5, 10],
              [10, 20], [20, 20]
            ]})
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
