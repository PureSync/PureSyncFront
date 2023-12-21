import { useEffect } from "react";
import { apiPostVisitor } from "services/VisitorService";

const Visit = () => {
    useEffect(
        () => {
            apiPostVisitor()
        },[]
    )
}

export default Visit;