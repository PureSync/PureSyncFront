import { useEffect } from "react";
import axios from "axios";

const Visit = () => {
    useEffect(
        () => {
            axios.post('http://localhost:9000/api/visitor')
            .then((res) => console.log(res))
            .catch((res) => console.log(res))
        },[]
    )
}

export default Visit;