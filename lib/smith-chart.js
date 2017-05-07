// https://jsfiddle.net/b4ycbo4p/20/

function t (x, y) {
  return `translate(${x},${y})`;
}

function genSmithChart ($) {

  function pos (re, im) {
    const sign = -Math.sign(im);
    const alfa = Math.atan(im / re);
    const x = re * (Math.cos(2 * alfa) - 1);
    const y = sign * re * Math.sin(2 * alfa);
    return [x, y];
  }

  function ReLine (props) {
    return $('circle', {
      cx: -props.r,
      r: props.r
    });
  }

  function Re (props) {
    const r = props.r;
    return $('g', {
    	transform: t(2 * r, r),
      className: 'l1'
    },
    	props.lines
      .map(x => r / (1 + x))
      .map((x, i) => $(ReLine, {r: x}))
    );
  }

  function ImLine (props) {
    const y = props.y;
    const r = props.r;
    console.log(y, r);

    const r0 = Math.abs(y);
    const r1 = props.r;
    const r2 = 0.5 * r;
    // const sign = -Math.sign(y);
    // const sweep = (y > 0) ? 1.5 : 1;
    const sweep = (y > 0) ? 1 : 0;
    // const alfa = Math.atan(r0 / r2);
    // const beta = Math.atan(r0 / r1);
    // const x0 = r2 * (Math.cos(2 * alfa) - 1);
    // const y0 = sign * r2 * Math.sin(2 * alfa);
    // const x1 = r1 * (Math.cos(2 * beta) - 1);
    // const y1 = sign * r1 * Math.sin(2 * beta);
    
    const [x0, y0] = pos(r2, r0);
    const [x1, y1] = pos(r1, r0);
/*
return $('circle', {
    	cy: -y,
      r: Math.abs(y)
    });
*/
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
      .map(y => r / y)
      .map(y => [
      	$(ImLine, {y:  y, r: r}),
        $(ImLine, {y: -y, r: r})
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
        $('svg', { viewBox: [0, 0, 2 * r + 1, 2 * r + 1] },
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
            $(Im, {r: r, lines: [.2, .5, 1, 2, 3, 4, 5, 10, 20]})
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
