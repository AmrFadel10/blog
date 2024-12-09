const express = require("express");
const {
  verifyToken,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");
const {
  getAllCategoriesCtrl,
  createCategoryCtrl,
  getCategoryCtrl,
  deleteCategoriesCtrl,
  updateCategoryCtrl,
  countCategoriesCtrl,
} = require("../controllers/category_Ctrl");
const categoryRoute = express.Router();
const validIdParam = require("../middlewares/validation_Id");

// api/categories
categoryRoute
  .route("/")
  .get(getAllCategoriesCtrl)
  .post(verifyTokenAndAdmin, createCategoryCtrl);

//api/categories/count
categoryRoute.route("/count").get(verifyTokenAndAdmin, countCategoriesCtrl);

// api/categories/:id
categoryRoute
  .route("/:id")
  .delete(validIdParam, verifyTokenAndAdmin, deleteCategoriesCtrl)
  .put(validIdParam, verifyTokenAndAdmin, updateCategoryCtrl)
  .get(validIdParam, getCategoryCtrl);

module.exports = categoryRoute;
