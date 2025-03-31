(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.smith = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

function t (x, y) {
    return `translate(${x},${y})`;
}

const grid = [
    [.05, .2], [.1, 1], [.15, .2], [.2, 2],
    [.3, 1], [.4, 2], [.5, 1], [.6, 2], [.7, 1], [.8, 2], [.9, 1],
    [1, 5], /* [1, 10] */
    [1.2, 2], [1.4, 2], [1.6, 2], [1.8, 2],
    [2, 5], [3, 5], [4, 5],
    [5, 10],
    [10, 20], [20, 20]
];

const reLabels0 = [
    .1, .2, .3, .4, .5, .6, .7, .8, .9,
    1, 1.2, 1.4, 1.6, 1.8,
    2, 3, 4, 5, 10, 20
];

function pos (re, im) {
    const alfa = 2 * Math.atan(im / re);
    const x = re * (Math.cos(alfa) - 1);
    const y = re * Math.sin(alfa);
    return [x, -y];
}

function genSmithChart ($) {

    function ReLabels (props) {
        const r = props.r;
        return $('g', {},
            props.lines
                .map(desc => {
                    return { x: -2 * r / (1 + desc), text: desc };
                })
                .map(desc => $('text', {
                    x: desc.x + 3, y: -3,
                    transform: `rotate(-90 ${desc.x} 0)`
                }, desc.text ))
        );
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
        return $('g', { className: 'l2' },
            props.lines
                .map(desc => [r / (1 + desc[0]), r / (desc[1])])
                .map(desc => $(ReLine, {x: desc[0], y: desc[1]})),
            $('circle', { cx: -r, r: r, className: 'l1' })
        );
    }

    function ImLine (props) {
        const y = props.y;
        const x = props.x;
        const r = props.r;

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
        return $('g', { className: 'l2' },
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

    /*
      data: Array
      x: function
      y: function
      r: Number
      className
    */
    function Shape (props) {
        const r = props.r;
        const data = props.data;
        const x = props.x;
        const y = props.y;
        const className = props.className;
        return $('g', { className: className },
            $('path', { d: 'M' + data.map(e => {
                const [x0, y0] = pos(r / (1 + x(e)), r / y(e));
                return [x0, y0].join(',');
            }).join(' ') })
        );
    }

    return {
        Shape: Shape,
        Grid: {
            Re: Re,
            Im: Im
        },
        ReLabels: ReLabels,
        grid: grid,
        reLabels0: reLabels0,
        SmithChart: function (props) {
            const r = props.r;
            return $('div', {},
                $('div', {}, 'Smith Chart'),
                $('div', {},
                    $('svg', {
                        xmlns: 'http://www.w3.org/2000/svg',
                        xmlnsXlink: 'http://www.w3.org/1999/xlink',
                        viewBox: [0, 0, 2 * r + 3, 2 * r + 3],
                        height: r + 3,
                        width: r + 3
                    },
                    $('defs', {},
                        $('style', {}, `
.l1 { stroke: black; fill: none; stroke-linecap: round; stroke-width: 3 }
.l2 { stroke: black; fill: none; stroke-linecap: round; }
`
                        )
                        /* butt; square; */
                        /* stroke-opacity: 0.1; */
                    ),
                    $('g', {transform: t(2 * r + 1, r + 1)},
                        $(Re, { r: r, lines: grid }),
                        $(Im, { r: r, lines: grid }),
                        $(ReLabels, { r: r, lines: reLabels0 })
                    ))
                )
            );
        }
    };
}

exports.chart = genSmithChart;

},{}]},{},[1])(1)
});
