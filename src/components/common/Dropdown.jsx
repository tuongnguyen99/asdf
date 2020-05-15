import React from 'react';

const Dropdown = ({ name, label, data, onChange }) => {
  return (
    <div className='form-group'>
      <label htmlFor=''>{label}</label>
      <select className=' form-control' name={name} onChange={onChange}>
        {data.map((item) => {
          return (
            <option id={item.id} key={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Dropdown;
