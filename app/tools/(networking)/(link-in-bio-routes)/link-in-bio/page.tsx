"use client";

import Link from "next/link";
import { useState } from "react";
import { encodeData } from "@/hooks/link-in-bio/encoder";
import { Copy } from "@/hooks/global/copy-to-clipboard";
import { useToast } from "@/hooks/global/use-toast";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import PublishedLink from "@/components/global/PublishedLink";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    FaInstagram,
    FaWhatsapp,
    FaFacebook,
    FaXTwitter,
    FaYoutube,
    FaLinkedinIn,
    FaTelegram,
    FaGithub,
} from "react-icons/fa6";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";

export default function LinkInBio() {
    const { toast } = useToast();

    const [formValues, setFormValues] = useState<LinkInBioValues>({
        name: "",
        email: "",
        description: "",
        photo: "",
        portfolio: "",
        facebook: "",
        twitter: "",
        linkedin: "",
        instagram: "",
        github: "",
        telegram: "",
        youtube: "",
        whatsApp: "",
    });

    const [formContents] = useState([
        { key: "photo", placeholder: "Add a photo of yourself" },
        { key: "name", placeholder: "Enter your name" },
        { key: "email", placeholder: "Enter your email" },
        { key: "description", placeholder: "Give a brief description about yourself" },
        { key: "portfolio", placeholder: "Add your personal website" },
        { key: "linkedin", placeholder: "Link your linkedin account" },
        { key: "github", placeholder: "Link your github account" },
        { key: "facebook", placeholder: "Link your facebook account" },
        { key: "twitter", placeholder: "Link your twitter account" },
        { key: "instagram", placeholder: "Link your instagram account" },
        { key: "whatsApp", placeholder: "Link your whatsApp account" },
        { key: "telegram", placeholder: "Link your telegram account" },
        { key: "youtube", placeholder: "Link your youtube account" },
    ]);

    const handleInputChange = (e: { target: { name: string; value: string } }) => {
        const { name, value } = e.target;

        setFormValues((prevState) => ({ ...prevState, [name]: value }));
    };

    const publish = () => {
        const url = `${window.location.origin}/tools/link-in-bio-preview?data=${encodeData(
            JSON.stringify(formValues)
        )}`;

        try {
            const result = Copy({ input: url });
            if (!result) {
                throw new Error("Unable to copy to clipboard");
            }
            toast({ title: "Success", description: "Copied to clipboard", duration: 1350 });
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Unable to copy to clipboard, please try again later",
                duration: 1350,
            });
        }
    };

    return (
        <section className="min-h-screen w-full py-16">
            <section className="space-y-4 max-w-2xl mx-auto text-center">
                <article className="space-y-4">
                    <h1 className="text-2xl md:text-3xl font-semibold">Consolidate Your Links.</h1>
                    <p>
                        Seamlessly manage and showcase all your important links in one place.
                        Perfect for <span className="text-primary">social media profiles</span>,{" "}
                        <span className="text-primary">bios</span> and more. Get started by
                        completing the form.
                    </p>
                </article>
            </section>
            <section className="mt-14">
                <Tabs defaultValue="PersonalInformation">
                    <TabsList className=" max-w-md grid grid-cols-2 gap-2">
                        <TabsTrigger value="PersonalInformation" className="cursor-pointer">
                            Personal Information
                        </TabsTrigger>
                        <TabsTrigger value="Preview" className="cursor-pointer">
                            Preview
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="PersonalInformation">
                        <section className="mt-5">
                            <form className="my-10 space-y-5 w-full columns-1 sm:columns-2 gap-10">
                                {formContents.map((obj, i) => (
                                    <fieldset key={i} className="w-full flex flex-col gap-2">
                                        <Label className="capitalize text-sm">
                                            {obj.key}
                                            <span className="ml-1 text-bold text-xs normal-case text-accent-foreground">
                                                {obj.key === "name" || obj.key === "email"
                                                    ? "( required * )"
                                                    : obj.key === "description"
                                                    ? "( required * ) ( max length: 200 characters )"
                                                    : obj.key === "photo"
                                                    ? "( optional, full url required )"
                                                    : "( optional )"}
                                            </span>
                                        </Label>
                                        {obj.key === "description" ? (
                                            <Textarea
                                                name={obj.key}
                                                value={formValues[obj.key]}
                                                maxLength={200}
                                                rows={4}
                                                onChange={handleInputChange}
                                                className="w-full resize-none"
                                                placeholder={obj.placeholder}
                                            />
                                        ) : (
                                            <Input
                                                name={obj.key}
                                                value={formValues[obj.key]}
                                                onChange={handleInputChange}
                                                className="w-full py-2"
                                                placeholder={obj.placeholder}
                                            />
                                        )}
                                    </fieldset>
                                ))}
                            </form>
                            <Button onClick={publish}>Generate Link</Button>
                        </section>
                    </TabsContent>
                    <TabsContent value="Preview">
                        {Object.values(formValues).every((value) => value.length < 1) ? (
                            <p className="text-center mt-10">
                                Please fill in the personal information form to view the preview
                            </p>
                        ) : (
                            ""
                        )}
                        <section className="flex flex-col justify-center items-center gap-10 py-10">
                            {formValues.photo && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={formValues.photo}
                                    alt="profile picture"
                                    width={50}
                                    height={50}
                                    className="rounded-full size-20 border-2 border-muted"
                                />
                            )}
                            <article className="flex flex-col justify-center items-center gap-10">
                                <div className="space-y-1 text-center">
                                    <h2 className="text-xl font-medium capitalize">
                                        {formValues.name}
                                    </h2>
                                    <p className="opacity-60 text-sm">{formValues.email}</p>
                                </div>
                                <p className="max-w-[460px] mx-auto text-center text-sm">
                                    {formValues.description}
                                </p>
                                {formValues.portfolio && (
                                    <Link
                                        href={formValues.portfolio}
                                        target="_blank"
                                        className="block py-2 px-4 border border-muted rounded-[8px] hover:bg-muted transition-colors duration-300"
                                    >
                                        {formValues.portfolio}
                                    </Link>
                                )}
                            </article>
                            <ul className="w-fit flex gap-2">
                                {formValues.linkedin && (
                                    <PublishedLink
                                        Icon={FaLinkedinIn}
                                        label={"Linkedin"}
                                        href={formValues.linkedin}
                                    />
                                )}
                                {formValues.github && (
                                    <PublishedLink
                                        Icon={FaGithub}
                                        label={"Github"}
                                        href={formValues.github}
                                    />
                                )}
                                {formValues.twitter && (
                                    <PublishedLink
                                        Icon={FaXTwitter}
                                        label={"X / Twitter"}
                                        href={formValues.twitter}
                                    />
                                )}
                                {formValues.instagram && (
                                    <PublishedLink
                                        Icon={FaInstagram}
                                        label={"Instagram"}
                                        href={formValues.instagram}
                                    />
                                )}
                                {formValues.youtube && (
                                    <PublishedLink
                                        Icon={FaYoutube}
                                        label={"Youtube"}
                                        href={formValues.youtube}
                                    />
                                )}
                                {formValues.facebook && (
                                    <PublishedLink
                                        Icon={FaFacebook}
                                        label={"Facebook"}
                                        href={formValues.facebook}
                                    />
                                )}
                                {formValues.whatsApp && (
                                    <PublishedLink
                                        Icon={FaWhatsapp}
                                        label={"WhatsApp"}
                                        href={`https://wa.me/${parseInt(formValues.whatsApp)}`}
                                    />
                                )}
                                {formValues.telegram && (
                                    <PublishedLink
                                        Icon={FaTelegram}
                                        label={"Telegram"}
                                        href={formValues.telegram}
                                    />
                                )}
                            </ul>
                        </section>
                    </TabsContent>
                </Tabs>
            </section>
            <Dialog defaultOpen={true}>
                <DialogContent
                    className="w-10/12 max-w-lg space-y-5 [&>button:last-child]:hidden"
                    onInteractOutside={(e) => {
                        e.preventDefault();
                    }}
                >
                    <DialogHeader className="space-y-5">
                        <DialogTitle className="text-red-700">Warning! Experimental Feature</DialogTitle>
                        <DialogDescription>
                            <span>
                                Please note that this feature is experimental and still under
                                development. As a result, we cannot guarantee the security or
                                confidentiality of the data processed through it. You can use the
                                form and the preview feature without sharing data, your data will{" "}
                                {""} <span className="font-bold underline">not be shared</span>{" "}
                                until you click the Generate Link button
                            </span>
                            <br />
                            <br />
                            <span>If you wish to continue click the consent button.</span>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="!justify-between gap-2">
                        <Button variant="secondary">
                            <Link href="/">Go Home</Link>
                        </Button>
                        <DialogClose asChild>
                            <Button className="bg-red-700">Consent</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </section>
    );
}
