import React from "react";

import classes from "./dataPatient.module.css";


const dataPatient = props => {
    const { title, poster_path, vote_average } = props.item;

    return (
        <div
            className={classes.Container}
           
        >
           

            
        </div>
    );
};

export default dataPatient;