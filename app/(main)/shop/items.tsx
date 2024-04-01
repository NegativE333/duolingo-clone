"use client";

import { refillHearts } from "@/actions/user-progress";
import { createStripeUrl } from "@/actions/user-subscription";
import { Button } from "@/components/ui/button";
import { POINTS_TO_REFILL } from "@/constants";
import Image from "next/image";
import { useTransition } from "react";
import { toast } from "sonner";

type Props = {
    hearts: number;
    points: number;
    hasActiveSub: boolean;
}

export const Items = ({
    hearts,
    points,
    hasActiveSub
}: Props) => {

    const [pending, startTransition] = useTransition();

    const onRefillHearts = () => {
        if(pending || hearts === 5 || points < POINTS_TO_REFILL){
            return;
        }

        startTransition(() => {
            refillHearts()
            .catch(() => toast.error("Something went wrong."));
        })
    }

    const onUpgrade = () =>  {
        startTransition(() => {
           createStripeUrl()
           .then((res) => {
            if(res.data){
                window.location.href = res.data;
            }
           }) 
           .catch(() => toast.error("Something went wrong"));
        })
    }

    return (
        <ul className="w-full">
            <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
                <Image
                    src="/heart.svg"
                    alt="heart"
                    height={60}
                    width={60}
                />
                <div className="flex-1">
                    <p className="text-neutral-700 text-base lg:text-xl font-bold">
                        Refill hearts
                    </p>
                </div>
                <Button
                    onClick={onRefillHearts}
                    disabled={hearts === 5 || POINTS_TO_REFILL > points || pending}
                >
                    {hearts === 5 ? "full" : (
                        <div className="flex items-center">
                            <Image
                                src="/points.svg"
                                alt="points"
                                height={20}
                                width={20}
                            />
                            <p className="">10</p>
                        </div>
                    )}
                </Button>
            </div>
            <div className="flex items-center w-full p-4 pt-8 gap-x-4 border-t-2">
                <Image 
                    src="/unlimited.svg"
                    alt="unlimited"
                    height={60}
                    width={60}
                />
                <div className="flex-1">
                    <p className="text-neutral-700 text-base lg:text-xl font-bold">
                        Unlimited hearts
                    </p>
                </div>
                <Button
                    onClick={onUpgrade}
                    disabled={pending}
                >
                    {hasActiveSub ? "settings" : "upgrade"}
                </Button>
            </div>
        </ul>
    )
}