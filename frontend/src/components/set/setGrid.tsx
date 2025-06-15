import { useEffect, useState } from "react"
import { SetInfo } from "./set-interface"

export default function SetGrid() {
    const [sets, setsSet] = useState<SetInfo[]>([])

    const fetchSets = async () => {

    };

    useEffect(() => {
        fetchSets();
    }, []);

    if (sets.length === 0) {
        return (
        <div>
            <div></div>
        </div>
    )
    }
    
    return (
        <div>
            <div></div>
        </div>
    )
}