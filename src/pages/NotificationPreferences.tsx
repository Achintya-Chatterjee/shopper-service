import { useState } from "react";
import { Header } from "@/components/Header";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Bell, Mail, MessageSquare, Phone } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/sonner";

const NotificationPreferences = () => {
  const [emailPreferences, setEmailPreferences] = useState({
    orderConfirmation: true,
    orderUpdates: true,
    orderCompleted: true,
    orderFeedback: true,
    promotions: false,
    newsletter: false,
    loyaltyUpdates: true,
  });

  const [pushPreferences, setPushPreferences] = useState({
    orderConfirmation: true,
    orderUpdates: true,
    orderCompleted: true,
    loyaltyUpdates: true,
    promotions: false,
  });

  const [smsPreferences, setSmsPreferences] = useState({
    orderConfirmation: false,
    orderUpdates: false,
    orderCompleted: false,
  });

  const handleEmailChange = (key: keyof typeof emailPreferences) => {
    setEmailPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handlePushChange = (key: keyof typeof pushPreferences) => {
    setPushPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSmsChange = (key: keyof typeof smsPreferences) => {
    setSmsPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = () => {
    toast.success("Notification preferences saved successfully");
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/account">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Account
          </Link>
        </Button>

        <h1 className="text-3xl font-bold mb-2">Notification Preferences</h1>
        <p className="text-muted-foreground mb-8">
          Manage how you receive notifications
        </p>

        <Tabs defaultValue="email" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="email" className="flex items-center">
              <Mail className="h-4 w-4 mr-2" /> Email
            </TabsTrigger>
            <TabsTrigger value="push" className="flex items-center">
              <Bell className="h-4 w-4 mr-2" /> Push
            </TabsTrigger>
            <TabsTrigger value="sms" className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" /> SMS
            </TabsTrigger>
          </TabsList>

          <TabsContent value="email">
            <Card>
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
                <CardDescription>
                  Manage your email notification preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <h3 className="font-medium">Order Updates</h3>
                  <div className="grid gap-3">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="email-order-confirmation"
                        className="flex-1"
                      >
                        Order confirmation
                        <p className="text-sm text-muted-foreground">
                          Receive emails when your order is placed
                        </p>
                      </Label>
                      <Switch
                        id="email-order-confirmation"
                        checked={emailPreferences.orderConfirmation}
                        onCheckedChange={() =>
                          handleEmailChange("orderConfirmation")
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-order-updates" className="flex-1">
                        Order status updates
                        <p className="text-sm text-muted-foreground">
                          Receive emails when your order status changes
                        </p>
                      </Label>
                      <Switch
                        id="email-order-updates"
                        checked={emailPreferences.orderUpdates}
                        onCheckedChange={() =>
                          handleEmailChange("orderUpdates")
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-order-completed" className="flex-1">
                        Order completion
                        <p className="text-sm text-muted-foreground">
                          Receive emails when your order is completed
                        </p>
                      </Label>
                      <Switch
                        id="email-order-completed"
                        checked={emailPreferences.orderCompleted}
                        onCheckedChange={() =>
                          handleEmailChange("orderCompleted")
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-order-feedback" className="flex-1">
                        Feedback requests
                        <p className="text-sm text-muted-foreground">
                          Receive emails requesting feedback after an order
                        </p>
                      </Label>
                      <Switch
                        id="email-order-feedback"
                        checked={emailPreferences.orderFeedback}
                        onCheckedChange={() =>
                          handleEmailChange("orderFeedback")
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t space-y-4">
                  <h3 className="font-medium">Marketing & Promotions</h3>
                  <div className="grid gap-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-promotions" className="flex-1">
                        Promotions and deals
                        <p className="text-sm text-muted-foreground">
                          Receive emails about special offers and promotions
                        </p>
                      </Label>
                      <Switch
                        id="email-promotions"
                        checked={emailPreferences.promotions}
                        onCheckedChange={() => handleEmailChange("promotions")}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-newsletter" className="flex-1">
                        Newsletter
                        <p className="text-sm text-muted-foreground">
                          Receive our monthly newsletter with updates and
                          articles
                        </p>
                      </Label>
                      <Switch
                        id="email-newsletter"
                        checked={emailPreferences.newsletter}
                        onCheckedChange={() => handleEmailChange("newsletter")}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t space-y-4">
                  <h3 className="font-medium">Loyalty Program</h3>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-loyalty" className="flex-1">
                      Loyalty program updates
                      <p className="text-sm text-muted-foreground">
                        Receive emails about your loyalty points and rewards
                      </p>
                    </Label>
                    <Switch
                      id="email-loyalty"
                      checked={emailPreferences.loyaltyUpdates}
                      onCheckedChange={() =>
                        handleEmailChange("loyaltyUpdates")
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="push">
            <Card>
              <CardHeader>
                <CardTitle>Push Notifications</CardTitle>
                <CardDescription>
                  Manage your push notification preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <h3 className="font-medium">Order Updates</h3>
                  <div className="grid gap-3">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="push-order-confirmation"
                        className="flex-1"
                      >
                        Order confirmation
                        <p className="text-sm text-muted-foreground">
                          Receive notifications when your order is placed
                        </p>
                      </Label>
                      <Switch
                        id="push-order-confirmation"
                        checked={pushPreferences.orderConfirmation}
                        onCheckedChange={() =>
                          handlePushChange("orderConfirmation")
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="push-order-updates" className="flex-1">
                        Order status updates
                        <p className="text-sm text-muted-foreground">
                          Receive notifications when your order status changes
                        </p>
                      </Label>
                      <Switch
                        id="push-order-updates"
                        checked={pushPreferences.orderUpdates}
                        onCheckedChange={() => handlePushChange("orderUpdates")}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="push-order-completed" className="flex-1">
                        Order completion
                        <p className="text-sm text-muted-foreground">
                          Receive notifications when your order is completed
                        </p>
                      </Label>
                      <Switch
                        id="push-order-completed"
                        checked={pushPreferences.orderCompleted}
                        onCheckedChange={() =>
                          handlePushChange("orderCompleted")
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t space-y-4">
                  <h3 className="font-medium">Promotions and Loyalty</h3>
                  <div className="grid gap-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="push-promotions" className="flex-1">
                        Promotions and deals
                        <p className="text-sm text-muted-foreground">
                          Receive notifications about special offers
                        </p>
                      </Label>
                      <Switch
                        id="push-promotions"
                        checked={pushPreferences.promotions}
                        onCheckedChange={() => handlePushChange("promotions")}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="push-loyalty" className="flex-1">
                        Loyalty program updates
                        <p className="text-sm text-muted-foreground">
                          Receive notifications about your loyalty points and
                          rewards
                        </p>
                      </Label>
                      <Switch
                        id="push-loyalty"
                        checked={pushPreferences.loyaltyUpdates}
                        onCheckedChange={() =>
                          handlePushChange("loyaltyUpdates")
                        }
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sms">
            <Card>
              <CardHeader>
                <CardTitle>SMS Notifications</CardTitle>
                <CardDescription>
                  Manage your text message notification preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 mb-4">
                  <Label className="flex items-center">
                    <Phone className="h-4 w-4 mr-2" /> Phone Number
                  </Label>
                  <div className="flex items-center gap-2">
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    <Button variant="outline" size="sm">
                      Update
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Order Updates</h3>
                  <div className="grid gap-3">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="sms-order-confirmation"
                        className="flex-1"
                      >
                        Order confirmation
                        <p className="text-sm text-muted-foreground">
                          Receive text messages when your order is placed
                        </p>
                      </Label>
                      <Switch
                        id="sms-order-confirmation"
                        checked={smsPreferences.orderConfirmation}
                        onCheckedChange={() =>
                          handleSmsChange("orderConfirmation")
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="sms-order-updates" className="flex-1">
                        Order status updates
                        <p className="text-sm text-muted-foreground">
                          Receive text messages when your order status changes
                        </p>
                      </Label>
                      <Switch
                        id="sms-order-updates"
                        checked={smsPreferences.orderUpdates}
                        onCheckedChange={() => handleSmsChange("orderUpdates")}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="sms-order-completed" className="flex-1">
                        Order completion
                        <p className="text-sm text-muted-foreground">
                          Receive text messages when your order is completed
                        </p>
                      </Label>
                      <Switch
                        id="sms-order-completed"
                        checked={smsPreferences.orderCompleted}
                        onCheckedChange={() =>
                          handleSmsChange("orderCompleted")
                        }
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-end">
          <Button onClick={handleSave}>Save Preferences</Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationPreferences;
