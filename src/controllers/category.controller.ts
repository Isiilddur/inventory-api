import categoryService from "../services/category.service";
/**
 * @author Luis Montes
 *
 */
const createCategory = async (req: any, res: any) => {
  try {
    let result = await categoryService.createCategory(req.body);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateCategory = async (req: any, res: any) => {
  try {
    let result = await categoryService.updateCategory(req.body, req.params);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteCategory = async (req: any, res: any) => {
  
     await categoryService.deleteCategory(req.params).then(result => {
      res.status(200).send(result);

    }).catch(error => {
    res.status(400).send(error);
  })
};

const listCategories = async (req: any, res: any) => {
  try {
    let result = await categoryService.listCategories();
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getCategory = async (req: any, res: any) => {
  try {
    let result = await categoryService.getCategory(req.params);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

export default {
  createCategory,
  updateCategory,
  deleteCategory,
  listCategories,
  getCategory,
};
