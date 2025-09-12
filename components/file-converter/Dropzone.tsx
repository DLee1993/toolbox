/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { NotifyUser } from "@/lib/global/NotifyUser";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";
import ReactDropzone from "react-dropzone";
import bytesToSize from "@/lib/file-conversion/bites-to-size";
import convertFile from "@/lib/file-conversion/convert";
import compressFileName from "@/lib/file-conversion/compress-filename";

import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
    FiClock,
    FiCheckCircle,
    FiAlertCircle,
    FiDownload,
    FiSend,
    FiTrash,
    FiMinus,
} from "react-icons/fi";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

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

export default function FileConverterDropzone() {
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

        // Append new files to existing ones
        setFiles((prev) => [...prev, ...data]);

        // Generate new actions from uploaded files
        const newActions: Action[] = data.map((file: any) => ({
            file_name: file.name,
            file_size: file.size,
            from: file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2),
            to: null,
            file_type: file.type,
            file,
            is_converted: false,
            is_converting: false,
            is_error: false,
        }));

        // Append new actions to existing ones
        setActions((prev) => [...prev, ...newActions]);
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
        const ffmpeg = ffmpegRef.current;
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

    return (
        <section className="space-y-5 py-2 px-2">
            {/* Files Dropzone */}
            <section className="flex justify-center items-center">
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
                            className="w-full h-80 flex justify-center items-center cursor-pointer border border-dashed border-muted-foreground rounded-sm"
                        >
                            <input {...getInputProps()} />

                            <article className="h-full flex flex-col justify-evenly items-center">
                                {is_hover ? (
                                    <div>
                                        <FiSend className="text-2xl" />
                                        <h3>Send it</h3>
                                    </div>
                                ) : (
                                    <div className="space-y-2 flex flex-col justify-center items-center text-center">
                                        <h1 className="text-2xl font-semibold">
                                            Free, Unlimited File converter
                                        </h1>
                                        <p className="text-sm">Drop your files here</p>
                                    </div>
                                )}
                            </article>
                        </div>
                    )}
                </ReactDropzone>
            </section>
            {/* CTA */}
            <div className="flex justify-end">
                <div className="w-full min-[500px]:w-fit flex justify-center items-center gap-3">
                    <Button size="sm" variant="destructive" onClick={reset}>
                        Clear All
                    </Button>
                    <Button size="sm" onClick={downloadAll} disabled={!is_done}>
                        Download All
                        <FiDownload />
                    </Button>
                    <Button size="sm" disabled={!is_ready || is_converting} onClick={convert}>
                        <span>Convert All</span>
                    </Button>
                </div>
            </div>
            {/* File table / conversion selector */}
            {!is_loaded && (
                <Skeleton className="h-full w-full -ml-10 cursor-progress absolute rounded-xl" />
            )}
            <Table id="fileConversionTable">
                {actions.length < 1 && <TableCaption>Add a file to start</TableCaption>}
                <TableHeader>
                    <TableRow>
                        <TableHead className="min-w-32">Filename</TableHead>
                        <TableHead className="min-w-20">Status</TableHead>
                        <TableHead>Convert to</TableHead>
                        <TableHead className="min-w-20">Type</TableHead>
                        <TableHead className="text-right sticky top-0 right-0 bg-background">
                            Action
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {actions.map((action: Action, i: number) => (
                        <TableRow key={i}>
                            <TableCell className="min-w-44 flex flex-col space-y-2">
                                <span className="font-semibold">
                                    {compressFileName(action.file_name)}
                                </span>
                                <sub> ({bytesToSize(action.file_size)})</sub>
                            </TableCell>
                            <TableCell>
                                {!action.is_error &&
                                    !action.is_converting &&
                                    !action.is_converted && (
                                        <Badge variant="default" className="w-fit flex gap-2">
                                            <span className="hidden sm:block">Pending</span>
                                            <FiMinus />
                                        </Badge>
                                    )}
                                {action.is_error && (
                                    <Badge variant="destructive" className="w-fit flex gap-2">
                                        <span className="hidden sm:block">Failed</span>
                                        <FiAlertCircle />
                                    </Badge>
                                )}
                                {action.is_converting && (
                                    <Badge variant="default" className="w-fit flex gap-2">
                                        <span className="hidden sm:block">Converting</span>
                                        <FiClock />
                                    </Badge>
                                )}
                                {action.is_converted && (
                                    <Badge
                                        variant="default"
                                        className="w-fit flex gap-2 bg-teal-600"
                                    >
                                        <span className="hidden sm:block">Completed</span>
                                        <FiCheckCircle />
                                    </Badge>
                                )}
                            </TableCell>
                            <TableCell>
                                {action.file_type.includes("image") && (
                                    <ImageSelect action={action} updateAction={updateAction} />
                                )}
                                {action.file_type.includes("video") && (
                                    <VideoSelect action={action} updateAction={updateAction} />
                                )}
                                {action.file_type.includes("audio") && (
                                    <AudioSelect action={action} updateAction={updateAction} />
                                )}
                            </TableCell>
                            <TableCell>{action.file_type.split("/")[0]}</TableCell>
                            <TableCell className="w-10 text-center sticky top-0 right-0 bg-background">
                                <DropdownMenu>
                                    <DropdownMenuTrigger aria-label="click to open actions menu">
                                        <span>...</span>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuGroup className="space-y-1">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                aria-label="Download File"
                                                onClick={() => download(action)}
                                                className="flex justify-between items-center"
                                            >
                                                <span>Download file</span>
                                                <FiDownload />
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                aria-label="Delete File"
                                                onClick={() => deleteAction(action)}
                                                className="flex justify-between items-center bg-destructive text-destructive-foreground"
                                            >
                                                <span>Delete file</span>
                                                <FiTrash />
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
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
            <SelectTrigger className="w-24 border-0 shadow-none uppercase">
                <SelectValue
                    aria-placeholder="Select type to convert to"
                    placeholder={action.from.toUpperCase()}
                />
            </SelectTrigger>
            <SelectContent className="grid grid-cols-2 h-fit w-52">
                <SelectGroup>
                    {extensions.image
                        .filter((elt) => elt !== action.file_type.split("/")[1])
                        .map((elt, i) => (
                            <SelectItem
                                key={i}
                                value={elt}
                                className="!flex !justify-between !items-center uppercase"
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
