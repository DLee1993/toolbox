"use client";

import NoSSRWrapper from "@/app/NoSSRWrapper";
import FileConverterDropzone from "@/components/file-converter/Dropzone";

export default function FileConverter() {
    return (
        <NoSSRWrapper>
            <section className="padding w-full max-w-3xl mx-auto">
                <FileConverterDropzone />
            </section>
        </NoSSRWrapper>
    );
}
