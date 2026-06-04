import Product from "../models/productModel.js";
import ApiFeatures from "../util/ApiFeatures.js";

export const creatProducts = async (req, res) => {
    try {

        console.log("im here");

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Body is missing"
                }
            );
        }

        const product = await Product.create(req.body)

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            product
        })

    } catch (error) {
        console.log(error); // مهم
        return res.status(500).json({
            success: false,
            message: error.message,
            stack: error.stack
        });
    }
}

export const getAllProducts = async (req, res) => {
    try {
        // const products = await Product.find()

        const apiFunctionality = new ApiFeatures(Product.find(), req.query).search().filter().pagination()
        const products = await apiFunctionality.query

        if (!products) {
            return res.status(404).json({
                success: false,
                message: "product not found"
            })
        }

        return res.status(200).json({
            success: true,
            products
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error
        })
    }
}

export const getProductDetail = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        return res.status(200).json({
            success: true,
            product
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error
        })
    }
}

export const updateProductController = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        return res.status(200).json({
            success: true,
            message: "Product updated successfuly",
            product
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error
        })
    }
}

export const deleteProductController = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        product = await Product.findByIdAndDelete(req.params.id)

        return res.status(200).json({
            success: true,
            message: "Product deleted successfuly",
            product
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error
        })
    }
}


//status
// 200 => success
// 300 => warning
// 400 => humen errors
// 500 => server errors
