import _ from 'underscore';
import React from 'react';
import {hashHistory} from 'react-router';
import Faux from 'react-faux-dom/lib/ReactFauxDOM';
var d3 = require('d3');

import store from '../store';

export default React.createClass({
  mixins: [Faux.mixins.core, Faux.mixins.anim],
  getInitialState() {
    console.log(d3);
    return {data: []}
  },
  gotoCompleted() {
    hashHistory.push('/completed');
  },
  gotoNotCompleted() {
    hashHistory.push('/notcompleted');
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
        .on('click', (d) => {
          if (d.index === 0) {
            return this.gotoCompleted();
          } else {return this.gotoNotCompleted();}
        })
        .attr('fill', function(d) {return color(d.data)})
        .attr('class', function(d) {
          if (d.index === 0) {
            return "completed-path"
          } else {return "notcompleted-path"}
        });

    arcs.append('text')
        .attr('transform', function(d) {return 'translate(' + arc.centroid(d) + ')'})
        .attr('text-anchor', 'middle')
        .attr('class', function(d) {
          if (d.index === 0) {
            return "completed-text"
          } else {return "notcompleted-text"}
        })
        .text(function(d) {return (d.data + ' tasks');})
  },
  componentDidMount() {
    store.tasksCollection.on('update', this.getTasks);
    store.tasksCollection.fetch();
  },
  componentWillUnmount() {
    store.tasksCollection.off('update', this.getTasks);
  },
  render() {
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
