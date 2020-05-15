import React, { Component } from 'react';
import Input from './Input';
import TextArea from './TextArea';
import Dropdown from './Dropdown';
import DeviceForm from './DeviceForm';

class Form extends Component {
  state = {
    data: {},
    error: {},
  };

  handleInputChange = ({ target }) => {
    let data = { ...this.state.data };
    data[target.name] = target.value;
    this.setState({ data });
  };

  renderInput(name, label, type = 'text', placeholder = '') {
    return (
      <Input
        name={name}
        label={label}
        placeholder={placeholder}
        type={type}
        value={this.state.data[name]}
        onChange={this.handleInputChange}
      />
    );
  }

  renderTextArea(name, label) {
    return (
      <TextArea name={name} label={label} onChange={this.handleInputChange} />
    );
  }

  renderDropdown(name, label, data) {
    return (
      <Dropdown
        name={name}
        label={label}
        data={data}
        onChange={this.handleInputChange}
      />
    );
  }

  renderSubmit(label) {
    return (
      <button
        type='submit'
        className='btn btn-primary btn-block'
        onClick={this.doSubmit}
      >
        {label}
      </button>
    );
  }

  renderDeviceForm() {
    return <DeviceForm columns={this.columns} devicesData={this.devicesData} />;
  }
}

export default Form;
