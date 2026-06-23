import Product from "../models/productModel.js";
import ApiFeatures from "../util/ApiFeatures.js";
import cloudinary from "../util/cloudinary.js"

export const creatProducts = async (req, res) => {
    try {

        const { title, description, price, category, stock, images: rawImages } = req.body;

        if (!rawImages || rawImages.length === 0) {
            return res.status(400).json({ success: false, message: "At least one image is required" });
        }

        const imagesArray = Array.isArray(rawImages) ? rawImages : [rawImages];


        const uploadedImages = await Promise.all(
            imagesArray.map((img) =>
                cloudinary.uploader.upload(img, { folder: "products" })
            )
        );


        const images = uploadedImages.map((result) => ({
            public_id: result.public_id,
            url: result.secure_url,
        }));

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Body is missing"
                }
            );
        }



        const product = await Product.create({
            title,
            description,
            price,
            category,
            stock,
            images,
            user: req.user._id
        });

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            product
        })

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
            stack: error.stack
        });
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const resultPerPage = 8;

        // عدد المنتجات الكلي
        const productsCount = await Product.countDocuments();

        const apiFunctionality = new ApiFeatures(
            Product.find(),
            req.query
        )
            .search()
            .filter();

        // عدد المنتجات بعد الفلترة
        const filteredProducts = await apiFunctionality.query.clone();
        const filteredProductsCount = filteredProducts.length;

        // تطبيق Pagination
        apiFunctionality.pagination();

        const products = await apiFunctionality.query;



        return res.status(200).json({
            success: true,
            products,
            productsCount,
            filteredProductsCount,
            resultPerPage,
            currentPage: Number(req.query.page) || 1,
            totalPages: Math.ceil(
                filteredProductsCount / resultPerPage
            ),
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error,
        });
    }
};

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
        console.log(error)
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
            return res.status(400).json({
                success: false,
                message: "Product not found"
            })
        }

        const { images: rawImages, ...otherFields } = req.body;

        if (rawImages && rawImages.length > 0) {
            // Delete old images from Cloudinary
            await Promise.all(
                product.images.map((img) =>
                    cloudinary.uploader.destroy(img.public_id)
                )
            );

            const imagesArray = Array.isArray(rawImages) ? rawImages : [rawImages];

            const uploadedImages = await Promise.all(
                imagesArray.map((img) =>
                    cloudinary.uploader.upload(img, { folder: "products" })
                )
            );

            otherFields.images = uploadedImages.map((result) => ({
                public_id: result.public_id,
                url: result.secure_url,
            }));
        }

        product = await Product.findByIdAndUpdate(req.params.id, otherFields, {
            new: true,
            runValidators: true
        })

        return res.status(200).json({
            success: true,
            message: "product updated successfully",
            product
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error
        })
    }
}

// export const updateProductController = async (req, res) => {
//     try {
//         let product = await Product.findById(req.params.id);

//         if (!product) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Product not found"
//             })
//         }


//         const { images: rawImages, ...otherFields } = req.body;

//         if (rawImages && rawImages.length > 0) {

//              console.log("Before delete old images");
//             // Delete old images from Cloudinary
//             await Promise.all(
//                 product.images.map((img) =>
//                     cloudinary.uploader.destroy(img.public_id)
//                 )
//             );


//             const imagesArray = Array.isArray(rawImages) ? rawImages : [rawImages];

//             console.log("Before upload");

//             const uploadedImages = [];

//             for (const img of imagesArray) {
//                 console.log("Uploading image...");

//                 const result = await cloudinary.uploader.upload(img, {
//                     folder: "products",
//                 });

//                 console.log("Uploaded:", result.public_id);

//                 uploadedImages.push(result);
//             }

//             console.log("After upload");

//             otherFields.images = uploadedImages.map((result) => ({
//                 public_id: result.public_id,
//                 url: result.secure_url,
//             }));
//         }

//         product = await Product.findByIdAndUpdate(req.params.id, otherFields, {
//             new: true,
//             runValidators: true
//         })

//         return res.status(200).json({
//             success: true,
//             message: "Product updated successfuly",
//             product
//         })

//     } catch (error) {
//         console.log("ERROR:", error.message);

//         if (error.response) {
//             console.log(error.response.data);
//         }
//         return res.status(500).json({
//             success: false,
//             error
//         })
//     }
// }

export const deleteProductController = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        // Delete images from Cloudinary
        await Promise.all(
            product.images.map((img) =>
                cloudinary.uploader.destroy(img.public_id)
            )
        );


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
