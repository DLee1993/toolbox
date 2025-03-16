/* eslint-disable @next/next/no-img-element */

"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { decryptData } from "@/hooks/link-in-bio/decryption";
import { PublishedLink } from "@/components/link-in-bio/PublishedLink";
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
import { MailIcon } from "lucide-react";

const GeneratePreview = () => {
    const [data, setData] = useState<LinkInBioValues>({});

    // HANDLE THE DECRYPTION OF USER DATA HERE

    if (typeof window !== "undefined") {
        const urlParams = new URLSearchParams(window.location.search);

        const encryptedDataFromUrl = {
            data: urlParams.get("data") || "",
            iv: urlParams.get("iv") || "",
            salt: urlParams.get("salt") || "",
        };

        async function handleDecrypt() {
            try {
                const decrypt_data = await decryptData(encryptedDataFromUrl);
                setData(decrypt_data);
            } catch (error) {
                console.log(error);
            }
        }

        handleDecrypt();
    }

    // JSX CONTENT HERE
    return (
        <section className="flex flex-col justify-center items-center space-y-10 py-10">
            {data.photo && (
                <figure className="w-fit p-1 ring-1 ring-primary rounded-full">
                    <img
                        src={data.photo}
                        alt="profile picture"
                        width={50}
                        height={50}
                        className="rounded-full size-20 object-cover"
                    />
                </figure>
            )}

            <div className="space-y-1">
                <h2 className="text-md capitalize text-center">{data.name}</h2>
                {data.email && (
                    <a
                        href={`mailto:${data.email}`}
                        className="opacity-60 w-fit text-sm text-center flex items-center gap-2 mx-auto hover:opacity-100"
                    >
                        <MailIcon size={12} />
                        {data.email}
                    </a>
                )}
            </div>
            <p className="max-w-[460px] break-words mx-auto text-center my-10">
                {data.description}
            </p>
            {data.portfolio && (
                <Link
                    href={data.portfolio}
                    target="_blank"
                    className="block py-2 px-4 border border-border rounded-[8px] hover:bg-muted"
                >
                    {data.portfolio}
                </Link>
            )}
            <ul className="w-fit flex gap-2">
                {data.linkedin && (
                    <PublishedLink Icon={FaLinkedinIn} label={"Linkedin"} href={data.linkedin} />
                )}
                {data.github && (
                    <PublishedLink Icon={FaGithub} label={"Github"} href={data.github} />
                )}
                {data.twitter && (
                    <PublishedLink Icon={FaXTwitter} label={"X / Twitter"} href={data.twitter} />
                )}
                {data.instagram && (
                    <PublishedLink Icon={FaInstagram} label={"Instagram"} href={data.instagram} />
                )}
                {data.youtube && (
                    <PublishedLink Icon={FaYoutube} label={"Youtube"} href={data.youtube} />
                )}
                {data.facebook && (
                    <PublishedLink Icon={FaFacebook} label={"Facebook"} href={data.facebook} />
                )}
                {data.whatsApp && (
                    <PublishedLink
                        Icon={FaWhatsapp}
                        label={"WhatsApp"}
                        href={`https://wa.me/${parseInt(data.whatsApp)}`}
                    />
                )}
                {data.telegram && (
                    <PublishedLink Icon={FaTelegram} label={"Telegram"} href={data.telegram} />
                )}
            </ul>
        </section>
    );
};

export default function LinkInBioPreview() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <GeneratePreview />
        </Suspense>
    );
}
