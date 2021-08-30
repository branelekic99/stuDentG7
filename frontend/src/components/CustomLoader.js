import React from 'react';
import Loader from "react-loader-spinner";

const CustomLoader = () => {
    return (
        <div style={{display:"flex",alignItems:"center",justifyContent :"center",flex:1,height:"100vh"}}>
            <Loader type="ThreeDots"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    visible={true}/>
        </div>
    );
};

export default CustomLoader;
