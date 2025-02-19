"use client";

import { authenticate } from "@/app/lib/actions";
import styles from "./loginForm.module.css";
import { useFormState } from "react-dom";
import { useEffect, useTransition } from "react";

const errorString = "Wrong username or password";

const LoginForm = () => {
    const [state, formAction] = useFormState(authenticate, undefined);

    useEffect(() => {
        if (state === "Logged in") {
            window.location.href = "/dashboard";
        }
    }, [state]);

    return (
        <form action={formAction} className={styles.form}>
            <h1>Login</h1>
            <input type="text" placeholder="username" name="username" required />
            <input type="password" placeholder="password" name="password" required />
            <button type="submit">
                Log in
            </button>
            {state===errorString && errorString}
        </form>
    );
};

export default LoginForm;
