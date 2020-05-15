import React from 'react';

const Table = ({ columns, data }) => {
  return (
    <table className='table table-striped'>
      <thead className='thead-dark'>
        <tr>
          {columns.map((item, index) => {
            return item.element ? (
              <th key={index}>{item.element()}</th>
            ) : (
              <th key={index}>{item.label}</th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => {
          const keys = Object.keys(row);
          return (
            <tr>
              {keys.map((key) => {
                return typeof row[key] === 'function' ? (
                  <td>{row[key]()}</td>
                ) : (
                  <td>{row[key]}</td>
                );
              })}
              {/* //<td>{row.element() || row.quantity()}</td> */}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
