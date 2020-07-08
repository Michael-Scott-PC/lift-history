// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { v4 as uuidv4 } from 'uuid';

// import CurrentWeekNav from '../../navigation/CurrentWeekNav';

// import { getWeekRange, renderWeekHelper } from '../../../utils/calendarUtils';
// import { currentYear } from '../../../utils/currentDate';
// import ExercisesForDay from '../../exercise/ExercisesForDay';

// const DayView = ({
//   selectedMonth,
//   monthHeader,
//   fullMonthName,
//   day,
//   profile,
//   program,
//   setDay,
// }) => {
//   const [show, setShow] = useState(false);
//   const [currentWeek, setCurrentWeek] = useState([]);

//   useEffect(() => {
//     if (day) {
//       setShow(true);
//       const weekRange = getWeekRange(monthHeader, day);
//       setCurrentWeek(weekRange);
//     }
//   }, [day]);

//   return (
//     <div id="day-view-container" style={{ display: show ? 'grid' : 'none' }}>
//       <h5 className="day-view-month-header" key={uuidv4()}>
//         {fullMonthName}
//         <div className="day-header">
//           {day}, {currentYear}
//         </div>
//       </h5>
//       <CurrentWeekNav
//         fullMonthName={fullMonthName}
//         currentYear={currentYear}
//         currentWeek={currentWeek}
//         day={day}
//         setDay={setDay}
//       />
//       <ExercisesForDay
//         day={day}
//         program={program}
//         selectedMonth={selectedMonth}
//       />
//       <style jsx>
//         {`
//           #day-view-container {
//             width: 100%;
//             grid-template-columns: repeat(7, 1fr);
//           }
//           .day-view-month-header {
//             grid-column-start: 1;
//             grid-column-end: 8;
//             text-align: center;
//           }
//           .day-header {
//             display: inline;
//             margin-left: 0.5rem;
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// DayView.propTypes = {};

// export default DayView;
