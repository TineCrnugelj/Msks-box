import {useParams} from "react-router-dom";

const ImageFullsize = () => {
    const { imageName } = useParams();

    console.log(imageName);

    return <img src={imageName} alt={imageName} />
}

export default ImageFullsize;