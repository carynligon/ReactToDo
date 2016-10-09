import _ from 'underscore';
import React from 'react';
import Faux from 'react-faux-dom/lib/ReactFauxDOM';
var d3 = require('d3');

import store from '../store';

export default React.createClass({
  mixins: [Faux.mixins.core, Faux.mixins.anim],
  getInitialState() {
    console.log(d3);
    return {data: []}
  },
  getTasks() {
    let tasks = store.tasksCollection.toJSON();
    let completed = _.where(tasks, {completed: true});
    let notCompleted = _.where(tasks, {completed: false});
    this.setState({data: [completed.length, notCompleted.length]})
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
        .attr('fill', function(d) {return color(d.data)})
        .attr('class', function(d) {
          if (d.index === 0) {
            return "completed-path"
          } else {return "notcompleted-path"}
        });
  },
  componentDidMount() {
    store.tasksCollection.on('update', this.getTasks);
    store.tasksCollection.fetch();
  },
  componentWillUnmount() {
    store.tasksCollection.off('update', this.getTasks);
  },
  render() {
    console.log(this.state);
    return <div className="chart-wrapper">
      <h3>Completed vs. Not Completed Tasks</h3>
      {this.state.chart}
      <div className="chart-key">
        <div className="completed-key"><p>Completed Tasks</p></div>
        <div className="notcompleted-key"><p>Incomplete Tasks</p></div>
      </div>
    </div>
  }
});
