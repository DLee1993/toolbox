"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";

export default function FeatureWarning() {
    return (
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
                            confidentiality of the data processed through it. You can use the form
                            and the preview feature without sharing data, your data will {""}{" "}
                            <span className="font-bold text-foreground underline">not be shared</span> until you
                            click the Generate Link button
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
                        <Button className="bg-red-700 text-white">Consent</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
