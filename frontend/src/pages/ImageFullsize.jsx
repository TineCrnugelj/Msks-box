import {useParams} from "react-router-dom";

const ImageFullsize = () => {
    const { imageName } = useParams();

    console.log(process.env);

    return <img src={process.env.PUBLIC_URL + imageName} alt={imageName} />
}

export default ImageFullsize;