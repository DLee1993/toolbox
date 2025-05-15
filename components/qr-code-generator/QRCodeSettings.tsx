/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

type Props = {
    qrProps: { [key: string]: any };
    handleChange: Dispatch<SetStateAction<{ [key: string]: any }>>;
};

export default function QRCodeSettings({ qrProps, handleChange }: Props) {
    const buildEyeRadiusInput = (id: string) => {
        return (
            <Input
                name={id}
                type="range"
                onChange={handleChange}
                min={0}
                max={20}
                defaultValue={0}
                className="p-0 w-fit"
            />
        );
    };

    const retrievePathFile = (files: any) => {
        const file = files[0];
        if (file.type !== "image/png" && file.type !== "image/jpeg") {
            console.error("Only png and jpg/jpeg allowed.");
        } else {
            const target: any = {};
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                target.name = "logoImage";
                target.value = reader.result;
                target.logoName = file.name;
                handleChange({ target });
            };
        }
    };

    return (
        <TabsContent value="Customisation">
            <Accordion type="multiple" className="w-full py-5">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="[&[data-state=open]]:bg-muted/50 rounded-md px-2">
                        Base styling
                    </AccordionTrigger>
                    <AccordionContent className="space-y-10 py-5 px-2">
                        <div className="flex justify-between">
                            <fieldset>
                                <Label>Size</Label>
                                <Input
                                    name="size"
                                    type="range"
                                    onChange={handleChange}
                                    min={170}
                                    max={300}
                                    defaultValue={170}
                                    className="p-0 w-fit"
                                />
                            </fieldset>
                            <fieldset>
                                <Label>Padding</Label>
                                <Input
                                    name="quietZone"
                                    type="range"
                                    onChange={handleChange}
                                    min={10}
                                    max={60}
                                    defaultValue={10}
                                    className="p-0 w-fit"
                                />
                            </fieldset>
                            <fieldset className="flex flex-col gap-2">
                                <Label>Style</Label>
                                <select
                                    name="qrStyle"
                                    onChange={handleChange}
                                    className="bg-muted w-36 h-8 px-1 rounded-md"
                                >
                                    <option value="squares">squares</option>
                                    <option value="dots">dots</option>
                                    <option value="fluid">fluid</option>
                                </select>
                            </fieldset>
                        </div>
                        <div className="flex gap-10">
                            <fieldset>
                                <Label>Background color</Label>
                                <Input name="bgColor" type="color" onChange={handleChange} />
                            </fieldset>
                            <fieldset>
                                <Label>Foreground color</Label>
                                <Input name="fgColor" type="color" onChange={handleChange} />
                            </fieldset>
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className="[&[data-state=open]]:bg-muted/50 rounded-md px-2">
                        Custom Background Image
                    </AccordionTrigger>
                    <AccordionContent className="space-y-10 py-5 px-2">
                        <fieldset className="space-y-2">
                            <Label>Select an image</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                name="logoImage"
                                onChange={(e) => retrievePathFile(e.target.files)}
                                className="w-fit"
                            />
                        </fieldset>
                        <div className="flex justify-between">
                            <fieldset>
                                <Label>Image width</Label>
                                <Input
                                    name="logoWidth"
                                    type="range"
                                    onChange={handleChange}
                                    min={20}
                                    max={500}
                                    defaultValue={20}
                                    className="p-0 w-fit"
                                />
                            </fieldset>
                            <fieldset>
                                <Label>Image height</Label>
                                <Input
                                    name="logoHeight"
                                    type="range"
                                    onChange={handleChange}
                                    min={20}
                                    max={500}
                                    defaultValue={20}
                                    className="p-0 w-fit"
                                />
                            </fieldset>
                            <fieldset>
                                <Label>Image opacity</Label>
                                <Input
                                    name="logoOpacity"
                                    type="range"
                                    onChange={handleChange}
                                    min={0}
                                    max={0.4}
                                    step={0.1}
                                    defaultValue={0.4}
                                    className="p-0 w-fit"
                                />
                            </fieldset>
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger className="[&[data-state=open]]:bg-muted/50 rounded-md px-2">
                        Eye Radius
                    </AccordionTrigger>
                    <AccordionContent className="space-y-10 py-5 px-2">
                        <p>Outer Border</p>
                        <div className="flex flex-row gap-10 flex-wrap">
                            <div>
                                <p className="text-sm">Top left eye</p>
                                {buildEyeRadiusInput("eyeradius_0_outer_0")}
                                {buildEyeRadiusInput("eyeradius_0_outer_1")}
                                {buildEyeRadiusInput("eyeradius_0_outer_2")}
                                {buildEyeRadiusInput("eyeradius_0_outer_3")}
                            </div>
                            <div>
                                <p className="text-sm">Top right eye</p>
                                {buildEyeRadiusInput("eyeradius_1_outer_0")}
                                {buildEyeRadiusInput("eyeradius_1_outer_1")}
                                {buildEyeRadiusInput("eyeradius_1_outer_2")}
                                {buildEyeRadiusInput("eyeradius_1_outer_3")}
                            </div>
                            <div>
                                <p className="text-sm">Bottom left eye</p>
                                {buildEyeRadiusInput("eyeradius_2_outer_0")}
                                {buildEyeRadiusInput("eyeradius_2_outer_1")}
                                {buildEyeRadiusInput("eyeradius_2_outer_2")}
                                {buildEyeRadiusInput("eyeradius_2_outer_3")}
                            </div>
                        </div>

                        <p>Inner Border</p>
                        <div className="flex flex-row gap-10 flex-wrap">
                            <div>
                                <p className="text-sm">Top left eye</p>
                                {buildEyeRadiusInput("eyeradius_0_inner_0")}
                                {buildEyeRadiusInput("eyeradius_0_inner_1")}
                                {buildEyeRadiusInput("eyeradius_0_inner_2")}
                                {buildEyeRadiusInput("eyeradius_0_inner_3")}
                            </div>
                            <div>
                                <p className="text-sm">Top right eye</p>
                                {buildEyeRadiusInput("eyeradius_1_inner_0")}
                                {buildEyeRadiusInput("eyeradius_1_inner_1")}
                                {buildEyeRadiusInput("eyeradius_1_inner_2")}
                                {buildEyeRadiusInput("eyeradius_1_inner_3")}
                            </div>
                            <div>
                                <p className="text-sm">Bottom left eye</p>
                                {buildEyeRadiusInput("eyeradius_2_inner_0")}
                                {buildEyeRadiusInput("eyeradius_2_inner_1")}
                                {buildEyeRadiusInput("eyeradius_2_inner_2")}
                                {buildEyeRadiusInput("eyeradius_2_inner_3")}
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger className="[&[data-state=open]]:bg-muted/50 rounded-md px-2">
                        Eye Color
                    </AccordionTrigger>
                    <AccordionContent className="space-y-10 py-5 px-2">
                        <section className="space-y-5">
                            <p>Top left eye</p>
                            <div className="flex gap-10">
                                <fieldset className="flex-1">
                                    <Label>Outer</Label>
                                    <Input
                                        name="eyecolor_0_outer"
                                        type="color"
                                        defaultValue={qrProps.fgColor ?? "#000000"}
                                        onChange={handleChange}
                                    />
                                </fieldset>
                                <fieldset className="flex-1">
                                    <Label>Inner</Label>
                                    <Input
                                        name="eyecolor_0_inner"
                                        type="color"
                                        defaultValue={qrProps.fgColor ?? "#000000"}
                                        onChange={handleChange}
                                    />
                                </fieldset>
                            </div>
                        </section>
                        <section className="space-y-5">
                            <p>Top Right Eye</p>
                            <div className="flex gap-10">
                                <fieldset className="flex-1">
                                    <Label>Outer</Label>
                                    <Input
                                        name="eyecolor_1_outer"
                                        type="color"
                                        defaultValue={qrProps.fgColor ?? "#000000"}
                                        onChange={handleChange}
                                    />
                                </fieldset>
                                <fieldset className="flex-1">
                                    <Label>Inner</Label>
                                    <Input
                                        name="eyecolor_1_inner"
                                        type="color"
                                        defaultValue={qrProps.fgColor ?? "#000000"}
                                        onChange={handleChange}
                                    />
                                </fieldset>
                            </div>
                        </section>

                        <section className="space-y-5">
                            <p>Bottom Left Eye</p>
                            <div className="flex gap-10">
                                <fieldset className="flex-1">
                                    <Label>Outer</Label>
                                    <Input
                                        name="eyecolor_2_outer"
                                        type="color"
                                        defaultValue={qrProps.fgColor ?? "#000000"}
                                        onChange={handleChange}
                                    />
                                </fieldset>
                                <fieldset className="flex-1">
                                    <Label>Inner</Label>
                                    <Input
                                        name="eyecolor_2_inner"
                                        type="color"
                                        defaultValue={qrProps.fgColor ?? "#000000"}
                                        onChange={handleChange}
                                    />
                                </fieldset>
                            </div>
                        </section>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </TabsContent>
    );
}
