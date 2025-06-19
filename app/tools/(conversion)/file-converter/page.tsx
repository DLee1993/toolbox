/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

// imports
import { useState, useEffect, useRef, useCallback } from "react";
import { NotifyUser } from "@/lib/global/NotifyUser";

// import loadFfmpeg from "@/lib/file-conversion/load-ffmpeg";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";
import ReactDropzone from "react-dropzone";
import bytesToSize from "@/lib/file-conversion/bites-to-size";
import fileToIcon from "@/lib/file-conversion/file-to-icon";
import convertFile from "@/lib/file-conversion/convert";
import compressFileName from "@/lib/file-conversion/compress-filename";

import { FiUploadCloud } from "react-icons/fi";
import { LuFileSymlink } from "react-icons/lu";
import { MdDone } from "react-icons/md";
import { HiOutlineDownload } from "react-icons/hi";
import { BiError } from "react-icons/bi";

import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, Trash } from "lucide-react";

const extensions = {
    image: ["jpg", "jpeg", "png", "gif", "bmp", "webp", "ico", "tif", "tiff", "svg", "raw", "tga"],
    video: [
        "mp4",
        "m4v",
        "mp4v",
        "3gp",
        "3g2",
        "avi",
        "mov",
        "wmv",
        "mkv",
        "flv",
        "ogv",
        "webm",
        "h264",
        "264",
        "hevc",
        "265",
    ],
    audio: ["mp3", "wav", "ogg", "aac", "wma", "flac", "m4a"],
};

