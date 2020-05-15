import React from 'react';
import Form from './common/Form';
import DeviceForm from './common/DeviceForm';
const nodemailer = require('nodemailer');

class RegisForm extends Form {
  state = {
    data: {
      studentId: '',
      name: '',
      dateOfBirth: '',
      day: '',
      email: '',
      phone: '',
      id: '',
      purpose: '',
      date: '',
      session: '',
      startTime: '',
      endTime: '',
      requireSupport: '',
      devices: [],
    },
  };

  columns = [
    { name: 'deviceName', label: 'Tên thiết bị' },
    { name: 'quantity', label: 'Số lượng' },
    {
      element: () => {
        return (
          <button
            className='btn btn-success'
            onClick={
              this.getDeviceNotSelected().length !== 0
                ? this.handleAddDevice
                : null
            }
            disabled={this.getDeviceNotSelected().length === 0}
          >
            Thêm
          </button>
        );
      },
    },
  ];

  allDevices = [
    { id: 'fdsa', deviceName: 'Bảng', quantity: 0 },
    { id: 'sdaf', deviceName: 'Màn hình', quantity: 0 },
    { id: 'dsaf', deviceName: 'Loa', quantity: 0 },
    { id: 'asdf', deviceName: 'Máy Chiếu', quantity: 0 },
  ];

  getDeviceNotSelected() {
    const selectedDevices = [...this.state.data.devices];
    return this.allDevices.filter((device) => {
      return (
        selectedDevices.filter((sd) => {
          return device.id === sd.id;
        }).length === 0
      );
    });
  }

  handleDelete = (id) => {
    const data = { ...this.state.data };
    data.devices = data.devices.filter((d) => {
      return d.id !== id;
    });

    this.setState({ data });
  };

  handleAddDevice = () => {
    const data = { ...this.state.data };

    data.devices.push(this.getDeviceNotSelected()[0]);
    console.log(this.getDeviceNotSelected());

    this.setState({ data });
  };

  handleDeviceChange = ({ target }) => {
    const data = { ...this.state.data };

    data.devices = data.devices.map((device) => {
      if (device.id === target.id) {
        if (device.deviceName === target.value || target.name === 'quantity') {
          device[target.name] = target.value;
          console.log('ok');
        } else {
          device = this.allDevices.filter((d) => {
            return d.deviceName === target.value;
          })[0];
        }
        console.log(device);
      }

      return device;
    });

    this.setState({ data });
  };

  doSubmit = async (e) => {
    e.preventDefault();
    console.log('submit');

    let account = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'fira.lab.bdu@gmail.com', // generated ethereal user
        pass: 'bdulab2020', // generated ethereal password
      },
    });

    let info = transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: 'nctuong99@gmail.com', // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: '<b>Hello world?</b>',
    });

    console.log('Message sent: %s', info.messageId);
  };

  render() {
    return (
      <div>
        <div className='row'>
          <div className='col-6'>
            {this.renderInput('studentId', 'Mã số sinh viên', 'number')}
            {this.renderInput('name', 'Họ và tên')}
            {this.renderInput('dateOfBirth', 'ngày tháng năm sinh', 'date')}
          </div>
          <div className='col-6'>
            {this.renderInput('email', 'Email', 'email')}
            {this.renderInput('phone', 'Số điện thoại', 'tel')}
            {this.renderInput('id', 'Số chứng minh nhân dân', 'number')}
          </div>
        </div>
        <hr />
        {this.renderTextArea('purpose', 'Lý do sử dụng')}
        <div className='row'>
          <div className='col'>
            {this.renderInput('date', 'Ngày sử dụng', 'date')}
          </div>
          <div className='col'>
            {this.renderDropdown('session', 'Buổi', ['--', 'Sáng', 'Chiều'])}
          </div>
        </div>
        {this.renderInput('startTime', 'Thời gian bắt đầu', 'time')}
        {this.renderInput('endTime', 'Thời gian kết thúc', 'time')}
        {this.renderTextArea('requireSupport', 'Yêu cầu hỗ trợ: ')}
        <label>Thiết bị</label>
        <DeviceForm
          columns={this.columns}
          data={this.state.data.devices.map((d) => {
            return {
              element: () => {
                return (
                  <select
                    className=' form-control'
                    name='deviceName'
                    onChange={this.handleDeviceChange}
                    id={d.id}
                  >
                    {this.allDevices.map((device) => {
                      return (
                        <option
                          key={device.key}
                          selected={device.id == d.id}
                          disabled={
                            this.state.data.devices.filter((dd) => {
                              return dd.id === device.id;
                            }).length > 0
                          }
                        >
                          {device.deviceName}
                        </option>
                      );
                    })}
                  </select>
                );
              },
              quantity: () => {
                return (
                  <input
                    className='form-control'
                    name='quantity'
                    type='number'
                    value={d.quantity}
                    onChange={this.handleDeviceChange}
                    id={d.id}
                  />
                );
              },
              elements: () => {
                return (
                  <button
                    className='btn btn-danger'
                    onClick={() => {
                      this.handleDelete(d.id);
                    }}
                    onChange={this.handleDeviceChange}
                    id={d.id}
                  >
                    Xóa
                  </button>
                );
              },
            };
          })}
        />
        {this.renderSubmit('Gửi')}
      </div>
    );
  }
}

export default RegisForm;
