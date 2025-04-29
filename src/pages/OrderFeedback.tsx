import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { orders } from "@/data/orders";
import { toast } from "@/components/ui/sonner";

const OrderFeedback = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const order = orders.find((o) => o.id === id);

  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [comments, setComments] = useState<Record<string, string>>({});
  const [overallRating, setOverallRating] = useState<number>(0);
  const [overallComment, setOverallComment] = useState<string>("");

  if (!order) {
    return (
      <div>
        <Header />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">Order not found</h1>
          <p className="mb-6">The order you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/orders">Return to Order History</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleRatingChange = (serviceId: string, rating: number) => {
    setRatings((prev) => ({ ...prev, [serviceId]: rating }));
  };

  const handleCommentChange = (serviceId: string, comment: string) => {
    setComments((prev) => ({ ...prev, [serviceId]: comment }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Feedback submitted:", {
      orderId: id,
      itemRatings: ratings,
      itemComments: comments,
      overallRating,
      overallComment,
    });

    toast.success("Thank you for your feedback!");

    toast.success("You've earned 50 loyalty points for your feedback!");

    setTimeout(() => {
      navigate("/orders");
    }, 2000);
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link to={`/order/${id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Order Details
          </Link>
        </Button>

        <h1 className="text-3xl font-bold mb-2">Leave Feedback</h1>
        <p className="text-muted-foreground mb-8">Order ID: {order.id}</p>

        <form onSubmit={handleSubmit}>
          <div className="space-y-8">
            {order.items.map((item) => (
              <Card key={item.serviceId}>
                <CardHeader>
                  <CardTitle>{item.serviceName}</CardTitle>
                  <CardDescription>
                    Provided by {item.providerName}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Rating</Label>
                    <div className="flex items-center mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={cn(
                            "h-6 w-6 cursor-pointer",
                            star <= (ratings[item.serviceId] || 0)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-muted-foreground"
                          )}
                          onClick={() =>
                            handleRatingChange(item.serviceId, star)
                          }
                        />
                      ))}
                      <span className="ml-2 text-sm text-muted-foreground">
                        {ratings[item.serviceId]
                          ? `${ratings[item.serviceId]} out of 5`
                          : "Click to rate"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor={`comment-${item.serviceId}`}>
                      Comments
                    </Label>
                    <Textarea
                      id={`comment-${item.serviceId}`}
                      placeholder="Share your experience with this service..."
                      className="mt-1"
                      value={comments[item.serviceId] || ""}
                      onChange={(e) =>
                        handleCommentChange(item.serviceId, e.target.value)
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card>
              <CardHeader>
                <CardTitle>Overall Experience</CardTitle>
                <CardDescription>
                  Tell us about your overall experience with this order
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Overall Rating</Label>
                  <div className="flex items-center mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={cn(
                          "h-6 w-6 cursor-pointer",
                          star <= overallRating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-muted-foreground"
                        )}
                        onClick={() => setOverallRating(star)}
                      />
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground">
                      {overallRating
                        ? `${overallRating} out of 5`
                        : "Click to rate"}
                    </span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="overall-comment">Comments</Label>
                  <Textarea
                    id="overall-comment"
                    placeholder="Share your overall experience with this order..."
                    className="mt-1"
                    value={overallComment}
                    onChange={(e) => setOverallComment(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit">Submit Feedback</Button>
              </CardFooter>
            </Card>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderFeedback;
