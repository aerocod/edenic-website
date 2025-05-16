"use client";

import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"
import React, { useEffect, useState } from "react";
import Select from "react-select";

interface Country {
  cca2: string; // Country code
  name: {
    common: string; // Country name
  };
}

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const [countries, setCountries] = useState<{ value: string; label: string }[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<{ value: string; label: string } | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle menu
  const navigationLinks = [
    { name: "About", href: "#about" },
    { name: "Why Us", href: "#why-us" },
    { name: "Products", href: "#products" },
    { name: "Why Edenic", href: "#why-edenic" },
    { name: "Contact", href: "#contact-form" },
  ];

  type CountryOption = {
  value: string;
  label: string;
};

type FormData = {
  name: string;
  email: string;
  company: string;
  country: CountryOption | null;
  message: string;
};

const [formData, setFormData] = useState<FormData>({
  name: "",
  email: "",
  company: "",
  country: null,
  message: "",
});

const handleCountryChange = (selectedOption: CountryOption | null) => {
  setFormData({ ...formData, country: selectedOption });
};

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  // Validate form fields
  if (!formData.name || !formData.email || !formData.company || !formData.country || !formData.message) {
    alert("Please fill in all the fields!");
    return;
  }

  // Generate the subject line
  const subject = `Inquiries to Ederic from ${formData.name}`;

  // Create a cleaner, readable body without leading newline
  const body = `Name: ${formData.name}
Email: ${formData.email}
Company: ${formData.company}
Country: ${formData.country?.label || "Not specified"}

Message:
${formData.message}`;

  // Generate the Gmail-specific link
  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=edenicid@gmail.com&su=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  // Open the Gmail link in a new tab
  window.open(gmailLink, "_blank");
};
  

  // State to track if the component is mounted
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Set to true after the component mounts

    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const countryOptions = data
          .map((country: any) => ({
            value: country.cca2 || "N/A", // Fallback for missing code
            label: country.name?.common || "Unknown Country", // Fallback for missing name
          }))
          .sort((a: { value: string; label: string }, b: { value: string; label: string }) =>
            a.label.localeCompare(b.label)
          ); // Sort alphabetically by the label
        setCountries(countryOptions);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  if (!isMounted) {
    // Render nothing on the server
    return null;
  }

  return (
    <div className="flex   flex-col min-h-screen">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 bg-transparent">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/edenic-logo.jpg" // Path to your logo
            alt="Edenic Logo"
            width={80} // Set explicit width
            height={80} // Set explicit height
            className="h-16 w-auto" // Ensures proper scaling
            priority // Ensures the logo loads quickly
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {navigationLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-white text-sm md:text-base hover:text-[#8B4513] transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Icon */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Open Menu"
          className="text-white text-lg md:hidden focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-0 left-0 right-0 bg-[#8B4513] text-white p-6 md:hidden shadow-lg z-20">
          <button
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close Menu"
            className="absolute top-4 right-4 text-white text-2xl"
          >
            ✕
          </button>
          <nav className="flex flex-col space-y-4 mt-6">
            {navigationLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-white text-base hover:text-gray-200 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>


      {/* Hero Section */}
      <section className="relative h-screen">
      {/* Background Image */}
      <Image
        src="/hero.png" // Path to your hero image
        alt="Mountain landscape with green fields"
        fill
        className="object-cover"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-bold max-w-4xl tracking-wide">
          Premium Spices, Straight from the Heart of Indonesia
        </h1>

        {/* Subheadline */}
        <p className="mt-4 text-lg md:text-xl max-w-3xl">
          Edenic delivers the finest quality fresh and dried ginger to global markets — naturally grown, carefully harvested, and reliably exported.
        </p>

        {/* CTA Button */}
<button
  className="mt-6 px-8 py-3 text-lg font-semibold rounded-md transition-colors"
  style={{
    backgroundColor: "#8B3E2F",
    color: "#FFFFFF",
  }}
  onClick={() => setShowPopup(true)} // This should set the `showPopup` state to `true`
>
  Contact Us
</button>
      </div>
    </section> 
      {/* About Section */}
      <section id="about" className="py-20 bg-gray-100">
  <div className="container mx-auto px-5 md:px-[100px]">
    <div className="flex flex-col md:flex-row items-center gap-12">
      <div className="md:w-1/2">
        <div
          className="relative w-full md:w-auto"
          style={{
            width: "100%",
            maxWidth: "400px",
            height: "auto",
            aspectRatio: "1 / 1",
          }}
        >
          <Image
            src="/edenic-logo.jpg"
            alt="Modern farming techniques"
            layout="responsive"
            width={1}
            height={1}
            className="rounded-lg object-cover"
          />
        </div>
      </div>
      <div className="md:w-1/2">
        <div className="text-sm text-gray-500 mb-2">About Us</div>
        <h2 className="text-3xl font-bold mb-6">Rooted in Nature. Driven by Integrity.</h2>
        <p className="text-gray-600 mb-4">
          Edenic is a trusted Indonesian exporter of fresh and dried ginger, committed to sharing the richness of our soil with the world. Based in the heart of Indonesia’s fertile highlands, we partner with local farmers who follow sustainable agricultural practices. With a focus on quality, transparency, and consistency, Edenic ensures that every shipment meets international standards and satisfies our clients' needs.
        </p>
        <p className="text-gray-600">
          We believe in ethical farming that respects the environment and animals while producing nutritious food.
          Our commitment to sustainability guides everything we do, from seed to harvest.
        </p>
      </div>
    </div>
  </div>
        {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 text-center w-80">
            <h2 className="text-lg font-bold mb-4">Choose Contact Method</h2>
            <button
              className="w-full bg-green-500 text-white py-2 mb-3 rounded-md"
              onClick={() => window.open("https://wa.me/6281293185162", "_blank")}
            >
              WhatsApp
            </button>
            <button
              className="w-full bg-[#8B4513] text-white py-2 rounded-md"
              onClick={() => {
                setShowPopup(false); // Close the popup
                document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Email Us
            </button>
            <button
              className="w-full mt-3 text-gray-500"
              onClick={() => setShowPopup(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      </section>

      {/* Features Section */}
      <section id="why-us" className="py-16">
  <div className="container mx-auto px-5 md:px-[100px]">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold">Why Choose Us</h2>
      <p className="text-gray-600 mt-4">
        Discover what makes us the trusted choice for ginger exports worldwide.
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
      {[
        {
          icon: "/global.png",
          title: "10+ Years of Experience",
          description: "Distributing Ginger to Local and International Markets",
        },
        {
          icon: "/export.png",
          title: "20+ Tons",
          description: "Large Production Volume (20+ Tons / Week)",
        },
        {
          icon: "/countries.png",
          title: "10+ Countries",
          description:
            "We have shipped our product to India, Pakistan, Bangladesh, China, and many European Countries.",
        },
      ].map((feature, index) => (
        <div
          key={index}
          className="flex flex-col items-center bg-white shadow-md rounded-lg p-6"
        >
          <Image
            src={feature.icon || "/placeholder.svg"}
            alt={feature.title}
            width={60}
            height={60}
            className="mb-4"
          />
          <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
          <p className="text-gray-600 text-sm">{feature.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Products Section */}
      <section id="products" className="py-16 bg-gray-100">
  <div className="container mx-auto px-5 md:px-[100px]">
    <h2 className="text-center text-3xl font-bold mb-6">Our Products</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[
        { src: "/fresh-ginger.png", title: "Fresh Ginger" },
        { src: "/dried-ginger.png", title: "Dried Ginger (Sun-Dried)" },
      ].map((item, index) => (
        <div key={index} className="relative group overflow-hidden">
          {/* Parent container with square aspect ratio */}
          <div className="aspect-w-1 aspect-h-1 w-full">
            <Image
              src={item.src || "/placeholder.svg"}
              alt={item.title}
              width={300} // Fixed width for fallback
              height={300} // Fixed height for fallback
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          {/* Overlay with title */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <p className="text-white font-medium">{item.title}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Product - Fresh Ginger */}
      <section className="py-16">
  <div className="container mx-auto px-5 md:px-[100px]">
    <div className="flex flex-col md:flex-row items-center gap-12">
      {/* Text Section - 50% Width */}
      <div className="w-full md:w-1/2">
        <h2 className="text-3xl font-bold mb-6">Fresh Ginger</h2>
        <p className="text-gray-600 mb-6">
          Vibrant, aromatic, and full of flavor — our fresh ginger is carefully selected and packed to retain its natural freshness.
        </p>
        <ul className="space-y-2 text-gray-600">
          <li className="flex items-start">
            <span className="text-[#8B4513] mr-2">•</span>
            <span>Available sizes: 100g+</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#8B4513] mr-2">•</span>
            <span>Packaging: Mesh bag, carton box</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#8B4513] mr-2">•</span>
            <span>Shelf Life: 4–6 weeks with proper storage</span>
          </li>
        </ul>
      </div>

      {/* Image Section - 50% Width */}
      <div className="w-full md:w-1/2 flex justify-center">
        <div className="w-full max-w-[500px]">
          <Image
            src="/fresh-ginger.png"
            alt="Fresh Ginger"
            width={500}
            height={500}
            className="rounded-lg object-cover w-full"
          />
        </div>
      </div>
    </div>
  </div>
</section>

{/* Product - Dried Ginger */}
      <section className="py-16 bg-gray-100">
  <div className="container mx-auto px-5 md:px-[100px]">
    <div className="flex flex-col md:flex-row items-center gap-12">
      {/* Image Section - 50% Width */}
      <div className="w-full md:w-1/2 flex justify-center">
        <div className="w-full max-w-[500px]">
          <Image
            src="/dried-ginger.png"
            alt="Dried Ginger"
            width={500}
            height={500}
            className="rounded-lg object-cover w-full"
          />
        </div>
      </div>

      {/* Text Section - 50% Width */}
      <div className="w-full md:w-1/2">
        <h2 className="text-3xl font-bold mb-6">Dried Ginger (Sun-Dried)</h2>
        <p className="text-gray-600 mb-6">
          Our dried ginger offers concentrated flavor and longer shelf life, perfect for medicinal, culinary, or industrial use.
        </p>
        <ul className="space-y-2 text-gray-600">
          <li className="flex items-start">
            <span className="text-[#8B4513] mr-2">•</span>
            <span>Moisture Content: &lt;10%</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#8B4513] mr-2">•</span>
            <span>Packaging: PP bag, paper sack</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#8B4513] mr-2">•</span>
            <span>Shelf Life: 12 months</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>



      {/* Organic Products
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold mb-4">ORGANIC PRODUCTS</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Discover our range of fresh, organic products made with care from our farm to your table.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "MILK", image: "/placeholder.svg?height=200&width=200" },
              { name: "KEFIR", image: "/placeholder.svg?height=200&width=200" },
              { name: "GOAT CHEESE", image: "/placeholder.svg?height=200&width=200" },
              { name: "BUTTER", image: "/placeholder.svg?height=200&width=200" },
            ].map((product, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-center mb-4">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="h-[180px] object-contain"
                  />
                </div>
                <h3 className="text-center font-semibold mb-2">{product.name}</h3>
                <p className="text-center text-gray-600 text-sm">
                  Fresh organic {product.name.toLowerCase()} produced with traditional methods
                </p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Banner Section */}
      <section className="relative py-20">
        <Image src="/hero.png" alt="Cows grazing in field" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container mx-auto px-4 text-center">
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">
            Why Edenic?
          </h2>
        </div>
      </section>

      {/* What Sets Us Apart Section */}
      <section id="why-edenic" className="py-16">
  <div className="container mx-auto px-5 md:px-[100px]">
    <h2 className="text-center text-3xl font-bold mb-12">What Sets Us Apart</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {[
        {
          name: "Premium Quality",
          role: "Carefully selected and handled at every step.",
          picture: "/premium-quality.jpg",
        },
        {
          name: "Reliable Supply Chain",
          role: "From farm to port, with consistent delivery.",
          picture: "/supply-chain.png",
        },
        {
          name: "Export Expertise",
          role: "We understand documentation, compliance, and logistics.",
          picture: "/export-expertise.jpg",
        },
        {
          name: "Sustainable & Ethical",
          role: "We support local communities and the environment.",
          picture: "/farmer.png",
        },
      ].map((member, index) => (
        <div key={index} className="text-center">
          <div className="mb-4 relative overflow-hidden rounded-lg">
            <Image
              src={member.picture} // Custom profile picture
              alt={member.name}
              width={250}
              height={300}
              className="w-full h-[300px] object-cover"
            />
          </div>
          <h3 className="font-semibold">{member.name}</h3>
          <p className="text-gray-600 text-sm">{member.role}</p>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-20 bg-gray-50">
  <div className="container mx-auto px-5 md:px-[100px]">
    {/* Form Heading */}
    <div className="text-center mb-10">
      <h2 className="text-[#8B4513] text-sm font-semibold">Contact Us</h2>
      <h1 className="text-3xl md:text-4xl font-bold">Get in Touch with Edenic</h1>
      <p className="text-gray-600 mt-2">
        Interested in importing fresh or dried ginger from Indonesia?<br /> Let’s talk. Whether you're a wholesaler, distributor, or food processor, we're ready to serve your needs.
      </p>
    </div>

    {/* Form */}
    <form
      className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 md:p-10"
      onSubmit={handleSubmit}
    >
      {/* Name and Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
          />
        </div>
      </div>

      {/* Company */}
      <div className="mt-6">
        <label className="block text-gray-700 font-medium mb-1">Company</label>
        <input
          type="text"
          name="company"
          placeholder="Enter your company name"
          required
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
        />
      </div>

      {/* Country */}
      <div className="mt-6">
        <label className="block text-gray-700 font-medium mb-1">Select Your Country</label>
        <Select
          options={countries}
          value={formData.country}
          onChange={(selectedOption) => setFormData({ ...formData, country: selectedOption })}
          placeholder="Search for your country..."
          className="w-full"
          classNamePrefix="react-select"
        />
        {formData.country && (
          <p className="mt-2 text-gray-600">Selected Country: {formData.country.label}</p>
        )}
      </div>

      {/* Message */}
      <div className="mt-6">
        <label className="block text-gray-700 font-medium mb-1">Message</label>
        <textarea
          name="message"
          placeholder="Write your message here"
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
        ></textarea>
      </div>

      {/* Submit Button */}
      <div className="mt-6 text-center">
        <button
          type="submit"
          className="w-full md:w-auto px-8 py-4 bg-[#8B4513] text-white font-semibold rounded-lg shadow-md hover:bg-[#A0522D] transition-colors"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</section>

      {/* Footer */}
      <footer className="bg-[#8B4513] text-white py-12">
  <div className="container mx-auto px-5 md:px-[100px]">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Branding Section */}
      <div>
        <Link href="/" className="inline-block mb-4">
          <Image
            src="/edenic-logo.jpg" // Updated logo path
            alt="Edenic Logo"
            width={150}
            height={50}
            className="object-contain"
          />
        </Link>
        <p className="text-white mb-4">
          We provide premium quality fresh and dried ginger, directly from Indonesia to global markets. Committed to sustainability and ethical farming practices.
        </p>
      </div>

      {/* Contact Information Section */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">CONTACT US</h3>
        <p className="text-white mb-2">
          <span className="block">Email: <a href="mailto:edenicid@gmail.com" className="underline">edenicid@gmail.com</a></span>
          <span className="block">
            WhatsApp: 
            <a
              href="https://wa.me/62881293185162"
              target="_blank"
              rel="noopener noreferrer"
              className="underline ml-1"
            >
              +62-812-9318-5162
            </a>
          </span>
          <span className="block">
            WhatsApp: 
            <a
              href="https://wa.me/6285772274445"
              target="_blank"
              rel="noopener noreferrer"
              className="underline ml-1"
            >
              +62-857-7227-4445
            </a>
          </span>
        </p>
      </div>
    </div>

    <div className="border-t border-white mt-8 pt-8 text-center text-white text-sm">
      <p>
  Copyright © 2025 Edenic. All rights reserved. Designed by 
  <a 
    href="https://instagram.com/neilwebsite" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="underline ml-1"
  >
    @neilwebsite
  </a>.
</p>
    </div>
  </div>
</footer>

      {/* WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
  <button
    onClick={() => setShowPopup(true)} // Trigger the popup
    className="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
  </button>
</div>
    </div>
  )
}
