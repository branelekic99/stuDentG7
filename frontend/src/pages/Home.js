import React from 'react';
import {Carousel} from "antd";
import slika1 from "../static/images/slika1.jpg"
import slika2 from "../static/images/slika2.jpg"
import slika3 from "../static/images/slika3.jpg"
import slika4 from "../static/images/slika4.jpg"

const contentStyle = {
    height: '90vh',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};
const images = {
 image1:{
     height: '90vh',
     color: '#fff',
     lineHeight: '160px',
     textAlign: 'center',
     backgroundImage:`url(${slika1})`,
     backgroundPosition:"center",
     backgroundRepeat:"no-repeat",
     backgroundSize:"cover",
 },
    image2:{
        height: '90vh',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        backgroundImage:`url(${slika2})`,
        backgroundPosition:"center",
        backgroundRepeat:"no-repeat",
        backgroundSize:"cover",
    },
    image3:{
        height: '90vh',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        backgroundImage:`url(${slika3})`,
        backgroundPosition:"center",
        backgroundRepeat:"no-repeat",
        backgroundSize:"cover",
    },
    image4:{
        height: '90vh',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        backgroundImage:`url(${slika4})`,
        backgroundPosition:"center",
        backgroundRepeat:"no-repeat",
        backgroundSize:"cover",
    }
}
const Home = () => {
    return (
        <>
            <div className={"bl-home"}>
                <Carousel autoplay>
                    <div>
                        <div style={images.image1}>
                            <h1>StuDent</h1>
                        </div>
                    </div>
                    <div>
                        <div style={images.image2}>
                            <h1>StuDent</h1>
                        </div>
                    </div>
                    <div>
                        <div style={images.image3}>
                            <h1>StuDent</h1>
                        </div>
                    </div>
                    <div>
                        <div style={images.image4}>
                            <h1>StuDent</h1>
                        </div>
                    </div>
                </Carousel>,
            </div>
        </>
    );
};

export default Home;
