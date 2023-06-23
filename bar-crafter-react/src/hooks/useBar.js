import { useContext } from "react";
import BarContext from "../context/BarProvider";

const useBar = () => {
    return useContext(BarContext)
}

export default useBar