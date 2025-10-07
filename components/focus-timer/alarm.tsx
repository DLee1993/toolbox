// import { NotifyUser } from "@/lib/global/NotifyUser";
// import { BellRing } from "lucide-react";

import { useState } from "react";

export default function Alarm() {
    const [alert, setAlert] = useState(false);

    const reset = () => {
        setAlert(false);
    };

    return (
        <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-lg h-96 bg-accent rounded-md ${
                alert ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
        >
            alarm
        </div>
    );
}

//             NotifyUser({
//                 message: time / 60 >= 60 ? "You should take a break." : "Don't lose focus.",
//                 type: "Time's up",
//                 duration: 5000,
//             });
