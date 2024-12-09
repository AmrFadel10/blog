import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./post-details.css";
import AddComment from "../../components/comment/AddComment";
import { toast } from "react-toastify";
import CommentsList from "../../components/comment/CommentsList";
import swal from "sweetalert";
import UpdatePost from "./UpdatePost";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePostApiCall,
  getSinglePostApiCall,
  toggleLikePostApiCall,
  updateprofilePhotoApiCall,
} from "../redux/apicalls/PostApiCall";
import { CiHeart } from "react-icons/ci";
import { IoMdHeart } from "react-icons/io";
import { TbEdit } from "react-icons/tb";

function PostDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [like, setLike] = useState(false);
  const { post } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);
  const [updatePost, setUpdatePost] = useState(false);
  const navigate = useNavigate();
  const submitfiles = (e) => {
    e.preventDefault();
    if (!file) return toast.warn("There is no file");
    const formData = new FormData();
    formData.append("image", file);
    dispatch(updateprofilePhotoApiCall(post?._id, formData));
  };

  useEffect(() => {
    dispatch(getSinglePostApiCall(id));

    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const checkLike = post?.Likes?.find((id) => id === user?._id);
    setLike(checkLike);
  }, [post]);

  const toggleLike = () => {
    dispatch(toggleLikePostApiCall(post?._id, user._id));
    const checkLike = post.Likes.find((id) => id === user?._id);
    setLike(checkLike);
  };

  const deletePostHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deletePostApiCall(id));
        navigate("/");
      } else {
        swal("Your post is safe!");
      }
    });
  };
  return (
    <section className="details-component">
      <div className="post-details-wrapper">
        <div className="post-details-img">
          <img
            src={file ? URL.createObjectURL(file) : post?.imagePost?.url}
            alt="pic"
            className="post-img"
          />
          {user?._id === post?.user?._id && (
            <form className="flex items-center gap-2" onSubmit={submitfiles}>
              <label htmlFor="uploading" className="uploading">
                <TbEdit size={24} />
              </label>
              <input
                type="file"
                className="post-img-input"
                id="uploading"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <button
                type="submit"
                className="upload-btn bg-zinc-800 hover:bg-zinc-950 text-zinc-50 px-4 py-[6px] text-xs"
              >
                Change
              </button>
            </form>
          )}
        </div>
        <div className=" ">
          <div className="person-info">
            <img
              src={post?.user?.profilePhoto?.url}
              alt="pic"
              className="user-img"
            />
            <div className="person-info-details">
              <strong>
                <Link to={`/profile/${post?.user._id}`}>
                  {post?.user.username}
                </Link>
              </strong>
              <span>{new Date(post?.createdAt).toDateString()}</span>
            </div>
          </div>
          <h2 className="xl:text-3xl lg:text-2xl text-lg my-6 text-center">
            {post?.title}
          </h2>
          <div className="desc-person text-center text-zinc-600">
            {post?.description}
          </div>
        </div>
        <div className="edit-container">
          <div className="like">
            {user && (
              <>
                {like ? (
                  <IoMdHeart
                    size={25}
                    className="text-red-600 cursor-pointer"
                    onClick={toggleLike}
                  />
                ) : (
                  <CiHeart
                    onClick={toggleLike}
                    size={25}
                    className="text-zinc-800 cursor-pointer"
                  />
                )}
                <span> {post?.Likes?.length}</span>
              </>
            )}
          </div>
          <div className="edit-delete">
            {user?._id === post?.user?._id && (
              <>
                <i
                  className="fa-regular fa-pen-to-square delete"
                  onClick={() => setUpdatePost(true)}
                ></i>
                <i
                  className="fa-regular fa-trash-can edit"
                  onClick={deletePostHandler}
                ></i>
              </>
            )}
          </div>
        </div>
        {user && <AddComment postId={id} />}
        <CommentsList comments={post?.comments} user={user} post={post} />
        {updatePost && <UpdatePost post={post} setUpdatePost={setUpdatePost} />}
      </div>
    </section>
  );
}

export default PostDetails;
