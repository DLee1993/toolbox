/* eslint-disable @next/next/no-img-element */
"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { decodeData } from "@/lib/link-in-bio/encoder";
import PublishedLink from "@/components/link-in-bio/PublishedLink";
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

function LinkPreview() {
    const searchParams = useSearchParams();
    const data = searchParams.get("data");
    const decoded_data = decodeData(data!);

    return (
        <section className="flex flex-col justify-center items-center gap-10">
            {decoded_data.photo && (
                <img
                    src={decoded_data.photo}
                    alt="profile picture"
                    width={50}
                    height={50}
                    className="rounded-full size-20 border-2 border-muted"
                />
            )}
            <article className="flex flex-col justify-center items-center gap-10">
                <div className="space-y-1 text-center">
                    <h2 className="text-xl font-medium capitalize">{decoded_data.name}</h2>
                    <p className="opacity-60 text-sm">{decoded_data.email}</p>
                </div>
                <p className="max-w-[460px] mx-auto text-center text-sm">
                    {decoded_data.description}
                </p>
                {decoded_data.portfolio && (
                    <Link
                        href={decoded_data.portfolio}
                        target="_blank"
                        className="block py-3 px-8 border border-muted rounded-[8px] hover:bg-muted transition-colors duration-300"
                    >
                        {decoded_data.portfolio}
                    </Link>
                )}
            </article>
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
}

export default function Preview() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LinkPreview />
        </Suspense>
    );
}
