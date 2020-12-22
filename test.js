import { configure, shallow } from 'enzyme';
import App from './Client/src/components/App.jsx';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { getAllProducts } from './database/index.js'
configure({ adapter: new Adapter() });
const { db } = require('./database/index.js');

  test("App renders correctly", () => {
    shallow(<App />);
  });

  test("getAllProducts returns an array with a length of 100", done => {
    getAllProducts(function (err, results) {
      if (err) {
        console.log(err);
        done();
      }
      expect(results.length).toBe(100);
      done();
    });
  });