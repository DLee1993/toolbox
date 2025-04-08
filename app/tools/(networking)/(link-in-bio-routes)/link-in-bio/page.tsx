"use client";

import Link from "next/link";
import { useState } from "react";
import { publish } from "@/lib/link-in-bio/publish";
import { useToast } from "@/lib/global/use-toast";

import PublishedLink from "@/components/global/PublishedLink";
import FeatureWarning from "@/components/global/FeatureWarning";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
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

    const handleClearForm = () => {
        Object.keys(formValues).forEach((key) => {
            formValues[key] = "";
        });
        toast({ title: "FYI", description: "Form cleared", duration: 1350 });
    };

    const Publish = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        const publishResult = publish(formValues);

        if (publishResult) {
            toast({ title: "Success", description: "Copied to clipboard", duration: 1350 });
        } else {
            toast({
                title: "Error",
                description: "Unable to copy to clipboard, please try again later",
                duration: 1350,
            });
        }
    };

    return (
        <section className="min-h-screen w-full py-16">
            <FeatureWarning />
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
                            <form className="my-10 space-y-5 w-full columns-1 sm:columns-2">
                                {formContents.map((obj, i) => (
                                    <fieldset
                                        key={`Form field-${obj.key}-${i}`}
                                        className="relative"
                                    >
                                        {obj.key === "description" ? (
                                            <Textarea
                                                name={obj.key}
                                                id={obj.key}
                                                value={formValues[obj.key]}
                                                maxLength={200}
                                                rows={4}
                                                onChange={handleInputChange}
                                                className="resize-none formField peer"
                                                placeholder=" "
                                            />
                                        ) : (
                                            <Input
                                                name={obj.key}
                                                id={obj.key}
                                                value={formValues[obj.key]}
                                                onChange={handleInputChange}
                                                className="formField peer"
                                                autoComplete="true"
                                                placeholder=" "
                                            />
                                        )}
                                        <Label
                                            htmlFor={obj.key}
                                            className={`pointer-events-none absolute text-sm duration-300 bg-background transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 ${
                                                obj.key === "description"
                                                    ? "peer-placeholder-shown:top-6"
                                                    : "peer-placeholder-shown:top-1/2"
                                            } peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-blue-600 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 capitalize`}
                                        >
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
                                    </fieldset>
                                ))}

                                <div>
                                    <Button
                                        type="button"
                                        className="mt-5"
                                        onClick={handleClearForm}
                                    >
                                        Clear Form
                                    </Button>
                                    <Button type="submit" className="mt-5" onClick={Publish}>
                                        Generate Link
                                    </Button>
                                </div>
                            </form>
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
        </section>
    );
}
