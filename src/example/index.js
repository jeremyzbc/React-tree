import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import 'es6-promise/auto';
import 'isomorphic-fetch';
import Tree from '../Tree';
import source from './source';

const App = () => 
  <Tree 
    source={source} 
    selectable 
    onTreeChange={tree => console.log(tree)}
  />

ReactDOM.render(<App />, document.getElementById('root'));
