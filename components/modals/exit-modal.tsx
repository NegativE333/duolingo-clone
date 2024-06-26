"use client";

import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogFooter,
    DialogTitle
} from "../ui/dialog";
import { useEffect, useState } from "react";
import { useExitModal } from "@/store/use-exit-modal";
import Image from "next/image";
import { Button } from "../ui/button";

export const ExitModal = () => {
    const router = useRouter();
    const { isOpen, close } = useExitModal();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => setIsClient(true), []);

    if (!isClient) return null;

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <div className="flex items-center w-full justify-center mb-5">
                        <Image
                            src="/mascot_sad.svg"
                            alt="mascot"
                            height={80}
                            width={80}
                        />
                    </div>
                    <DialogTitle className="text-center font-bold text-2xl">
                        Wait, don&apos;t go!
                    </DialogTitle>
                    <DialogDescription className="text-center text-base">
                        You&apos;r about to leave the lesson. Are you sure?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mb-4">
                    <div className="flex flex-col gap-y-4 w-full">
                        <Button
                            className="w-full"
                            variant="primary"
                            size="lg"
                            onClick={close}
                        >
                            Keep learning
                        </Button>
                        <Button
                            className="w-full"
                            variant="dangerOutline"
                            size="lg"
                            onClick={() => {
                                close();
                                router.push('/learn')
                            }}
                        >
                            End session
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}