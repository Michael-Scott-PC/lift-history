import React, { Fragment } from 'react';
import { connect } from 'react-redux';

const Alert = ({ alertReducer }) =>
  alertReducer !== null &&
  alertReducer.length > 0 &&
  alertReducer.map(alert => (
    <Fragment key={alert.id}>
      <div className={`alert custom-alert alert-${alert.alertType}`}>
        {alert.msg === 'An internal server error occurred'
          ? 'Your message appears to have already been sent. If you believe this to be an error, email msenochs@gmail.com'
          : alert.msg}
      </div>

      <style jsx>
        {`
          .custom-alert {
            background-color: rgba(10, 140, 1, 0.9);
            color: #fff;
            position: fixed;
            top: 50%;
            z-index: 1000;
          }
        `}
      </style>
    </Fragment>
  ));

const mapStateToProps = state => ({
  alertReducer: state.alertReducer
});

export default connect(mapStateToProps)(Alert);
