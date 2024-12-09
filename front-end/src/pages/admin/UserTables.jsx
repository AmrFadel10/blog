import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import SidebarDashboard from "./SidebarDashboard";
import "./admin-table.css";
import swal from "sweetalert";
import {
  deleteProfileApiCall,
  getAllProfilesApiCall,
} from "../redux/apicalls/ProfileApiCall";
import { useDispatch, useSelector } from "react-redux";
const UserTables = () => {
  const disptach = useDispatch();
  const { profiles, isProfileDeleted } = useSelector((state) => state.profile);
  useEffect(() => {
    disptach(getAllProfilesApiCall());
  }, [isProfileDeleted]);
  const deleteOne = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this user!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        disptach(deleteProfileApiCall(id));
      }
    });
  };
  return (
    <section className="container-table-page">
      <SidebarDashboard />
      <div className="admin-table">
        <h5 className="title-header">Users</h5>
        <table className="table-container">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((item, index) => (
              <tr key={item._id}>
                <td className="number">{index + 1}</td>
                <td>
                  <div className="img-and-name">
                    <img
                      src={item.profilePhoto?.url}
                      className="tabel-img"
                      alt="piz"
                    />
                    <span>{item.username}</span>
                  </div>
                </td>
                <td>a{item.email}</td>
                <td>
                  <div className="table-btns-group">
                    <button>
                      <Link to={`/profile/${item._id}`}>View profile</Link>
                    </button>
                    <button onClick={() => deleteOne(item._id)}>
                      Delete user
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default UserTables;
