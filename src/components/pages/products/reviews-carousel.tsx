"use client"

import React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Container from "@/components/shared/container";
import Autoplay from "embla-carousel-autoplay";
import { Star } from "lucide-react";
import Image from "next/image";

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

export function ReviewsCarousel() {
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
                <Container className="md:!px-0">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-medium">12 Rəy</h2>
                        <div className="flex items-center space-x-2">
                            <CarouselPrevious className="border w-12 h-12 rounded-full p-1 static translate-y-0" />
                            <CarouselNext className="border w-12 h-12 rounded-full p-1 static translate-y-0" />
                        </div>
                    </div>
                </Container>
                <CarouselContent>
                    {reviews.map((review, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                            <ReviewCard review={review} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
}


interface ReviewCardProps {
    review: {
        name: string;
        date: string;
        comment: string;
        rating: number;
        image: string;
    };
}

function ReviewCard({ review }: ReviewCardProps) {
    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <Star
                    key={i}
                    fill={i < rating ? "#F59E0B" : "none"}
                    className="h-3 w-3 text-[#FF9500]"
                />
            );
        }
        return stars;
    };

    return (
        <div className="bg-card rounded-[12px] p-4 border border-[#F2F4F8] mt-12">
            <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full" />
                <div>
                    <h4 className="font-semibold text-foreground">{review.name}</h4>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                </div>
                <div className="ml-auto flex items-center gap-1">{renderStars(review.rating)}</div>
            </div>
            <div className="bg-[#F2F4F8] w-fit py-3 px-3 rounded-[8px] my-4">
                <Image src="/images/product.jpg" alt={review.name} width={110} height={110} className="w-10 h-10 rounded-full" />
            </div>
            <p className="text-sm mt-2 text-muted-foreground">{review.comment}</p>
        </div>
    );
}