/* eslint-disable @next/next/no-img-element */

"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { decodeData } from "@/hooks/link-in-bio/encoder";
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
import { Suspense } from "react";
import { MailIcon } from "lucide-react";

const GeneratePreview = () => {
    const searchParams = useSearchParams();
    const data = searchParams.get("data");
    const decoded_data = decodeData(data!);

    return (
        <section className="flex flex-col justify-center items-center space-y-10 py-10">
            {decoded_data.photo && (
                <figure className="w-fit p-1 ring-1 ring-primary rounded-full">
                    <img
                        src={decoded_data.photo}
                        alt="profile picture"
                        width={50}
                        height={50}
                        className="rounded-full size-20 object-cover"
                    />
                </figure>
            )}

            <div className="space-y-1">
                <h2 className="text-md capitalize">{decoded_data.name}</h2>
                {decoded_data.email && (
                    <a
                        href={`mailto:${decoded_data.email}`}
                        className="opacity-60 w-fit text-sm text-center flex items-center gap-2 mx-auto hover:opacity-100"
                    >
                        <MailIcon size={12} />
                        {decoded_data.email}
                    </a>
                )}
            </div>
            <p className="max-w-[460px] break-words mx-auto text-center my-10">
                {decoded_data.description}
            </p>
            {decoded_data.portfolio && (
                <Link
                    href={decoded_data.portfolio}
                    target="_blank"
                    className="block py-2 px-4 border border-border rounded-[8px] hover:bg-muted"
                >
                    {decoded_data.portfolio}
                </Link>
            )}
            <ul className="w-fit flex gap-2">
                {decoded_data.linkedin && (
                    <PublishedLink
                        Icon={FaLinkedinIn}
                        label={"Linkedin"}
                        href={decoded_data.linkedin}
                    />
                )}
                {decoded_data.github && (
                    <PublishedLink Icon={FaGithub} label={"Github"} href={decoded_data.github} />
                )}
                {decoded_data.twitter && (
                    <PublishedLink
                        Icon={FaXTwitter}
                        label={"X / Twitter"}
                        href={decoded_data.twitter}
                    />
                )}
                {decoded_data.instagram && (
                    <PublishedLink
                        Icon={FaInstagram}
                        label={"Instagram"}
                        href={decoded_data.instagram}
                    />
                )}
                {decoded_data.youtube && (
                    <PublishedLink Icon={FaYoutube} label={"Youtube"} href={decoded_data.youtube} />
                )}
                {decoded_data.facebook && (
                    <PublishedLink
                        Icon={FaFacebook}
                        label={"Facebook"}
                        href={decoded_data.facebook}
                    />
                )}
                {decoded_data.whatsApp && (
                    <PublishedLink
                        Icon={FaWhatsapp}
                        label={"WhatsApp"}
                        href={`https://wa.me/${parseInt(decoded_data.whatsApp)}`}
                    />
                )}
                {decoded_data.telegram && (
                    <PublishedLink
                        Icon={FaTelegram}
                        label={"Telegram"}
                        href={decoded_data.telegram}
                    />
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
