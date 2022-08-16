import classes from "./Dashboard.module.css";
import Card from "../UI/Card";
import FileList from "../components/files/FileList";
import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const Files = () => {
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate()]);

    return (
        <section className={classes.tasks}>
            <Card>
                <FileList />
            </Card>
        </section>
    )
}

export default Files;