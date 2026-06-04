import Order from "../models/orderModel.js"
import User from "../models/userModel.js";
import Product from "../models/productModel.js"

export const createOrder = async (req, res) => {
    try {

        const { shippingInfo, orderItems, paymentInfo, taxPrice, shippingCost,
            totalPrice, orderStatus } = req.body;

        // التحقق من المخزون قبل إنشاء الطلب
        for (const item of orderItems) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found"
                });
            }
            if (product.stock < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `Cannot create order. Insufficient stock. Available: ${product.stock}, Requested: ${item.quantity}`
                });
            }
        }

        const order = await Order.create({
            shippingInfo,
            orderItems,
            paymentInfo,
            taxPrice,
            shippingCost,
            totalPrice,
            orderStatus,
            user: req.user.id,
            paidAt: Date.now()
        })

        if (!order) {
            return res.status(400).json({
                success: false,
                message: "order not created"
            })
        }

        const updatedStocks = await Promise.all(orderItems.map(item => updatestock(item.product, item.quantity)));

        return res.status(200).json({
            success: true,
            message: "order created successfully",
            order
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error: " + err.message

        })
    }
}

// get single order api from admin

export const getSingleOrder = async (req, res) => {
    try {

        const order = await Order.findById(req.params.id).populate("user", "name email")
        if (!order) {
            return res.status(400).json({
                success: false,
                message: "Order not found"
            })
        }

        return res.status(200).json({
            success: true,
            order
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error
        })
    }
}
// Get Orders who user reate them, Just he can see the orders detail 

export const myOrderDetails = async (req, res) => {
    try {
        const order = await Order.find({ user: req.user.id });

        if (!order) {
            return res.status(400).json({
                success: false,
                message: "No orders found for this user"
            })
        }

        return res.status(200).json({
            success: true,
            order
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();

        if (!orders) {
            return res.status(400).json({
                success: false,
                message: "Orders not found"
            })
        }

        let total = 0;

        orders.forEach((order) => {
            total = total + order.totalPrice
        })

        return res.status(200).json({
            success: true,
            orders,
            total
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(400).json({
                success: false,
                message: "Order not found"
            })
        }


        if (order.orderStatus === req.body.status) {
            return res.status(400).json({
                success: false,
                message: "Order already in this status"
            });
        }

        if (req.body.status === "Delivered") {
            // await Promise.all(order.orderItems.map(item =>
            //     updateStock(item.product, item.quantity)
            // ));
            return res.status(400).json({
                success: false,
                message: "This order has already been delivered"
            })
        }

        order.orderStatus = req.body.status

        await order.save();

        return res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            order
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error: " + err.message
        })
    }
};

async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    if (!product) {
        throw new Error("Product not found")
    }

    if(!quantity || quantity <= 0 ){
        throw new Error("Invalid quantity")
    }

    if (product.stock < quantity) {
        throw new Error("Insufficient stock for this product. Available: " + product.stock + ", Requested: " + quantity);
    }

    product.stock -= quantity;
    await product.save();
    return product.stock;
}

export const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(400).json({
                success: false,
                message: "Order not found"
            })
        }
        if (order.orderStatus !== "Delivered") {
            return res.status(400).json({
                success: false,
                message: "Cannot delete order that has not been delivered"
            })
        }
        await Order.deleteOne({ _id: req.params.id });//الاي دي مكتوب كذا لانه ب الداتا بيز كذا
        return res.status(200).json({
            success: true,
            message: "Order deleted successfully"
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        })
    }
}