export default function FileConverter() {
    // variables & hooks
    const ffmpegRef = useRef(new FFmpeg());
    const [is_hover, setIsHover] = useState<boolean>(false);
    const [actions, setActions] = useState<Action[]>([]);
    const [is_ready, setIsReady] = useState<boolean>(false);
    const [files, setFiles] = useState<Array<Action>>([]);
    const [is_loaded, setIsLoaded] = useState<boolean>(false);
    const [is_converting, setIsConverting] = useState<boolean>(false);
    const [is_done, setIsDone] = useState<boolean>(false);

    // Accepted File formats
    const accepted_files = {
        "image/*": [
            ".jpg",
            ".jpeg",
            ".png",
            ".gif",
            ".bmp",
            ".webp",
            ".ico",
            ".tif",
            ".tiff",
            ".raw",
            ".tga",
        ],
        "audio/*": [],
        "video/*": [],
    };

    // functions
    const reset = () => {
        setIsDone(false);
        setActions([]);
        setFiles([]);
        setIsReady(false);
        setIsConverting(false);
    };

    const downloadAll = (): void => {
        for (const action of actions) {
            if (!action.is_error) download(action);
        }
    };

    const download = (action: Action) => {
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = action.url;
        a.download = action.output;

        document.body.appendChild(a);
        a.click();

        // Clean up after download
        URL.revokeObjectURL(action.url);
        document.body.removeChild(a);
    };

    const convert = async (): Promise<any> => {
        let tmp_actions = actions.map((elt) => ({
            ...elt,
            is_converting: true,
        }));
        setActions(tmp_actions);
        setIsConverting(true);
        for (const action of tmp_actions) {
            try {
                if (!ffmpegRef.current) {
                    throw new Error("FFmpeg is not loaded.");
                }
                const { url, output } = await convertFile(ffmpegRef.current, action);
                tmp_actions = tmp_actions.map((elt) =>
                    elt === action
                        ? {
                              ...elt,
                              is_converted: true,
                              is_converting: false,
                              url,
                              output,
                          }
                        : elt
                );
                setActions(tmp_actions);
            } catch (err) {
                console.log(err);
                tmp_actions = tmp_actions.map((elt) =>
                    elt === action
                        ? {
                              ...elt,
                              is_converted: false,
                              is_converting: false,
                              is_error: true,
                          }
                        : elt
                );
                setActions(tmp_actions);
            }
        }
        setIsDone(true);
        setIsConverting(false);
    };

    const handleUpload = (data: Array<any>): void => {
        handleExitHover();
        setFiles(data);

        const tmp: Action[] = [];

        data.forEach((file: any) => {
            tmp.push({
                file_name: file.name,
                file_size: file.size,
                from: file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2),
                to: null,
                file_type: file.type,
                file,
                is_converted: false,
                is_converting: false,
                is_error: false,
            });
        });
        setActions(tmp);
    };

    const handleHover = (): void => setIsHover(true);

    const handleExitHover = (): void => setIsHover(false);

    const updateAction = (file_name: string, to: string) => {
        setActions(
            actions.map((action): Action => {
                if (action.file_name === file_name) {
                    console.log("FOUND");
                    return {
                        ...action,
                        to,
                    };
                }

                return action;
            })
        );
    };

    const checkIsReady = useCallback((): void => {
        let tmp_is_ready = true;
        actions.forEach((action: Action) => {
            if (!action.to) tmp_is_ready = false;
        });
        setIsReady(tmp_is_ready);
    }, [actions]);

    const deleteAction = (action: Action): void => {
        setActions(actions.filter((elt) => elt !== action));
        setFiles(files.filter((elt) => elt.file_name !== action.file_name));
    };

    useEffect(() => {
        if (!actions.length) {
            setIsDone(false);
            setFiles([]);
            setIsReady(false);
            setIsConverting(false);
        } else checkIsReady();
    }, [actions, checkIsReady]);

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.2/dist/umd";
        const ffmpeg = new FFmpeg();
        ffmpeg?.on("log", ({ message }) => {
            console.log(message);
        });
        // toBlobURL is used to bypass CORS issue, urls with the same
        // domain can be used directly.
        await ffmpeg.load({
            coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
            wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
        });

        setIsLoaded(true);
    };

    // returns
    if (actions.length) {
        return (
            <section className="height w-full max-w-4xl mx-auto space-y-10 py-5">
                <div className="flex w-full justify-end">
                    {is_done ? (
                        <div className="space-y-4 w-fit">
                            {actions.length > 1 && (
                                <Button onClick={downloadAll}>
                                    Download All
                                    <HiOutlineDownload />
                                </Button>
                            )}
                            <Button onClick={reset} variant="outline">
                                Convert Another File(s)
                            </Button>
                        </div>
                    ) : (
                        <Button disabled={!is_ready || is_converting} onClick={convert}>
                            {is_converting ? <span>Please wait</span> : <span>Convert</span>}
                        </Button>
                    )}
                </div>
                <section className="px-1 overflow-y-auto">
                    {actions.map((action: Action, i: any) => (
                        <div
                            key={i}
                            className="flex flex-wrap justify-between items-center border-b border-muted-foreground mx-auto py-5 gap-5 md:gap-0 text-sm"
                        >
                            {!is_loaded && (
                                <Skeleton className="h-full w-full -ml-10 cursor-progress absolute rounded-xl" />
                            )}
                            <div className="flex gap-4 items-center text-sm">
                                <span className="text-teal-600">
                                    {fileToIcon(action.file_type)}
                                </span>
                                <span className="w-40 overflow-x-hidden">
                                    {compressFileName(action.file_name)}
                                </span>
                                <span className="text-muted-foreground">
                                    ({bytesToSize(action.file_size)})
                                </span>
                            </div>

                            {action.is_error && (
                                <Badge variant="destructive" className="flex gap-2">
                                    <span>Conversion Failed</span>
                                    <BiError />
                                </Badge>
                            )}
                            {action.is_converting && (
                                <Badge variant="default" className="flex gap-2">
                                    <span>Converting</span>
                                </Badge>
                            )}
                            {action.is_converted && (
                                <Badge variant="default" className="flex gap-2 bg-teal-600">
                                    <span>Done</span>
                                    <MdDone />
                                </Badge>
                            )}

                            <div className="flex justify-center items-center gap-2">
                                {action.file_type.includes("image") && (
                                    <ImageSelect action={action} updateAction={updateAction} />
                                )}
                                {action.file_type.includes("video") && (
                                    <VideoSelect action={action} updateAction={updateAction} />
                                )}
                                {action.file_type.includes("audio") && (
                                    <AudioSelect action={action} updateAction={updateAction} />
                                )}
                                <Button
                                    variant="outline"
                                    aria-label="download converted file"
                                    disabled={!action.is_converted}
                                    onClick={() => download(action)}
                                >
                                    <Download />
                                </Button>
                                <Button
                                    variant="destructive"
                                    aria-label="remove converted file"
                                    onClick={() => deleteAction(action)}
                                >
                                    <Trash size={18} />
                                </Button>
                            </div>
                        </div>
                    ))}
                </section>
            </section>
        );
    }

    return (
        <section className="height p-3 flex justify-center items-center">
            <ReactDropzone
                onDrop={handleUpload}
                onDragEnter={handleHover}
                onDragLeave={handleExitHover}
                accept={accepted_files}
                onDropRejected={() => {
                    handleExitHover();
                    NotifyUser({
                        type: "destructive",
                        message:
                            "Error uploading your file(s), Allowed Files: Audio, Video and Images.",
                    });
                }}
                onError={() => {
                    handleExitHover();
                    NotifyUser({
                        type: "destructive",
                        message:
                            "Error uploading your file(s), Allowed Files: Audio, Video and Images.",
                    });
                }}
            >
                {({ getRootProps, getInputProps }) => (
                    <div
                        {...getRootProps()}
                        className="w-full h-[calc(100vh-10vh)] flex justify-center items-center cursor-pointer border border-dotted border-muted-foreground"
                    >
                        <input {...getInputProps()} />

                        <article className="h-full flex flex-col justify-evenly items-center">
                            {is_hover ? (
                                <div>
                                    <LuFileSymlink className="text-2xl" />
                                    <h3>Send it</h3>
                                </div>
                            ) : (
                                <div className="space-y-10 flex flex-col justify-center items-center">
                                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold">
                                        Free, Unlimited File converter
                                    </h1>
                                    <FiUploadCloud size={20} />
                                    <h3 className="text-sm sm:text-base">
                                        Select by clicking, or drop your files here
                                    </h3>
                                </div>
                            )}
                        </article>
                    </div>
                )}
            </ReactDropzone>
        </section>
    );
}

