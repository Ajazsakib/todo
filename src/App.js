import React, { useState } from 'react';
import './App.css';
import Form from './components/addTodo/Form';
import Table from './components/showData/Table';
import { userData } from './components/userData/userData';
function App() {
  const [user, setUser] = useState(userData);
  const [editValue, setEditValue] = useState(null);
  const submitForm = (newData) => {
    if (editValue) {
      const editedUser = user.map((usr) => {
        if (newData.id === usr.id) {
          usr.email = newData.email;
          usr.password = newData.password;
          usr.description = newData.description;
        }
        return usr;
      });
      setUser(editedUser);
      setEditValue(null);
    } else {
      newData.id = new Date().toLocaleTimeString();
      setUser([...user, newData]);
    }
  };

  const toggleDropdown = (index) => {
    setUser(
      user.map((u) => {
        if (u.id === index) {
          u.action = !u.action;
          return u;
        } else {
          return u;
        }
      })
    );
  };

  const deleteData = (index) => {
    const filteredData = user.filter((usr) => {
      return usr.id != index;
    });
    setUser(filteredData);
  };

  const showEdit = (user) => {
    setEditValue(user);
  };

  const expandDesc = (id) => {
    const expandsData = user.map((usr) => {
      if (id == usr.id) {
        usr.expandDesc = !usr.expandDesc;
        return usr;
      }
      return usr;
    });
    setUser(expandsData);
  };

  const togglePassword = (id) => {
    const dataWithPassword = user.map((usr) => {
      if (id == usr.id) {
        usr.showPassword = !usr.showPassword;
        return usr;
      }
      return usr;
    });
    setUser(dataWithPassword);
  };

  return (
    <div className="App">
      <Form submitForm={submitForm} editValue={editValue} />
      <Table
        user={user}
        toggleDropdown={toggleDropdown}
        deleteData={deleteData}
        showEdit={showEdit}
        expandDesc={expandDesc}
        togglePassword={togglePassword}
      />
    </div>
  );
}

export default App;
