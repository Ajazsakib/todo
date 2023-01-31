import React, { useState, useEffect } from 'react';
import './Form.css';

const Form = ({ submitForm, editValue }) => {
  const [state, setState] = useState({
    showPassword: false,
    id: new Date().toLocaleTimeString(),
    email: '',
    password: '',
    description: '',
    expandDesc: false,
    action: false,
  });

  useEffect(() => {
    if (editValue) {
      setState((prevState) => ({
        ...prevState,
        email: editValue.email,
        password: editValue.password,
        description: editValue.description,
        isEdit: true,
      }));
    }
  }, [editValue]);

  const [validate, setValidate] = useState({
    email: false,
    password: false,
    description: false,
  });

  const handlePassword = () => {
    setState((prevState) => ({
      ...prevState,
      showPassword: !state.showPassword,
    }));
  };

  const handleChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    setValidate((prevState) => ({
      ...prevState,
      [e.target.name]: false,
    }));
  };

  const handleSubmit = () => {
    console.log('state', state);

    if (state.email == '') {
      setValidate((prevState) => ({
        ...prevState,
        email: true,
      }));
    }
    if (state.password == '') {
      setValidate((prevState) => ({
        ...prevState,
        password: true,
      }));
    }
    if (state.description == '') {
      setValidate((prevState) => ({
        ...prevState,
        description: true,
      }));
    }

    if (
      state.email !== '' &&
      state.password !== '' &&
      state.description !== ''
    ) {
      submitForm(state);
    }

    setState((prevState) => ({
      ...prevState,
      email: '',
      password: '',
      description: '',
    }));
  };

  return (
    <div className="add-task-field">
      <div className="form-group">
        <label>Email</label>
        <input
          type="text"
          className="form-control"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <p className="error">{validate.email ? 'Required***' : ''}</p>
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type={state.showPassword ? 'text' : 'password'}
          className="form-control"
          name="password"
          value={state.password}
          onChange={handleChange}
        />
        <p className="error">{validate.password ? 'Required***' : ''}</p>
        <img
          className="eye"
          src={state.showPassword ? 'images/hide.png' : 'images/show.png'}
          alt="hide"
          onClick={handlePassword}
        />
      </div>
      <div className="form-group textarea">
        <label htmlFor="aboutUs">Review of W3Schools:</label>
        <textarea
          rows="4"
          cols="50"
          className="form-control"
          name="description"
          value={state.description}
          onChange={handleChange}
        ></textarea>
        <p className="error">{validate.description ? 'Required***' : ''}</p>
      </div>
      <div className="form-group btn-submit">
        <button type="button" className="btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Form;
