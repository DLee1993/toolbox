"use client";

import NoSSRWrapper from "@/app/NoSSRWrapper";
import FileConverterDropzone from "@/components/file-converter/Dropzone";

export default function FileConverter() {
    return (
        <NoSSRWrapper>
            <FileConverterDropzone />
        </NoSSRWrapper>
    );
}
