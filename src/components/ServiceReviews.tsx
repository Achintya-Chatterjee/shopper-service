import { Review } from "@/types/Index";
import { Star } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ServiceReviewsProps {
  serviceId: string;
  reviews: Review[];
}

export function ServiceReviews({ reviews }: ServiceReviewsProps) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-medium mb-2">No reviews yet</h3>
        <p className="text-muted-foreground">
          Be the first to review this service!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-4">
        <h3 className="text-lg font-medium">Customer Reviews</h3>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-6 last:border-0">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-medium">{review.userName}</h4>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <span className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(review.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
            <p className="mt-2">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
