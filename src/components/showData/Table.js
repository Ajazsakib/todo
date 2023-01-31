import React, { useState } from 'react';
import './Table.css';

const Table = ({
  user,
  toggleDropdown,
  deleteData,
  showEdit,
  expandDesc,
  togglePassword,
}) => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const [readMore, setReadMore] = useState(false);

  const [deleteId, setDeleteId] = useState(null);
  const handleDropdown = (index) => {
    toggleDropdown(index);
  };

  const handleDelete = (id) => {
    setShowDeletePopup(true);
    setDeleteId(id);
  };

  const confirmDelete = () => {
    deleteData(deleteId);
    setShowDeletePopup(false);
  };

  const handleEdit = (user) => {
    showEdit(user);
  };

  const handleDescription = (id) => {
    expandDesc(id);
  };

  return (
    <>
      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Email</th>
              <th>Password</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {user &&
              user.map((user) => {
                return (
                  <tr>
                    <td>{user.id}</td>
                    <td>{user.email}</td>
                    <td>
                      <div className="d-flex space-between">
                        <p>
                          {user.showPassword ? user.password : '************'}
                        </p>
                        <img
                          src="images/show.png"
                          alt="show"
                          className="eye"
                          onClick={() => {
                            togglePassword(user.id);
                          }}
                        />
                      </div>
                    </td>
                    <td>
                      {user.description.length <= 30 ? (
                        <p>{user.description}</p>
                      ) : (
                        <p>
                          {user.expandDesc
                            ? user.description
                            : user.description.slice(0, 30)}
                          <button
                            onClick={() => {
                              handleDescription(user.id);
                            }}
                            className="btn-expand"
                          >
                            {user.expandDesc ? 'Read Less...' : 'Read More...'}
                          </button>
                        </p>
                      )}
                    </td>
                    <td>
                      <div
                        className="dots"
                        onClick={(e) => {
                          handleDropdown(user.id);
                        }}
                      >
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                        {user.action && (
                          <div className="dropdown">
                            <div
                              className="edit"
                              onClick={() => {
                                handleEdit(user);
                              }}
                            >
                              <img src="images/edit.png" alt="edit" /> Edit
                            </div>
                            <div
                              className="delete"
                              onClick={() => {
                                handleDelete(user.id);
                              }}
                            >
                              <img src="images/delete.png" alt="delete" />{' '}
                              Delete
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      {showDeletePopup && (
        <div className="delete-popup">
          <div className="delete-popup-box">
            <p>Are you sure !!!!</p>
            <div className="left">
              <button
                className="cancel btn-cancel"
                onClick={() => {
                  setShowDeletePopup(false);
                }}
              >
                Cancel
              </button>
              <button className="confirm btn-confirm" onClick={confirmDelete}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Table;
