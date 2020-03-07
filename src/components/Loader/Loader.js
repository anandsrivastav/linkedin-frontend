import { ClipLoader } from "react-spinners";
import React, { Component } from 'react';

const Loader = (props) => {
    return(
        <div className="sweet-loading">
            <ClipLoader
              className="loader"
              size={150}
              color={"#123abc"}
              loading={props.loading}
        />
      </div>
    )
}

export default Loader;