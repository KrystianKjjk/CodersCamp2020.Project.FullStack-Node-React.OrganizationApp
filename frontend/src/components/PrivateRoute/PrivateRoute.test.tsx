import React from 'react';
import { render} from '@testing-library/react';
import PrivateRoute from './PrivateRoute';
import {BrowserRouter as Router} from 'react-router-dom'

describe('PrivateRoute', () => {
   it('renders properly', () => {
      const DummyComponent=()=>{
         return <h2>Dummy component</h2>
      }
      const {container}=render(<Router><PrivateRoute path="/"><DummyComponent/></PrivateRoute></Router>);
      expect(container).toMatchSnapshot();
   });
});
