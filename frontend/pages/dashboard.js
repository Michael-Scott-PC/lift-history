import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Layout from '../components/layout/Layout';
// import Year from '../components/calendar/react-calendar/Year';
// import YearView from '../components/calendar/my-custom-calendar/YearView';
import CustomYear from '../components/calendar/my-custom-calendar/CustomYear';

const dashboard = props => {
  return (
    <Layout>
      <div>
        <h1>Dashboard</h1>
        {/* <Year /> */}
        {/* <YearView /> */}
        <CustomYear />
      </div>
    </Layout>
  );
};

dashboard.propTypes = {};

export default dashboard;
