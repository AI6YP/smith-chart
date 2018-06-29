'use strict';

const genSmithChart = require('../')
    , data = require('../lib/adf4007.js')
    , withParentSize = require('@vx/responsive').withParentSize
    , React = require('react')
    , ReactDOM = require('react-dom');

const $ = React.createElement;

const SC = genSmithChart.chart($);

// grid -> Grid
// axis -> Axis


const margin = { bottom: 40, top: 40, left: 40, right: 40 };

const Demo1 = (config) => {
    const size = Math.ceil(Math.min(config.parentWidth, config.parentHeight));
    const r = (size - margin.left - margin.right) / 2;

    return (
        $('svg', {width: size, height: size},
            $('defs', {},
                $('style', {}, `
.l1 { stroke: black; fill: none; stroke-linecap: round; stroke-width: 3 }
.l2 { stroke: black; fill: none; stroke-linecap: round; }
.trace { stroke: #cd0000; fill: none; stroke-linecap: round; stroke-width: 5 }
`
                )
            ),
            $('rect', {
                x: 0, y: 0,
                width: size, height: size,
                fill: '#fffad9',
                rx: 8
            }),
            $('g', {transform: `translate(${ size - margin.left },${ size / 2 })`},
                $(SC.Grid.Re, {r: r, lines: SC.grid }),
                $(SC.Grid.Im, {r: r, lines: SC.grid }),
                $(SC.ReLabels, { r: r, lines: SC.reLabels0 }),
                $(SC.Shape, {
                    r: r,
                    data: data,
                    className: 'trace',
                    x: e => e[0],
                    y: e => e[1]
                })
            )
        )
    );
};

const Demo = withParentSize(Demo1);

ReactDOM.render($(Demo, {}), document.getElementById('root'));
