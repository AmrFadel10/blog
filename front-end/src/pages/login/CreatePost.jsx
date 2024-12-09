import { useEffect, useState } from "react";
import "./createpost.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createPostApiCall } from "../redux/apicalls/PostApiCall";
import { useNavigate } from "react-router-dom";
import { getCategoryApiCall } from "../redux/apicalls/categoryApiCall";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { loading, isPostCreated } = useSelector((state) => state.posts);
  const navigate = useNavigate();

  const onSubmitting = (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("input title is required");
    if (category.trim() === "")
      return toast.error("input category is required");
    if (description.trim() === "")
      return toast.error("input description is required");
    if (!file) return toast.error("input file is required");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("image", file);
    dispatch(createPostApiCall(formData));
  };
  useEffect(() => {
    if (isPostCreated) {
      navigate("/");
    }
  }, [isPostCreated, navigate]);

  useEffect(() => {
    dispatch(getCategoryApiCall());
  }, []);
  return (
    <section className="login-page">
      <h3 className="title-login">Create a new post</h3>
      <form className="create-post-form" onSubmit={onSubmitting}>
        <input
          type="text"
          name="title"
          className="input-text"
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          name="category"
          id=""
          className="input-text"
          placeholder="Post category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option disabled value="">
            Select a category
          </option>
          {categories.map((category, index) => (
            <option value={category?.title} key={index}>
              {category?.title}
            </option>
          ))}
        </select>
        <textarea
          className="input-text textarea"
          rows="6"
          placeholder="Post description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <input
          type="file"
          className="input-file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <input
          type="submit"
          value={loading ? "Loading..." : "Create"}
          className="btn-input"
          disabled={loading === true}
        />
      </form>
    </section>
  );
};

export default CreatePost;
