import { useState } from "react";
import { Header } from "@/components/Header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, Calendar, Gift, History, Ticket } from "lucide-react";

const LoyaltyProgram = () => {
  const [currentPoints] = useState(750);
  const [tierPoints] = useState(750);
  const [activeCoupons] = useState([
    {
      id: "coupon-1",
      code: "LOYALTY10",
      discount: "10% off",
      expires: "May 15, 2025",
    },
    {
      id: "coupon-2",
      code: "FREESHIP",
      discount: "Free Shipping",
      expires: "June 30, 2025",
    },
  ]);

  const [pointsHistory] = useState([
    {
      id: "hist-1",
      date: "April 15, 2025",
      points: 50,
      description: "Feedback on Order #order-3",
    },
    {
      id: "hist-2",
      date: "April 1, 2025",
      points: 200,
      description: "Order #order-2 completed",
    },
    {
      id: "hist-3",
      date: "March 15, 2025",
      points: 500,
      description: "Order #order-1 completed",
    },
  ]);

  const tierSystem = [
    {
      name: "Bronze",
      threshold: 0,
      benefits: ["Access to exclusive offers", "Birthday gift"],
    },
    {
      name: "Silver",
      threshold: 500,
      benefits: [
        "5% discount on all services",
        "Priority support",
        "Free shipping",
      ],
    },
    {
      name: "Gold",
      threshold: 1000,
      benefits: [
        "10% discount on all services",
        "VIP support",
        "Free shipping",
        "Early access to new services",
      ],
    },
    {
      name: "Platinum",
      threshold: 2000,
      benefits: [
        "15% discount on all services",
        "Dedicated account manager",
        "Free shipping",
        "Exclusive services",
      ],
    },
  ];

  const rewards = [
    {
      id: "reward-1",
      name: "10% Off Coupon",
      points: 200,
      image: "/placeholder.svg",
    },
    {
      id: "reward-2",
      name: "Free Service Upgrade",
      points: 500,
      image: "/placeholder.svg",
    },
    {
      id: "reward-3",
      name: "$25 Service Credit",
      points: 1000,
      image: "/placeholder.svg",
    },
  ];

  const getCurrentTier = () => {
    let currentTier = tierSystem[0];
    for (let i = tierSystem.length - 1; i >= 0; i--) {
      if (tierPoints >= tierSystem[i].threshold) {
        currentTier = tierSystem[i];
        break;
      }
    }
    return currentTier;
  };

  const getNextTier = () => {
    const currentTierIndex = tierSystem.findIndex(
      (tier) => tier.name === getCurrentTier().name
    );
    if (currentTierIndex < tierSystem.length - 1) {
      return tierSystem[currentTierIndex + 1];
    }
    return null;
  };

  const currentTier = getCurrentTier();
  const nextTier = getNextTier();

  const pointsToNextTier = nextTier ? nextTier.threshold - tierPoints : 0;
  const progressToNextTier = nextTier
    ? (tierPoints / nextTier.threshold) * 100
    : 100;

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Loyalty Program</h1>
        <p className="text-muted-foreground mb-8">
          Earn rewards for using our services
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="mr-2 h-5 w-5" />
                  Your Loyalty Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold">{currentTier.name}</h3>
                    <p className="text-muted-foreground">{tierPoints} points</p>
                  </div>
                  {nextTier && (
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        Next Tier: {nextTier.name}
                      </p>
                      <p className="text-sm font-medium">
                        {pointsToNextTier} points needed
                      </p>
                    </div>
                  )}
                </div>

                {nextTier && (
                  <div className="mb-6">
                    <Progress value={progressToNextTier} className="h-2" />
                  </div>
                )}

                <div>
                  <h4 className="font-medium mb-2">Your Benefits</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {currentTier.benefits.map((benefit, index) => (
                      <li key={index} className="text-sm">
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="rewards" className="mt-6">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="rewards">Available Rewards</TabsTrigger>
                <TabsTrigger value="coupons">Your Coupons</TabsTrigger>
                <TabsTrigger value="history">Points History</TabsTrigger>
              </TabsList>

              <TabsContent value="rewards" className="space-y-4 mt-4">
                <h3 className="text-lg font-medium">Redeem Your Points</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {rewards.map((reward) => (
                    <Card key={reward.id}>
                      <CardContent className="p-4">
                        <div className="aspect-square bg-muted rounded-md mb-3 flex items-center justify-center">
                          <Gift className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h4 className="font-medium">{reward.name}</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          {reward.points} points
                        </p>
                        <Button
                          variant="outline"
                          className="w-full"
                          disabled={currentPoints < reward.points}
                        >
                          {currentPoints >= reward.points
                            ? "Redeem"
                            : "Not Enough Points"}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="coupons" className="space-y-4 mt-4">
                <h3 className="text-lg font-medium">Your Active Coupons</h3>
                {activeCoupons.length > 0 ? (
                  <div className="space-y-4">
                    {activeCoupons.map((coupon) => (
                      <Card key={coupon.id}>
                        <CardContent className="p-4 flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{coupon.discount}</h4>
                            <p className="text-xs text-muted-foreground">
                              Expires: {coupon.expires}
                            </p>
                          </div>
                          <div className="bg-muted px-3 py-2 rounded-md">
                            <code className="text-sm font-medium">
                              {coupon.code}
                            </code>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    You have no active coupons.
                  </p>
                )}
              </TabsContent>

              <TabsContent value="history" className="space-y-4 mt-4">
                <h3 className="text-lg font-medium">Points History</h3>
                {pointsHistory.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <History className="h-4 w-4 text-muted-foreground mr-2" />
                        <div>
                          <p className="font-medium">{item.description}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.date}
                          </p>
                        </div>
                      </div>
                      <span className="font-medium text-green-600">
                        +{item.points}
                      </span>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Ticket className="mr-2 h-5 w-5" />
                  Current Points
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <p className="text-4xl font-bold">{currentPoints}</p>
                  <p className="text-muted-foreground">Available Points</p>
                </div>

                <div className="space-y-4 mt-4">
                  <h4 className="font-medium">Ways to Earn Points</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>
                        Complete a service order:{" "}
                        <span className="font-medium">100-500 points</span>
                      </span>
                    </li>
                    <li className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>
                        Leave feedback:{" "}
                        <span className="font-medium">50 points</span>
                      </span>
                    </li>
                    <li className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>
                        Refer a friend:{" "}
                        <span className="font-medium">200 points</span>
                      </span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Refer a Friend</CardTitle>
                <CardDescription>
                  Earn 200 points when they make their first purchase
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Get Referral Link</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyProgram;
