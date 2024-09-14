import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import EmployeeList from './components/EmployeeList';
import EmployeeDataAnalysisList from './components/EmployeeDataAnalysisList';

export default () => (
  <Layout>
        <Route exact path='/' component={EmployeeList} />
        <Route path='/employee-data-analysis-list' component={EmployeeDataAnalysisList} />
  </Layout>
);
