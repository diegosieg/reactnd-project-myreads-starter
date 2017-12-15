import React from 'react';
import { Pie, HorizontalBar } from 'react-chartjs-2';
import PropTypes from 'prop-types';

function Stats(props) {
  const { statsBooks } = props;

  const pagesBooksCurrently = statsBooks[0].currentlyReading
    .map(book => (book.pageCount !== undefined ? book.pageCount : 0))
    .reduce((sum, value) => sum + value, 1);

  const pagesBooksWanted = statsBooks[0].wantToRead
    .map(book => (book.pageCount !== undefined ? book.pageCount : 0))
    .reduce((sum, value) => sum + value, 1);

  const pagesBooksRead = statsBooks[0].read
    .map(book => (book.pageCount !== undefined ? book.pageCount : 0))
    .reduce((sum, value) => sum + value, 1);

  const dataBooks = {
    labels: ['Currently being read', 'To be read', 'Already read'],
    datasets: [
      {
        data: [
          statsBooks[0].currentlyReading.length,
          statsBooks[0].wantToRead.length,
          statsBooks[0].read.length,
        ],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#D93D5E', '#107CC5', '#D9A830'],
      },
    ],
  };

  const dataPages = {
    labels: ['Currently being read', 'To be read', 'Already read'],
    datasets: [
      {
        label: 'approximate number of pages',
        backgroundColor: '#36A2EB',
        borderColor: '#107CC5',
        borderWidth: 1,
        hoverBackgroundColor: '#107CC5',
        hoverBorderColor: 'rgba(255,255,255,1)',
        data: [pagesBooksCurrently, pagesBooksWanted, pagesBooksRead],
      },
    ],
  };

  return (
    <div className="shelves-stats-box">
      <h2 className="shelves-stats-title">Shelves Stats</h2>
      <div className="shelves-stats-chart">
        <h4 className="shelves-stats-chart-title">Number of pages</h4>
        <HorizontalBar data={dataPages} />
      </div>
      <div className="shelves-stats-chart">
        <h4 className="shelves-stats-chart-title">Number of books</h4>
        <Pie data={dataBooks} />
      </div>
    </div>
  );
}

Stats.propTypes = {
  statsBooks: PropTypes.array.isRequired,
};

export default Stats;