const ImageSelect = ({
    updateAction,
    action,
}: {
    updateAction: (file_name: string, to: string) => void;
    action: Action;
}) => {
    const [imageSelected, setImageSelected] = useState<string>("");

    return (
        <Select
            onValueChange={(value) => {
                setImageSelected(value);
                updateAction(action.file_name, value);
            }}
            value={imageSelected}
        >
            <SelectTrigger className="w-32">
                <SelectValue
                    aria-placeholder="Select type to convert to"
                    placeholder="Convert to"
                />
            </SelectTrigger>
            <SelectContent className="grid grid-cols-2 h-fit w-52">
                <SelectGroup>
                    {extensions.image.map((elt, i) => (
                        <SelectItem
                            key={i}
                            value={elt}
                            className="!flex !justify-between !items-center"
                        >
                            {elt}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

const VideoSelect = ({
    updateAction,
    action,
}: {
    updateAction: (file_name: string, to: string) => void;
    action: Action;
}) => {
    const [videoSelected, setVideoSelected] = useState<string>("");

    return (
        <Select
            onValueChange={(value) => {
                setVideoSelected(value);
                updateAction(action.file_name, value);
            }}
            value={videoSelected}
        >
            <SelectTrigger className="w-32">
                <SelectValue
                    aria-placeholder="Select type to convert to"
                    placeholder="Convert to"
                />
            </SelectTrigger>
            <SelectContent className="grid grid-cols-2 h-fit w-52">
                <Tabs defaultValue="video" className="w-full">
                    <TabsList className="w-full">
                        <TabsTrigger value="video" className="w-full">
                            Video
                        </TabsTrigger>
                        <TabsTrigger value="audio" className="w-full">
                            Audio
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="video">
                        <div className="grid grid-cols-3 gap-2 w-fit">
                            {extensions.video.map((elt, i) => (
                                <div key={i} className="col-span-1 text-center">
                                    <SelectItem value={elt} className="mx-auto">
                                        {elt}
                                    </SelectItem>
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="audio">
                        <div className="grid grid-cols-3 gap-2 w-fit">
                            {extensions.audio.map((elt, i) => (
                                <div key={i} className="col-span-1 text-center">
                                    <SelectItem value={elt} className="mx-auto">
                                        {elt}
                                    </SelectItem>
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </SelectContent>
        </Select>
    );
};

const AudioSelect = ({
    updateAction,
    action,
}: {
    updateAction: (file_name: string, to: string) => void;
    action: Action;
}) => {
    const [audioSelected, setAudioSelected] = useState<string>("");

    return (
        <Select
            onValueChange={(value) => {
                setAudioSelected(value);
                updateAction(action.file_name, value);
            }}
            value={audioSelected}
        >
            <SelectTrigger className="w-32">
                <SelectValue
                    aria-placeholder="Select type to convert to"
                    placeholder="Convert to"
                />
            </SelectTrigger>
            <SelectContent className="grid grid-cols-2 h-fit w-52">
                <SelectGroup>
                    {extensions.audio.map((elt, i) => (
                        <SelectItem
                            key={i}
                            value={elt}
                            className="!flex !justify-between !items-center"
                        >
                            {elt}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};
