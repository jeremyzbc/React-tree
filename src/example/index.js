import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import Tree from '../Tree';
import source from './source';

const App = () => (
  <Tree source={source} onTreeChange={tree => console.log(tree)} />
);

ReactDOM.render(<App />, document.getElementById('root'));
