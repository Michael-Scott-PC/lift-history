import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';

import AddExerciseModal from '../modal/AddExerciseModal';
import privateRoute from '../hocs/privateRoute';

import {
  currentDateIntl,
  currentDay,
  currentMonth,
  currentYear,
  currentyDayOfWeek,
} from '../../utils/currentDate';
import {
  getMonth,
  getWeekRange,
  checkForNeighborYear,
  sanitizeDay,
} from '../../utils/calendarUtils';

import {
  setCurrentWeekRangeGlobal,
  setCurrentWeekURLGlobal,
} from '../../redux/actions/calendarActions';

const PrivateFooter = props => {
  const {
    authReducer,
    dataSWR,
    profile,
    remainingProps: { setCurrentWeekRangeGlobal, setCurrentWeekURLGlobal },
  } = props;

  const { weekRangeURL } = props.remainingProps.calendarReducer;

  const [showAddExModal, setShowAddExModal] = useState(false);
  const abbrMonth = getMonth(currentMonth);

  const abbrWeekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  // current day comes back as a number, we need to convert it to a string &
  // add a 0 before numbers 1-9 to match our routing params.
  const currentDayStr = currentDay.toString();
  const matchRouteStr =
    currentDayStr.length < 2 ? `0${currentDayStr}` : currentDayStr;

  const getWeekdayAbbr = () => {
    let result;
    const filteredDay = abbrWeekdays.filter(function (weekday, index) {
      if (index === currentyDayOfWeek) {
        return weekday;
      }
    });
    [result] = filteredDay;
    return result;
  };
  const currentWeekday = getWeekdayAbbr();

  const [urlWeekRange, setUrlWeekRange] = useState('');
  const getUrlWeekRange = validateYear => {
    let firstIndex = validateYear[0];
    let lastIndex = validateYear[validateYear.length - 1];

    let urlWeekRange = firstIndex.join('-') + '-' + lastIndex.join('-');
    setUrlWeekRange(urlWeekRange);
  };

  useEffect(() => {
    if (matchRouteStr) {
      const weekRange = getWeekRange(abbrMonth, matchRouteStr);

      const validateYear = checkForNeighborYear(abbrMonth, weekRange);
      getUrlWeekRange(validateYear);
      setCurrentWeekURLGlobal(urlWeekRange);
      setCurrentWeekRangeGlobal(validateYear);
    }
  }, [currentDay, urlWeekRange]);

  return (
    <nav>
      <div id="footer-nav">
        <Link href="/dashboard/[year]" as={`/dashboard/${currentYear}`}>
          <img src="/homeIcon.svg" id="home" alt="home icon" />
        </Link>
        <img src="/profileIcon.svg" id="profile" alt="profile icon" />
        <img
          src="/addIcon.svg"
          id="add"
          alt="add exercise icon"
          onClick={() => setShowAddExModal(true)}
        />
        <img
          src="/searchExerciseIcon.svg"
          id="search"
          alt="search exercises icon"
        />
        <Link
          href="/dashboard/[year]/[month]/[week]/[day]"
          as={`/dashboard/${currentYear}/${abbrMonth}/${weekRangeURL}/${matchRouteStr}`}
        >
          <button className="currentDayBtn">
            <h5 className="currentDay">{currentWeekday}</h5>
            <h3>{sanitizeDay(matchRouteStr)}</h3>
          </button>
        </Link>
      </div>
      {showAddExModal && (
        <AddExerciseModal
          showAddExModal={showAddExModal}
          setShowAddExModal={setShowAddExModal}
          authReducer={authReducer}
          profile={profile}
          dataSWR={dataSWR}
        />
      )}
      <style jsx>
        {`
          nav {
            position: fixed;
            bottom: 0;
            width: 100%;
          }
          #footer-nav {
            display: flex;
            justify-content: space-evenly;
            background-color: #0d0c0c;
            height: 10vh;
          }
          .currentDayBtn {
            background-color: #0d0c0c;
            color: #fff;
            border: none;
            padding-top: 0.5rem;
          }
          .currentDay {
            font-size: 1rem;
          }
        `}
      </style>
    </nav>
  );
};

PrivateFooter.propTypes = {};

const AuthenticatedFooter = privateRoute(PrivateFooter);

const mapStateToProps = state => ({
  calendarReducer: state.calendarReducer,
});

export default connect(mapStateToProps, {
  setCurrentWeekRangeGlobal,
  setCurrentWeekURLGlobal,
})(AuthenticatedFooter);
