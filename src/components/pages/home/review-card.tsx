import React from "react";
import { Command, Star } from "lucide-react";

interface ReviewCardProps {
  review: {
    name: string;
    date: string;
    comment: string;
    rating: number;
    image: string;
  };
}

export function ReviewCard({ review }: ReviewCardProps) {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          fill={i < rating ? "#F59E0B" : "none"}
          className="h-4 w-4 text-yellow-500"
        />
      );
    }
    return stars;
  };

  return (
    <div className="bg-card rounded-[12px] p-4 border border-[#F2F4F8] mt-12">
      <div className="text-sm text-muted-foreground"><Command /></div>
      <div className="flex space-x-4 mt-2">
        <div className="w-10 h-10 bg-gray-200 rounded-full" />
        <div>
          <h4 className="font-semibold text-foreground">{review.name}</h4>
          <p className="text-xs text-muted-foreground">{review.date}</p>
        </div>
        <div className="ml-auto flex items-center">{renderStars(review.rating)}</div>
      </div>
      <p className="text-sm mt-2 text-muted-foreground">{review.comment}</p>
    </div>
  );
}