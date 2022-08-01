import classes from "./Dashboard.module.css";
import Card from "../UI/Card";
import FileList from "../components/Files/FileList";
import React from "react";

const Files = () => {
    return (
        <section className={classes.tasks}>
            <Card>
                <FileList />
            </Card>
        </section>
    )
}

export default Files;