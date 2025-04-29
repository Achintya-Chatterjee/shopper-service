import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import {
  serviceProviders,
  getProviderById,
  getServicesByProviderId,
} from "@/data/providers";
import { services } from "@/data/services";
import { ServiceCard } from "@/components/ServiceCard";
import { Star, ExternalLink, Mail, Phone, Globe, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const ProviderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const provider = getProviderById(id || "");
  const providerServices = provider
    ? getServicesByProviderId(provider.id, services)
    : [];

  if (!provider) {
    return (
      <div>
        <Header />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">Provider not found</h1>
          <p>The service provider you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />

      <div className="relative">
        <div className="h-64 w-full overflow-hidden">
          {provider.coverImage && (
            <img
              src={provider.coverImage}
              alt={`${provider.name} cover`}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row -mt-20 items-start md:items-end mb-6">
            <div className="w-32 h-32 rounded-lg overflow-hidden border-4 border-background bg-white flex-shrink-0 shadow-md">
              {provider.logo && (
                <img
                  src={provider.logo}
                  alt={provider.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="mt-4 md:mt-0 md:ml-6 pb-2 md:pb-6">
              <h1 className="text-3xl font-bold">{provider.name}</h1>
              <div className="flex items-center mt-1 space-x-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 font-medium">{provider.rating}</span>
                </div>
                <span className="text-muted-foreground">
                  ({provider.reviewCount} reviews)
                </span>
                {provider.founded && (
                  <div>
                    <span className="text-muted-foreground">
                      Founded in {provider.founded}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="about" className="mb-12">
          <TabsList>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="contact">Contact Info</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold mb-4">
                  About {provider.name}
                </h2>
                <p className="text-lg mb-6">{provider.description}</p>

                <h3 className="text-xl font-semibold mb-3">Specialties</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {provider.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="bg-muted p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">
                    Contact Information
                  </h3>

                  {provider.contactInfo.email && (
                    <div className="flex items-center mb-3">
                      <Mail className="h-5 w-5 mr-2 text-muted-foreground" />
                      <a
                        href={`mailto:${provider.contactInfo.email}`}
                        className="text-primary hover:underline"
                      >
                        {provider.contactInfo.email}
                      </a>
                    </div>
                  )}

                  {provider.contactInfo.phone && (
                    <div className="flex items-center mb-3">
                      <Phone className="h-5 w-5 mr-2 text-muted-foreground" />
                      <a
                        href={`tel:${provider.contactInfo.phone}`}
                        className="hover:underline"
                      >
                        {provider.contactInfo.phone}
                      </a>
                    </div>
                  )}

                  {provider.contactInfo.website && (
                    <div className="flex items-center mb-3">
                      <Globe className="h-5 w-5 mr-2 text-muted-foreground" />
                      <a
                        href={provider.contactInfo.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center"
                      >
                        Website <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  )}

                  {provider.contactInfo.address && (
                    <div className="flex items-start mb-3">
                      <MapPin className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
                      <span>{provider.contactInfo.address}</span>
                    </div>
                  )}

                  {provider.socialMedia &&
                    Object.values(provider.socialMedia).some(Boolean) && (
                      <div className="mt-6">
                        <h4 className="text-sm font-medium mb-3 text-muted-foreground">
                          FOLLOW US ON
                        </h4>
                        <div className="flex space-x-4">
                          {provider.socialMedia.facebook && (
                            <a
                              href={provider.socialMedia.facebook}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:text-primary/80"
                            >
                              <svg
                                className="h-5 w-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                              </svg>
                            </a>
                          )}

                          {provider.socialMedia.twitter && (
                            <a
                              href={provider.socialMedia.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:text-primary/80"
                            >
                              <svg
                                className="h-5 w-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0 0 22 5.92a8.19 8.19 0 0 1-2.357.646 4.118 4.118 0 0 0 1.804-2.27 8.224 8.224 0 0 1-2.605.996 4.107 4.107 0 0 0-6.993 3.743 11.65 11.65 0 0 1-8.457-4.287 4.106 4.106 0 0 0 1.27 5.477A4.072 4.072 0 0 1 2.8 9.713v.052a4.105 4.105 0 0 0 3.292 4.022 4.095 4.095 0 0 1-1.853.07 4.108 4.108 0 0 0 3.834 2.85A8.233 8.233 0 0 1 2 18.407a11.616 11.616 0 0 0 6.29 1.84" />
                              </svg>
                            </a>
                          )}

                          {provider.socialMedia.instagram && (
                            <a
                              href={provider.socialMedia.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:text-primary/80"
                            >
                              <svg
                                className="h-5 w-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 0 1 1.772 1.153 4.902 4.902 0 0 1 1.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 0 1-1.153 1.772 4.902 4.902 0 0 1-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 0 1-1.772-1.153 4.902 4.902 0 0 1-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 0 1 1.153-1.772A4.902 4.902 0 0 1 5.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 0 0-.748-1.15 3.098 3.098 0 0 0-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 1 1 0 10.27 5.135 5.135 0 0 1 0-10.27zm0 1.802a3.333 3.333 0 1 0 0 6.666 3.333 3.333 0 0 0 0-6.666zm5.338-3.205a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z" />
                              </svg>
                            </a>
                          )}

                          {provider.socialMedia.linkedin && (
                            <a
                              href={provider.socialMedia.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:text-primary/80"
                            >
                              <svg
                                className="h-5 w-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                              </svg>
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="services" className="mt-6">
            <h2 className="text-2xl font-bold mb-4">
              Services by {provider.name}
            </h2>
            {providerServices.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  This provider doesn't have any services available at the
                  moment.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {providerServices.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="contact" className="mt-6">
            <h2 className="text-2xl font-bold mb-6">Contact {provider.name}</h2>
            <div className="max-w-2xl">
              <div className="bg-muted p-6 rounded-lg mb-6">
                <h3 className="text-lg font-medium mb-4">
                  Contact Information
                </h3>

                {provider.contactInfo.email && (
                  <div className="flex items-center mb-3">
                    <Mail className="h-5 w-5 mr-2 text-muted-foreground" />
                    <a
                      href={`mailto:${provider.contactInfo.email}`}
                      className="text-primary hover:underline"
                    >
                      {provider.contactInfo.email}
                    </a>
                  </div>
                )}

                {provider.contactInfo.phone && (
                  <div className="flex items-center mb-3">
                    <Phone className="h-5 w-5 mr-2 text-muted-foreground" />
                    <a
                      href={`tel:${provider.contactInfo.phone}`}
                      className="hover:underline"
                    >
                      {provider.contactInfo.phone}
                    </a>
                  </div>
                )}

                {provider.contactInfo.website && (
                  <div className="flex items-center mb-3">
                    <Globe className="h-5 w-5 mr-2 text-muted-foreground" />
                    <a
                      href={provider.contactInfo.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center"
                    >
                      {provider.contactInfo.website}{" "}
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                )}

                {provider.contactInfo.address && (
                  <div className="flex items-start mb-3">
                    <MapPin className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
                    <span>{provider.contactInfo.address}</span>
                  </div>
                )}
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-lg font-medium mb-4">Send a Message</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Your Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Your Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="I need information about..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Your message here..."
                    />
                  </div>
                  <Button className="w-full">Send Message</Button>
                </form>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProviderDetail;
