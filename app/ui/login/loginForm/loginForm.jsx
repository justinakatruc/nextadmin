"use client";

import { authenticate } from "@/app/lib/actions";
import styles from "./loginForm.module.css";
import { useFormState } from "react-dom";
import { useState, useEffect } from "react";

const errorString = "Wrong username or password";

const LoginForm = () => {
    const [state, formAction] = useFormState(authenticate, undefined);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (state === errorString) {
            setLoading(false);
        }
        else if (state === "Logged in") {
            setLoading(true);
            window.location.href = "/dashboard";
        }
    }, [state, loading]);

    return (
        <form action={formAction} className={styles.form}>
            <h1>Login</h1>
            <input type="text" placeholder="username" name="username" required />
            <input type="password" placeholder="password" name="password" required />
            <button type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Log in"}
            </button>
            {state===errorString && errorString}
        </form>
    );
};

export default LoginForm;
