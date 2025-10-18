// import { Play, Pause, RotateCcw, Settings2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Pause, Play, RotateCcw } from "lucide-react";

type Props = {
    remaining: number;
    running: boolean;
    start: () => void;
    pause: () => void;
    reset: () => void;
};

export default function Timer({ start, pause, reset, remaining, running }: Props) {
    return (
        <section className="space-y-10 flex flex-col justify-center items-center">
            <div>
                <div className="flex justify-center items-center">
                    <p className="relative z-10 text-8xl sm:text-9xl md:text-[150px] 2xl:text-[200px] w-full text-center font-medium font-mono">
                        {Math.floor(remaining / 60)
                            .toString()
                            .padStart(2, "0")}
                        :{(remaining % 60).toString().padStart(2, "0")}
                    </p>
                </div>
            </div>
            <section className="w-full flex justify-between items-center min-h-14 border-t border-border gap-1">
                <Button onClick={start} disabled={running} className="w-1/3 rounded-sm">
                    <span>Start</span>
                    <Play size={15} />
                </Button>
                <Button onClick={pause} disabled={!running} className="w-1/3 rounded-sm">
                    <span>Pause</span>
                    <Pause size={15} />
                </Button>
                <Button onClick={reset} className="w-1/3 rounded-sm">
                    <span>Restart</span>
                    <RotateCcw size={15} />
                </Button>
            </section>
        </section>
    );
}
