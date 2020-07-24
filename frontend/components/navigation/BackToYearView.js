import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

const BackToYearView = ({ year }) => {
  return (
    <div className="back-to-year-view-container">
      <Link href="/dashboard/[year]" as={`/dashboard/${year}`}>
        <a className="back-to-year-view">&lt;&lt; {year}</a>
      </Link>
      <h1 className="year">{year}</h1>
      <style jsx>{`
        .back-to-year-view-container {
          display: grid;
          width: 100%;
          grid-template-columns: repeat(7, 1fr);
          margin-top: 2rem;
        }
        .back-to-year-view {
          position: absolute;
          width: 25%;
          text-align: center;
          margin-top: 0.55rem;
        }
        .year {
          color: red;
          grid-column-start: 1;
          grid-column-end: 8;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

BackToYearView.propTypes = {
  year: PropTypes.string.isRequired,
};

export default BackToYearView;
