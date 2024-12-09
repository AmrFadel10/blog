const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

const {
  createCatgeoryValid,
  updateCatgeoryValid,
} = require("../utils/validator/category_valid");
const Category = require("../models/category_model");

/**-------------------------------------------------------------------------------------
 * @desc    create category
 * @route   /api/categories/
 * @method  POST
 * @access  private (Only Admin)
----------------------------------------------------------------------------------------*/
exports.createCategoryCtrl = asyncHandler(async (req, res) => {
  const { error } = createCatgeoryValid(req.body);
  if (error) {
    throw new ApiError(error.details[0].message, 400);
  }
  const catgeory = await Category.create({
    title: req.body.title,
    user: req.user.id,
  });
  res.status(201).json(catgeory);
});

/**-------------------------------------------------------------------------------------
 * @desc    get all categories
 * @route   /api/categories/
 * @method  GET
 * @access  public 
----------------------------------------------------------------------------------------*/
exports.getAllCategoriesCtrl = asyncHandler(async (req, res) => {
  const catgeories = await Category.find();
  res.status(200).json(catgeories);
});

/**-------------------------------------------------------------------------------------
 * @desc    get category
 * @route   /api/categories/:id
 * @method  GET
 * @access  public 
----------------------------------------------------------------------------------------*/
exports.getCategoryCtrl = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    throw new ApiError("Invalid category id", 400);
  }
  res.status(200).json(category);
});

/**-------------------------------------------------------------------------------------
 * @desc    update category
 * @route   /api/categories/:id
 * @method  PUT
 * @access  private (Only Admin) 
----------------------------------------------------------------------------------------*/
exports.updateCategoryCtrl = asyncHandler(async (req, res) => {
  const { error } = updateCatgeoryValid(req.body);
  if (error) {
    throw new ApiError(error.details[0].message, 400);
  }
  let category = await Category.findByIdAnd(req.params.id);
  if (!category) {
    throw new ApiError("Invalid category id", 400);
  }
  category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
    },
    { new: true }
  );
  res.status(200).json(category);
});
/**-------------------------------------------------------------------------------------
 * @desc    delete category
 * @route   /api/categories/:id
 * @method  DELETE
 * @access  private (Only Admin) 
----------------------------------------------------------------------------------------*/
exports.deleteCategoriesCtrl = asyncHandler(async (req, res) => {
  let category = await Category.findByIdAndDelete(req.params.id);
  if (!category) {
    throw new ApiError("Invalid category id", 400);
  }
  category = await Category.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "category has been deleted successfully" });
});

/**-------------------------------------------------------------------------------------
 * @desc    count category
 * @route   /api/categories/count
 * @method  GET
 * @access  private (Only Admin) 
----------------------------------------------------------------------------------------*/
exports.countCategoriesCtrl = asyncHandler(async (req, res) => {
  let category = await Category.count();

  res.status(200).json({ category });
});
