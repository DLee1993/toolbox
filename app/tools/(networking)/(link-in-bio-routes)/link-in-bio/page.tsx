"use client";

import Link from "next/link";
import { useState } from "react";
import { publish } from "@/hooks/link-in-bio/publish";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LinkInBioSchema } from "@/schema/zodSchema";
import { useToast } from "@/hooks/global/use-toast";

import PublishedLink from "@/components/global/PublishedLink";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";
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

    const [formContents] = useState<
        {
            key:
                | "photo"
                | "name"
                | "email"
                | "description"
                | "portfolio"
                | "linkedin"
                | "github"
                | "facebook"
                | "twitter"
                | "instagram"
                | "whatsApp"
                | "telegram"
                | "youtube";
            placeholder: string;
        }[]
    >([
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

    const form = useForm({
        mode: "onChange",
        resolver: zodResolver(LinkInBioSchema),
        defaultValues: {
            photo: "",
            name: "",
            email: "",
            description: "",
            portfolio: "",
            linkedin: "",
            github: "",
            facebook: "",
            twitter: "",
            instagram: "",
            whatsApp: "",
            telegram: "",
            youtube: "",
        },
    });

    const onSubmit = () => {
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
                        <section className="mt-10">
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="space-y-8 columns-2"
                                >
                                    {formContents.map((formField, i) => (
                                        <FormField
                                            control={form.control}
                                            name={formField.key}
                                            key={i}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="capitalize">
                                                        {formField.key}
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder={formField.placeholder}
                                                            {...field}
                                                            onChange={handleInputChange}
                                                            value={formValues[formField.key]}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    ))}
                                    <Button type="submit">Generate Link</Button>
                                </form>
                            </Form>
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
                        <DialogTitle className="text-red-700">
                            Warning! Experimental Feature
                        </DialogTitle>
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
