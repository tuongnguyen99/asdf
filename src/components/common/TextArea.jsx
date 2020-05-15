import React from 'react';

const TextArea = ({ name, label, onChange }) => {
  return (
    <div className='form-group'>
      <label htmlFor={name}>{label}</label>
      <textarea
        className='form-control'
        name={name}
        id={name}
        placeholder=''
        rows='4'
        onChange={onChange}
      ></textarea>
    </div>
  );
};

export default TextArea;
