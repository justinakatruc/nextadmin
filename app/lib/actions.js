"use server";
import { connectToDB } from './utils';
import { User, Product } from './models';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';
import { signIn } from '@/app/auth';

/* User Actions */
export const addUser = async (formData) => {
    const {username, email, password, phone, address, isAdmin, isActive} = Object.fromEntries(formData);

    try {
        connectToDB();

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({username, email, password: hashedPassword, phone, address, isAdmin, isActive});
        await user.save();
    }
    catch (error) {
        throw new Error("Failed to add user");
    }

    revalidatePath('/dashboard/users');
    redirect('/dashboard/users');
}

export const deleteUser = async (formData) => {
    const {id} = Object.fromEntries(formData);

    try {
        connectToDB();

        await User.findByIdAndDelete(id);
    }
    catch (error) {
        throw new Error("Failed to delete user");
    }

    revalidatePath('/dashboard/users');
}

export const updateUser = async (formData) => {
    const {id, username, email, password, phone, address, isAdmin, isActive} = Object.fromEntries(formData);

    try {
        connectToDB();
        const updateFields = {username, email, password, phone, address, isAdmin, isActive};

        Object.keys(updateFields).forEach((key) => (updateFields[key]==="" || undefined) && delete updateFields[key]);
        await User.findByIdAndUpdate(id, updateFields);
    }
    catch (error) {
        throw new Error("Failed to update user");
    }

    revalidatePath('/dashboard/users');
    redirect('/dashboard/users');
}



/* Product Actions */
export const addProduct = async (formData) => {
    const {title, desc, price, stock, color, size} = Object.fromEntries(formData);

    try {
        connectToDB();

        const product = new Product({title, desc, price, stock, color, size});
        await product.save();
    }
    catch (error) {
        throw new Error("Failed to add product");
    }

    revalidatePath('/dashboard/products');
    redirect('/dashboard/products');
}

export const deleteProduct = async (formData) => {
    const {id} = Object.fromEntries(formData);

    try {
        connectToDB();

        await Product.findByIdAndDelete(id);
    }
    catch (error) {
        throw new Error("Failed to delete product");
    }

    revalidatePath('/dashboard/products');
}

export const updateProduct = async (formData) => {
    const {id, title, desc, price, stock, color, size} = Object.fromEntries(formData);

    try {
        connectToDB();
        const updateFields = {title, desc, price, stock, color, size};

        Object.keys(updateFields).forEach((key) => (updateFields[key]==="" || undefined) && delete updateFields[key]);
        await Product.findByIdAndUpdate(id, updateFields);
    }
    catch (error) {
        throw new Error("Failed to update product");
    }

    revalidatePath('/dashboard/products');
    redirect('/dashboard/products');
}



export async function authenticate(prevState, formData) {
    const { username, password } = Object.fromEntries(formData);
    try {
        await signIn('credentials', { username, password, redirect: false });
        return "Logged in";
    } catch (error) {
        return "Wrong username or password";
    }
  }