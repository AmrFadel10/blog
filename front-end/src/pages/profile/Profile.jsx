import "./profile.css";
import PostsList from "../../components/posts/PostsList";
import { useEffect, useState } from "react";
import UpdateProfileModal from "./UpdateProfileModal";
import swal from "sweetalert";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteProfileApiCall,
  profileApiCall,
  profilePhotoApiCall,
} from "../redux/apicalls/ProfileApiCall";
import { logoutAuthApiCall } from "../redux/apicalls/AuthApiCall";

const Profile = () => {
  const [updateProfile, setUpdateProfile] = useState(false);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile, isLoading, isProfileDeleted } = useSelector(
    (state) => state.profile
  );
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();

  useEffect(() => {
    dispatch(profileApiCall(id));
    window.scrollTo(0, 0);
  }, [id]);
  useEffect(() => {
    if (isProfileDeleted) {
      navigate("/");
    }
  }, [navigate, isProfileDeleted]);
  // Form Submit Handler
  function formSubmitHandler(e) {
    e.preventDefault();
    if (!file) return toast.warning("there is no file!");
    const formData = new FormData();
    formData.append("image", file);
    dispatch(profilePhotoApiCall(formData));
  }

  // Delete Account Handler
  const deleteAccountHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover your account!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteProfileApiCall(profile?._id));
        dispatch(logoutAuthApiCall());
      }
    });
  };
  if (isLoading) {
    return <div className="load">Loading ...</div>;
  }

  return (
    <section className="profile">
      <div className="profile-header">
        <div className="profile-image-wrapper">
          <img
            src={
              file ? URL.createObjectURL(file) : `${profile?.profilePhoto.url}`
            }
            alt="pic"
            className="profile-image"
          />
          {user?._id === profile?._id && (
            <form onSubmit={formSubmitHandler}>
              <abbr title="choose profile photo">
                <label htmlFor="file" className=" upload-profile-photo-icon">
                  <i className="fa-solid fa-camera"></i>
                </label>
              </abbr>
              <input
                type="file"
                name="file"
                id="file"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
              <button type="submit" className="upload-profile-photo-btn">
                upload
              </button>
            </form>
          )}
        </div>
        <h1 className="profile-username">{profile?.username}</h1>
        <p className="profile-bio">{profile?.bio}</p>
        <div className="user-date-joined">
          <strong>Date Joined: </strong>
          <span>{new Date(profile?.createdAt).toDateString()}</span>
        </div>

        {user?._id === profile?._id && (
          <button
            onClick={() => setUpdateProfile(true)}
            className="profile-update-btn"
          >
            <i className="bi bi-file-person-fill"></i>
            Update Profile
          </button>
        )}
      </div>
      <div className="profile-posts-list">
        <h2 className="profile-posts-list-title">{profile?.username} Posts</h2>
        <PostsList
          posts={profile?.posts}
          username={profile?.username}
          userId={profile?._id}
        />
      </div>
      {user?._id === profile?._id && (
        <button onClick={deleteAccountHandler} className="delete-account-btn">
          Delete Your Account
        </button>
      )}

      {updateProfile && (
        <UpdateProfileModal
          setUpdateProfile={setUpdateProfile}
          profile={profile}
        />
      )}
    </section>
  );
};

export default Profile;
