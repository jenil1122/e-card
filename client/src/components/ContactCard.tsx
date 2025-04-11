import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { generateVCF, detectDevice } from "@/lib/vcf";

interface SocialLink {
  name: string;
  icon: string;
  url: string;
}

const ContactCard = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Contact Data
  const contactData = {
    name: "New Abra Ka Dabra",
    title: "Harish Patel",
    phone: [
      { number: "+919892139878", display: "+91 9892139878" },
      { number: "+919004149999", display: "+91 9004149999" }
    ],
    workPhone: "+912225797924",
    email: "hirji.newabrakadabra@gmail.com",
    website: "",
    location: "Shop No.70, Galleria Shopping Mall, Hiranandani Gardens, Powai, Mumbai - 400072, Maharashtra, India",
    address: "https://maps.google.com/?q=Shop No.70, Galleria Shopping Mall, Hiranandani Gardens, Powai, Mumbai",
    hours: "Open 10AM–10PM, All Days (Sat–Sun too!)",
    description: "📱 Mobile Phones | Tablets | Accessories | Covers 💼\nBest deals on latest gadgets and premium accessories",
    photo: "https://jenil1122.github.io/Contact/logo.png"
  };

  // Social Media Links
  const socialLinks: SocialLink[] = [
    { name: "Instagram", icon: "instagram", url: "https://www.instagram.com/newabrakadabra70" }
  ];

  const handleGenerateContact = async () => {
    setIsGenerating(true);
    
    try {
      setTimeout(async () => {
        const device = detectDevice();
        await generateVCF(contactData, device);
        
        setIsSuccess(true);
        toast({
          title: "Contact Ready!",
          description: device === 'android' 
            ? "Contact should open automatically in your contacts app." 
            : "VCF file has been prepared for download.",
          duration: 3000,
        });
        
        // Reset button state after 3 seconds
        setTimeout(() => {
          setIsGenerating(false);
          setIsSuccess(false);
        }, 3000);
      }, 1500);
    } catch (error) {
      console.error("Error generating contact:", error);
      toast({
        title: "Error",
        description: "Failed to generate contact. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
      setIsGenerating(false);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.8,
        ease: "easeOut"
      }
    })
  };

  return (
    <motion.div
      className="max-w-lg mx-auto my-8 bg-deep-black gold-border rounded-xl overflow-hidden shadow-lg py-8 px-6"
      style={{ boxShadow: "0 4px 14px rgba(212, 175, 55, 0.3)" }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
    >
      {/* Profile Section */}
      <div className="flex flex-col items-center">
        <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-rich-gold p-1 mb-4 bg-black">
          <img 
            src={contactData.photo} 
            alt="Profile Photo" 
            className="rounded-full object-contain w-full h-full" 
          />
        </div>
        
        <h1 className="text-2xl font-bold font-serif text-rich-gold mt-2 shimmer">
          {contactData.name}
        </h1>
        <p className="text-muted-gold tracking-wide text-sm mt-1">
          {contactData.title}
        </p>
        
        <div className="h-px w-24 bg-rich-gold opacity-50 my-6"></div>
      </div>
      
      {/* Contact Information */}
      <motion.div 
        className="space-y-4 mt-4"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        custom={1}
      >
        {/* Description */}
        <div className="text-center mb-4">
          <p className="text-white">{contactData.description}</p>
        </div>
        
        {/* Mobile Phone */}
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center gold-border">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-rich-gold" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
          </div>
          <div className="pt-1 flex-1">
            <p className="text-sm text-muted-gold">Mobile</p>
            <div className="space-y-1">
              {contactData.phone.map((phone, index) => (
                <a 
                  key={index} 
                  href={`tel:${phone.number}`} 
                  className="text-white text-sm leading-tight block hover:text-rich-gold transition-colors"
                >
                  {phone.display}
                </a>
              ))}
            </div>
            <p className="text-xs text-muted-gold mt-1 italic">Click on number to call now</p>
          </div>
        </div>
        
        {/* Work Phone */}
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center gold-border">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-rich-gold" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
          </div>
          <div className="pt-1">
            <p className="text-sm text-muted-gold">Landline Number</p>
            <a 
              href={`tel:${contactData.workPhone}`} 
              className="text-white text-sm leading-tight block hover:text-rich-gold transition-colors"
            >
              {contactData.workPhone}
            </a>
            <p className="text-xs text-muted-gold mt-1 italic">Click on number to call now</p>
          </div>
        </div>
        
        {/* Email */}
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center gold-border">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-rich-gold" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>
          <div className="pt-1">
            <p className="text-sm text-muted-gold">Email</p>
            <a 
              href={`mailto:${contactData.email}`} 
              className="text-white text-sm leading-tight block hover:text-rich-gold transition-colors"
            >
              {contactData.email}
            </a>
          </div>
        </div>
        
        {/* Hours */}
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center gold-border">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-rich-gold" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="pt-1">
            <p className="text-sm text-muted-gold">Hours</p>
            <p className="text-white text-sm leading-tight">{contactData.hours}</p>
          </div>
        </div>
        
        {/* Location */}
        <div className="flex space-x-3">
          <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center gold-border">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-rich-gold" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-gold">Location</p>
            <a 
              href={contactData.address} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white break-words text-sm leading-tight block hover:text-rich-gold transition-colors"
            >
              {contactData.location}
            </a>
          </div>
        </div>
      </motion.div>
      
      {/* Social Media Links */}
      <motion.div 
        className="flex flex-col items-center mt-8"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        custom={2}
      >
        <div className="flex justify-center space-x-5">
          {socialLinks.map((social, index) => (
            <a 
              key={index}
              href={social.url} 
              className="w-12 h-12 rounded-full gold-border flex items-center justify-center hover:bg-rich-gold hover:text-deep-black transition-all"
              aria-label={social.name}
            >
              <i className={`fab fa-${social.icon} text-2xl text-rich-gold`}></i>
            </a>
          ))}
        </div>
        <p className="text-xs text-muted-gold mt-3 italic">Follow us on social media</p>
      </motion.div>
      
      {/* Save Contact Button */}
      <motion.div 
        className="mt-10"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        custom={3}
      >
        <button 
          onClick={handleGenerateContact}
          disabled={isGenerating || isSuccess}
          className={`w-full py-3 px-6 rounded-lg font-bold font-sans transition-all flex items-center justify-center border border-rich-gold
          ${isSuccess ? 'bg-green-600 text-white' : 
            isGenerating ? 'bg-deep-black text-rich-gold' : 
            'bg-rich-gold text-deep-black hover:bg-deep-black hover:text-rich-gold'}`}
        >
          {isSuccess ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Contact Ready!</span>
            </>
          ) : isGenerating ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-rich-gold" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
                <path d="M16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
              </svg>
              <span>Save Contact</span>
            </>
          )}
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ContactCard;
