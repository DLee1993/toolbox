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
    const sliderLength = type === "password" ? 30 : 16;

    return (
        <div className="flex gap-10">
            <Slider
                className="w-full"
                min={0}
                max={sliderLength}
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
            <p className="w-14 text-center text-background bg-background/10 rounded-sm">
                {type === "password" ? pwLength : pcLength}
            </p>
        </div>
    );

    // <Select
    //     defaultValue={type === "password" ? pwLength?.toString() : pcLength?.toString()}

    // >
    //     <SelectTrigger className="w-16 capitalize">
    //         <SelectValue placeholder={`${type} Length`} />
    //     </SelectTrigger>
    //     <SelectContent className="h-80">
    //         <SelectGroup>
    //             <SelectLabel>Select Length Required</SelectLabel>
    //             {type === "password"
    //                 ? pwLengthOptions.map((option, i) => (
    //                       <SelectItem key={i} value={option.toString()}>
    //                           {option}
    //                       </SelectItem>
    //                   ))
    //                 : pcLengthOptions.map((option, i) => (
    //                       <SelectItem key={i} value={option.toString()}>
    //                           {option}
    //                       </SelectItem>
    //                   ))}
    //         </SelectGroup>
    //     </SelectContent>
    // </Select>
}
