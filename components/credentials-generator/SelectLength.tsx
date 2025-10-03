import { Slider } from "@/components/ui/slider";

interface LengthProps {
    type: string;
    pwLength?: number;
    pcLength?: number;
    setPwLength?: React.Dispatch<React.SetStateAction<number>>;
    setPcLength?: React.Dispatch<React.SetStateAction<number>>;
}

export default function SelectLength({
    type,
    pwLength,
    pcLength,
    setPwLength,
    setPcLength,
}: LengthProps) {
    const sliderMaxLength = type === "password" ? 30 : 16;
    const sliderMinLength = type === "password" ? 8 : 4;

    return (
        <div className="flex gap-10">
            <Slider
                className="w-full"
                min={sliderMinLength}
                max={sliderMaxLength}
                step={1}
                defaultValue={type === "password" ? [pwLength || 8] : [pcLength || 4]}
                onValueChange={(value) => {
                    if (type === "password" && setPwLength) {
                        setPwLength(Number(value));
                    } else if (type === "code" && setPcLength) {
                        setPcLength(Number(value));
                    }
                }}
            />
            <p className="h-7 w-14 text-center bg-foreground/20 rounded-sm grid place-content-center">
                {type === "password" ? pwLength : pcLength}
            </p>
        </div>
    );
}
