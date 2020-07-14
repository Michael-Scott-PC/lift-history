import React from 'react';
import PropTypes from 'prop-types';

import YearView from '../../../components/calendar/my-custom-calendar/YearView';
import privateRoute from '../../../components/hocs/privateRoute';

const dashboard = props => {
  // console.log('dashboard props: ', props);
  const { profile } = props;

  return (
    <>
      <YearView profile={profile} />

      <style jsx>
        {`
          #dashboard-container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            margin-top: 1rem;
          }
          .dashboard-buttons {
            text-align: center;
          }
          .btn {
            width: 85%;
            color: #fff;
            background-color: #758698;
            box-shadow: 5px 5px 5px black;
            box-shadow: 0px 2px 11px #8e8e8e;
          }
          }
          #year-calendar-container {
            padding: 0.75rem;
          }
        `}
      </style>
    </>
  );
};

dashboard.propTypes = {};

export default privateRoute(dashboard, 'dashboard');
