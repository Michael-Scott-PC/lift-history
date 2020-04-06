import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Layout from '../components/layout/Layout';
import YearView from '../components/calendar/my-custom-calendar/YearView';

const dashboard = props => {
  return (
    <Layout>
      <div id="dashboard-container">
        <h1>Dashboard</h1>

        <YearView />
      </div>

      <style jsx>
        {`
          #year-calendar-container {
            padding: 0.75rem;
          }
        `}
      </style>
    </Layout>
  );
};

dashboard.propTypes = {};

export default dashboard;
