import { Product, User } from "./models";
import { connectToDB } from "./utils";



/* User Fetching */
export const fetchUsers = async (q, page) => {
    const regex = new RegExp(q, "i");

    const ITEMS_PER_PAGE = 2;

    try {
        connectToDB();
        const count = await User.find({username:{$regex:regex}})
                                .countDocuments();
        const users = await User.find({username:{$regex:regex}})
                                .limit(ITEMS_PER_PAGE)
                                .skip((page-1)*ITEMS_PER_PAGE);
        return {count, users};
    }
    catch (error) {
        throw new Error("Failed to fetch users");
    }
}

export const fetchUser = async (id) => {

    try {
        connectToDB();
        const user = await User.findById(id);
        return user;
    }
    catch (error) {
        throw new Error("Failed to fetch user");
    }
}



/* Product Fetching */
export const fetchProducts = async (q, page) => {
    const regex = new RegExp(q, "i");

    const ITEMS_PER_PAGE = 2;

    try {
        connectToDB();
        const count = await Product.find({title:{$regex:regex}})
                                   .countDocuments();
        const products = await Product.find({title:{$regex:regex}})
                                      .limit(ITEMS_PER_PAGE)
                                      .skip((page-1)*ITEMS_PER_PAGE);
        return {count, products};
    }
    catch (error) {
        throw new Error("Failed to fetch products");
    }
}

export const fetchProduct = async (id) => {

    try {
        connectToDB();
        const product = await Product.findById(id);
        return product;
    }
    catch (error) {
        throw new Error("Failed to fetch product");
    }
}
