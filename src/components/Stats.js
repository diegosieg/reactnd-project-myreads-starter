import React from 'react';
import {Pie} from 'react-chartjs-2';
//import PropTypes from 'prop-types';

function Stats(props) {

  const {statsBooks} = props;

  const pagesBooksCurrently = statsBooks[0].currentlyReading
  .map(book => book.pageCount !== undefined ? book.pageCount : 0)
  .reduce((sum, value) => sum + value, 1);

  const pagesBooksWanted = statsBooks[0].wantToRead
  .map(book => book.pageCount !== undefined ? book.pageCount : 0)
  .reduce((sum, value) => sum + value, 1);

  const pagesBooksRead = statsBooks[0].read
  .map(book => book.pageCount !== undefined ? book.pageCount : 0)
  .reduce((sum, value) => sum + value, 1);

  const dataBooks = {
    labels: [
      'Currently reading',
      'Want to read',
      'Read'
    ],
    datasets: [{
      data: [statsBooks[0].currentlyReading.length, statsBooks[0].wantToRead.length, statsBooks[0].read.length],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56'
      ],
      hoverBackgroundColor: [
        '#D93D5E',
        '#107CC5',
        '#D9A830'
      ]
    }]
  };

  const dataPages = {
    labels: [
      'Pages currently being reading',
      'Pages to be to read',
      'Pages already read'
    ],
    datasets: [{
      data: [pagesBooksCurrently, pagesBooksWanted, pagesBooksRead],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56'
      ],
      hoverBackgroundColor: [
        '#D93D5E',
        '#107CC5',
        '#D9A830'
      ]
    }]
  };

  return (
      <div className="shelves-stats-box">
        <h2 className="shelves-stats-title">Shelves Stats</h2>
        <div className="shelves-stats-chart">
          <h4 className="shelves-stats-chart-title">Number of books</h4>
          <Pie data={dataBooks} />
        </div>
        <div className="shelves-stats-chart">
          <h4 className="shelves-stats-chart-title">Number of pages</h4>
          <Pie data={dataPages} />
        </div>
      </div>
  );


}

export default Stats