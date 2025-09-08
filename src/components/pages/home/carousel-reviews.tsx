"use client"

import React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { ReviewCard } from "@/components/pages/home/review-card";
import Container from "@/components/shared/container";
import Autoplay from "embla-carousel-autoplay";
import { useTranslations } from "next-intl";

interface Review {
    name: string;
    date: string;
    comment: string;
    rating: number;
    image: string;
}

const reviews: Review[] = [
    {
        name: "Sarah Aliyeva",
        date: "20.08.2025",
        comment: "Orijinal məhsul göndərildi, keyfiyyətdən çox razı qaldım.",
        rating: 4,
        image: "https://tryeasel.dev/placeholder.svg?width=40&height=40",
    },
    {
        name: "Sarah Aliyeva",
        date: "20.08.2025",
        comment: "Orijinal məhsul göndərildi, keyfiyyətdən çox razı qaldım.",
        rating: 5,
        image: "https://tryeasel.dev/placeholder.svg?width=40&height=40",
    },
    {
        name: "Sarah Aliyeva",
        date: "20.08.2025",
        comment: "Orijinal məhsul göndərildi, keyfiyyətdən çox razı qaldım.",
        rating: 3,
        image: "https://tryeasel.dev/placeholder.svg?width=40&height=40",
    },
    {
        name: "Sarah Aliyeva",
        date: "20.08.2025",
        comment: "Orijinal məhsul göndərildi, keyfiyyətdən çox razı qaldım.",
        rating: 4,
        image: "https://tryeasel.dev/placeholder.svg?width=40&height=40",
    },
    {
        name: "Sarah Aliyeva",
        date: "20.08.2025",
        comment: "Orijinal məhsul göndərildi, keyfiyyətdən çox razı qaldım.",
        rating: 3,
        image: "https://tryeasel.dev/placeholder.svg?width=40&height=40",
    },
    {
        name: "Sarah Aliyeva",
        date: "20.08.2025",
        comment: "Orijinal məhsul göndərildi, keyfiyyətdən çox razı qaldım.",
        rating: 4,
        image: "https://tryeasel.dev/placeholder.svg?width=40&height=40",
    },
];

export function CarouselWithReviews() {
    const t = useTranslations("reviews")
    return (
        <div className="px-4 md:px-0 pb-[72px]">
            <Carousel
                plugins={[
                    Autoplay({
                        delay: 3000, // Autoplay delay in milliseconds (e.g., 3 seconds)
                        stopOnInteraction: false, // Optional: Set to true to stop autoplay on user interaction
                    }),
                ]}
                className="mt-4">
                <Container>
                    <div className="flex items-center justify-between">
                        <h2 className="text-[36px] font-medium">{t("title")}</h2>
                        <div className="flex items-center space-x-2">
                            <CarouselPrevious className="border w-12 h-12 rounded-full p-1 static translate-y-0" />
                            <CarouselNext className="border w-12 h-12 rounded-full p-1 static translate-y-0" />
                        </div>
                    </div>
                </Container>
                <CarouselContent>
                    {reviews.map((review, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                            <ReviewCard review={review} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
}