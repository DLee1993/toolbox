"use client";

import NoSSRWrapper from "@/app/NoSSRWrapper";
import FileConverterDropzone from "@/components/file-converter/Dropzone";

export default function FileConverter() {
    return (
        <NoSSRWrapper>
            <section className="flex justify-between items-start gap-10 p-5 flex-wrap">
                <article className="flex-1 min-w-96 space-y-10 text-sm">
                    <div className="space-y-2.5">
                        <h1 className="font-semibold text-2xl">Convert Audio, Video and Images.</h1>
                        <p>
                            A fast and easy tool for converting audio, video, and image files
                            between popular formats. No editing, no tweaking—just clean, reliable
                            format conversion.
                        </p>
                    </div>
                    <ul className="list-disc list-inside space-y-2">
                        <li>
                            <span className="font-semibold">Audio:</span> MP3, WAV, AAC, FLAC, and
                            more
                        </li>
                        <li>
                            <span className="font-semibold">Video:</span> MP4, AVI, MOV, MKV, and
                            more
                        </li>
                        <li>
                            <span className="font-semibold">Images:</span> JPG, PNG, GIF, BMP, and
                            more
                        </li>
                    </ul>
                    <p className="font-semibold w-10/12">
                        Everything runs directly in your browser making it privacy-friendly and
                        completely free.
                    </p>
                </article>
                <FileConverterDropzone />
            </section>
        </NoSSRWrapper>
    );
}
