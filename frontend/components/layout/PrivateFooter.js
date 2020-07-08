import React, { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';

import AddExerciseModal from '../modal/AddExerciseModal';
import privateRoute from '../hocs/privateRoute';

import {
  currentDateIntl,
  currentDay,
  currentMonth,
  currentYear,
  currentyDayOfWeek,
} from '../../utils/currentDate';
import { getMonth } from '../../utils/calendarUtils';

const PrivateFooter = props => {
  const [showAddExModal, setShowAddExModal] = useState(false);
  const abbrMonth = getMonth(currentMonth);
  const abbrWeekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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
          href="/dashboard/[year]/[month]/[day]"
          as={`/dashboard/${currentYear}/${abbrMonth}/${currentDay}`}
        >
          <button className="currentDayBtn">
            <h5 className="currentDay">{currentWeekday}</h5>
            <h3>{currentDay}</h3>
          </button>
        </Link>
      </div>
      <AddExerciseModal
        showAddExModal={showAddExModal}
        setShowAddExModal={setShowAddExModal}
        dataSWR={props.dataSWR}
      />
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

export default privateRoute(PrivateFooter);
