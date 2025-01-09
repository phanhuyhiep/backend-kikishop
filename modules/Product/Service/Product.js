import Product from "../Model/Product.js";
export const getOneproduct = async (req) => {
    const getOne = await Product.findById(req.params.id)
    return getOne
}
export const getAllProduct = async () => {
    const product = await Product.find()
        .populate("categoryId")

    return product
}
export const deleteProduct = async (req) => {
    const remove = await Product.findByIdAndDelete(req.params.id)
    return remove
}
export const addProduct = async (req) => {
    const fileImages = req.files
    const listQuantityRemain = Array.from(req.body.listQuantityRemain)
    // const check = fileImages.flatMap((item) => item.path)
    const products = await Product.create({
        ...req.body,
        // images: check,
        listQuantityRemain: listQuantityRemain
    })
    return products
}
export const updateProduct = async (req) => {
    const id = req.params.id
    const fileImages = req.files
    // const check = fileImages.flatMap((item) => item.path)
    const update = await Product.updateOne({
        _id: id
    },
        {
            ...req.body,
            // images: check,
        });
    return update
}
export const searchProduct = async (req, res) => {
    const { name } = req.query;
    const searchRegex = new RegExp(name, "i");
    const products = await Product.find({ name: searchRegex });
    return products
};