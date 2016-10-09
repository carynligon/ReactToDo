import React from 'react';
import Faux from 'react-faux-dom/lib/ReactFauxDOM';
var d3 = require('d3');

export default React.createClass({
  mixins: [Faux.mixins.core, Faux.mixins.anim],
  getInitialState: function () {
    console.log(d3);
    return {data: [14,74]}
  },
  render: function () {
    return <div className="chart-wrapper">
      <h3>Completed vs. Not Completed Taskss</h3>
      {this.state.chart}
    </div>
  },
  componentDidMount: function () {
    let faux = this.connectFauxDOM('div', 'chart');
    let r = 200;

    let color = d3.scaleOrdinal()
        .range(['#08415C', '#168BBD'])

    let svg = d3.select(faux).append('svg')
        .attr('class', 'water-bar')
        .attr('width', 500)
        .attr('height', 500);

    let group = svg.append('g')
        .attr('transform', 'translate(250, 250)');

    let arc = d3.arc()
        .innerRadius(100)
        .outerRadius(r);

    let pie = d3.pie()
        .value(function(d) {return d;});

    let arcs = group.selectAll('arc')
        .data(pie(this.state.data))
        .enter()
        .append('g')
        .attr('class', 'arc');

    arcs.append('path')
        .attr('d', arc)
        .attr('fill', function(d) {console.log(d);return color(d.data)});


  }
});
