/* eslint-disable @next/next/no-img-element */

"use client";

import { useState } from "react";
import Link from "next/link";
import { encodeData } from "@/hooks/link-in-bio/encoder";
import { Copy } from "@/hooks/global/copy-to-clipboard";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PublishedLink } from "@/components/link-in-bio/PublishedLink";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { MailIcon } from "lucide-react";
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

export default function LinkInBio() {
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
        const url = `${window.location.origin}/link-in-bio-preview?data=${encodeData(formValues)}`;
        Copy({ input: url || "" });
    };

    return (
        <section>
            <article className="text-center max-w-2xl mx-auto space-y-4">
                <h1 className="text-xl leading-none font-light">
                    Help people discover everything you do, with one simple link.
                </h1>
                <p>You&apos;ll never have to change the link in your bio ever again.</p>
            </article>
            <section className="w-4/5 mx-auto mt-10 border-t border-muted py-10">
                <Tabs defaultValue="PersonalInformation">
                    <div className="sticky top-16 z-10 flex justify-between items-center bg-background p-2">
                        <TabsList className="grid grid-cols-2 gap-2 h-12 w-2/3">
                            <TabsTrigger value="PersonalInformation" className="cursor-pointer h-9">
                                Personal Information
                            </TabsTrigger>
                            <TabsTrigger value="Preview" className="cursor-pointer h-9">
                                Preview
                            </TabsTrigger>
                        </TabsList>
                        <Button
                            onClick={publish}
                            disabled={
                                formValues.name && formValues.email && formValues.description
                                    ? false
                                    : true
                            }
                        >
                            Generate Link
                        </Button>
                    </div>
                    <TabsContent value="PersonalInformation">
                        <section className="mt-5">
                            <form className="my-10 space-y-10 w-full">
                                {formContents.map((obj, i) => (
                                    <fieldset key={i} className="w-full flex flex-col gap-2">
                                        <Label className="capitalize text-sm">
                                            {obj.key}
                                            <span className="ml-1 text-bold text-xs normal-case text-primary">
                                                {obj.key === "name" || obj.key === "email"
                                                    ? "( required )"
                                                    : obj.key === "description"
                                                    ? "( required ) ( max length: 200 characters )"
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
                        </section>
                    </TabsContent>
                    <TabsContent value="Preview">
                        {Object.values(formValues).every((value) => value.length < 1) ? (
                            <p className="text-center mt-10">
                                Please fill in the personal information form to view the preview
                            </p>
                        ) : (
                            <section className="flex justify-center items-center flex-col gap-4 bg-muted/15 border border-muted-foreground/10 rounded-lg py-16 w-full my-10">
                                {formValues.photo && (
                                    <img
                                        src={formValues.photo}
                                        alt="profile picture"
                                        width={50}
                                        height={50}
                                        className="rounded-full size-20"
                                    />
                                )}

                                <div className="space-y-1">
                                    <h2 className="text-md font-light capitalize">
                                        {formValues.name}
                                    </h2>
                                    {formValues.email && (
                                        <a
                                            href={`mailto:${formValues.email}`}
                                            className="opacity-60 w-fit text-sm text-center flex items-center gap-2 mx-auto hover:opacity-100"
                                        >
                                            <MailIcon size={12} />
                                            {formValues.email}
                                        </a>
                                    )}
                                </div>
                                <p className="max-w-[460px] break-words mx-auto text-center my-10">
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
                        )}
                    </TabsContent>
                </Tabs>
            </section>
        </section>
    );
}
