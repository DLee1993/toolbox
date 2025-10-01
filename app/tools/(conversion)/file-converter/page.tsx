"use client";

import NoSSRWrapper from "@/app/NoSSRWrapper";
import FileConverterDropzone from "@/components/file-converter/Dropzone";

export default function FileConverter() {
    return (
        <NoSSRWrapper>
            <section className="flex justify-between items-start gap-8 flex-wrap">
                <article className="flex-1 min-w-80 sm:min-w-96 space-y-10 text-sm">
                    <div className="space-y-2.5">
                        <h1 className="font-semibold text-2xl">Convert Audio, Video and Images.</h1>
                        <p className="w-11/12">
                            A fast and easy tool for converting audio, video, and image files
                            between popular formats. No editing, no tweaking—just clean, reliable
                            format conversion.
                        </p>
                    </div>
                    <ul className="list-disc list-inside space-y-2">
                        <li>
                            Audio
                            <span className="text-xs font-bold">
                                (MP3, WAV, AAC, FLAC, and more)
                            </span>
                        </li>
                        <li>
                            Video
                            <span className="text-xs font-bold">
                                (MP4, AVI, MOV, MKV, and more)
                            </span>
                        </li>
                        <li>
                            Images
                            <span className="text-xs font-bold">
                                (JPG, PNG, GIF, BMP, and more)
                            </span>
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
