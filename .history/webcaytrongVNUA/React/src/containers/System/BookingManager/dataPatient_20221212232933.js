import React from "react";

import classes from "./dataPatient.module.css";


const dataPatient = props => {
    const { title, poster_path, vote_average } = props.item;

    return (
        <div
            className={classes.Container}
           
        >
           

            {/* <div className={classes.Bottom}>
                <h3 className={classes.Title}>{truncStr(title, 19)}</h3>
            </div> */}
        </div>
    );
};

export default dataPatient;