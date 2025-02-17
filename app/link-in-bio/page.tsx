/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import Link from "next/link";
import { encodeData } from "@/hooks/link-in-bio/encoder";
import { useToast } from "@/hooks/global/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
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
import { PublishedLink } from "@/components/PublishedLink";
import { Button } from "@/components/ui/button";

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
        const url = `${window.location.origin}/link-in-bio-preview?data=${encodeData(formValues)}`;
        navigator.clipboard
            .writeText(url)
            .then(() => {
                toast({ title: "Success", description: "URL copied to clipboard", duration: 2000 });
            })
            .catch(() => {
                toast({
                    variant: "destructive",
                    title: "Failed",
                    description: "Unable to copy, please try again later",
                    duration: 2000,
                });
            });
    };
    const steps = [
        {
            title: "Step 1",
            description: "Fill in the form below with your personal information.",
        },
        {
            title: "Step 2",
            description: "View the preview to see what everyone will see when clicking the link.",
        },
        {
            title: "Step 3",
            description:
                "If your happy, click the publish link button to generate a url with all your data.",
        },
    ];
    return (
        <section className="minHeight customYPadding">
            <article className="w-11/12 mx-auto flex flex-col justify-center items-center space-y-10">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl">Consolidate Your Links.</h1>
                    <p className="max-w-2xl">
                        Seamlessly manage and showcase all your important links in one place.
                        Perfect for <span className="text-primary">social media profiles</span>,{" "}
                        <span className="text-primary">bios</span> and more. Get started in{" "}
                        <span className="text-primary">3 easy steps:</span>
                    </p>
                </div>

                <div className="flex flex-wrap gap-5">
                    {steps.map((step, i) => (
                        <article
                            key={i}
                            className="min-w-80 mx-auto flex-1 border border-muted p-4 max-w-sm text-center space-y-2"
                        >
                            <h2 className="font-semibold text-primary">{step.title}.</h2>
                            <p>{step.description}</p>
                        </article>
                    ))}
                </div>
                <p className="text-center">
                    <strong className="text-primary">Optional: </strong> Once published, head on over to our URL
                    shortener{" "}
                    <Link href="/link-shortener" className="underline">
                        here
                    </Link>{" "}
                    to give your link a more personal touch.
                </p>
            </article>
            <Button
                className="px-2 py-6 text-sm rounded-[4px] w-full max-w-[200px] cursor-copy bg-transparent text-foreground border border-muted"
                onClick={publish}
                disabled={
                    formValues.name.length < 1 ||
                    formValues.email!.length < 1 ||
                    formValues.description!.length < 1
                }
            >
                Publish Link
            </Button>
            <section className="w-11/12 max-w-2xl mx-auto mt-10">
                <Tabs defaultValue="PersonalInformation">
                    <TabsList className="grid grid-cols-2 gap-2 h-12 text-secondary-foreground bg-secondary">
                        <TabsTrigger
                            value="PersonalInformation"
                            className="cursor-pointer h-9 hover:bg-slate-200/15"
                        >
                            Personal Information
                        </TabsTrigger>
                        <TabsTrigger
                            value="Preview"
                            className="cursor-pointer h-9 hover:bg-slate-200/15"
                        >
                            Preview
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="PersonalInformation">
                        <Card className="bg-transparent shadow-none border-none mt-10">
                            <CardContent className="p-0">
                                <form className="my-10 space-y-10">
                                    {formContents.map((obj, i) => (
                                        <fieldset key={i} className="w-full flex flex-col gap-2">
                                            <Label className="capitalize text-sm">
                                                {obj.key}
                                                <span className="ml-1 text-bold text-xs normal-case text-accent-foreground">
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
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="Preview">
                        <Card className="bg-transparent shadow-none border-none">
                            <CardHeader>
                                <CardDescription className="text-center">
                                    {Object.values(formValues).every((value) => value.length < 1)
                                        ? "Please fill in the personal information form to view the preview"
                                        : ""}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <section className="flex flex-col justify-center items-center gap-10">
                                    {formValues.photo && (
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
                                                href={`https://wa.me/${parseInt(
                                                    formValues.whatsApp
                                                )}`}
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
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </section>
        </section>
    );
}
