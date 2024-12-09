import { useEffect, useState } from "react";
import "./updatePost.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updatePostApiCall } from "../redux/apicalls/PostApiCall";
import { getCategoryApiCall } from "../../pages/redux/apicalls/categoryApiCall";

const UpdatePost = ({ post, setUpdatePost }) => {
  const [title, setTitle] = useState(post?.title);
  const [category, setCategory] = useState(post?.category);
  const [description, setDescription] = useState(post?.description);
  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const { id } = useParams();

  const submitUpdatePost = (e) => {
    e.preventDefault();
    if (title === "") return toast.error("Title is empty");
    if (category === "") return toast.error("Category is empty");
    if (description === "") return toast.error("Discription is empty");
    dispatch(updatePostApiCall(id, { title, category, description }));
    setUpdatePost(false);
  };
  useEffect(() => {
    dispatch(getCategoryApiCall());
  }, []);
  return (
    <div>
      <div className="update-post-container">
        <form className="update-post-form" onSubmit={submitUpdatePost}>
          <h3 className="header-update-post">Update post</h3>
          <abbr title="close">
            <i
              className="fa-solid fa-xmark"
              onClick={() => setUpdatePost(false)}
            ></i>
          </abbr>
          <input
            type="text"
            className="update-post-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="update-post-input"
          >
            <option value="" disabled>
              Choose one category
            </option>
            {categories.map((category, index) => (
              <option key={index} value={category?.title}>
                {category?.title}
              </option>
            ))}
          </select>
          <textarea
            className="update-post-textarea"
            rows="10"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button type="submit" className="update-post-btn">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePost;
