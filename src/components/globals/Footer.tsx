import { Instagram, Facebook } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";
import { AnimatedButton } from "../ui/AnimatedButton";
import { RouterConstantUtil } from "@/lib/RouterConstantUtils";
import { useNavigate } from "react-router-dom";

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  delay?: number;
}

const FooterLink: React.FC<FooterLinkProps> = ({
  href,
  children,
  delay = 0,
}) => {
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="w-full"
    >
      <motion.a
        href={href}
        className="text-[#FFFFFF] hover:text-primary transition-colors duration-300  cursor-pointer text-nowrap text-start no-underline w-full font-medium text-[15px]"
        whileHover={{ x: 5 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.a>
    </motion.li>
  );
};

interface SocialIconProps {
  href: string;
  icon: React.ReactNode;
  delay?: number;
}

const SocialIcon: React.FC<SocialIconProps> = ({ href, icon, delay = 0 }) => {
  return (
    <motion.a
      href={href}
      className="w-12 h-12 border-[.8px] border-solid border-slate-700  rounded-full flex items-center justify-center hover:bg-brandprimary transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      viewport={{ once: true }}
    >
      {icon}
    </motion.a>
  );
};

interface FooterSectionProps {
  title?: string;
  children: React.ReactNode;
  delay?: number;
}

const FooterSection: React.FC<FooterSectionProps> = ({
  title,
  children,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
    >
      {title && (
        <motion.h3
          className="text-[#D3D8DE] font-bold mb-6 text-[12px] capitalize tracking-wider"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: delay + 0.2 }}
          viewport={{ once: true }}
        >
          {title}
        </motion.h3>
      )}
      {children}
    </motion.div>
  );
};

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const footerLinks = {
    services: [
      { name: "Home", href: "/" },
      { name: "About us", href: RouterConstantUtil.page.about },
    ],
    booking: [
      { name: "Booking", href: RouterConstantUtil.page.mybookings },
      { name: "Privacy Policy", href: RouterConstantUtil.page.privacy },
    ],
    contact: [
      { name: "Contact", href: "/contact" },
      { name: "Report an issue", href: RouterConstantUtil.page.report },
    ],
    messages: [
      { name: "Messages", href: RouterConstantUtil.page.messages },
      {
        name: "Cancellation Policy",
        href: RouterConstantUtil.page.cancellation,
      },
    ],
  };

  const contactInfo = {
    phone: "+1 891 989-11-91",
    email: "info@logoipsum.com",
  };

  return (
    <footer className="bg-[#1E2B3A] text-white px-4 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            className="flex flex-col justify-between h-full"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div>
              <motion.div
                className="flex items-center space-x-2 mb-8"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-8 h-8 flex items-center justify-center">
                  <img
                    src="/logo.png"
                    className="w-8 h-8"
                    alt="Handy Me Logo"
                  />
                </div>
                <span className="text-lg font-medium">Handy_me</span>
              </motion.div>
            </div>

            <div className="w-full mb-5 lg:mb-1  lg:max-w-xl lg:mt-5">
              <AnimatedButton
                onClick={() => navigate(RouterConstantUtil.page.auth.login)}
                className="rounded-full"
              >
                Become an Artisan
              </AnimatedButton>
            </div>

            {/* Bottom Section - Social Icons */}
            <div className="flex space-x-4 mt-auto">
              <SocialIcon
                href="#"
                icon={<Facebook className="w-5 h-5" color="white" />}
                delay={0.1}
              />
              <SocialIcon
                href="#"
                icon={<Instagram className="w-5 h-5" color="white" />}
                delay={0.2}
              />
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col justify-start h-full "
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <FooterSection title="Services" delay={0.3}>
              <div className="grid grid-cols-2 md:grid-cols-4 ">
                <ul className="space-y-4 list-none   text-start p-0 m-0">
                  {footerLinks.services.map((link, index) => (
                    <FooterLink
                      key={link.name}
                      href={link.href}
                      delay={0.4 + index * 0.1}
                    >
                      {link.name}
                    </FooterLink>
                  ))}
                </ul>

                <ul className="space-y-4 list-none text-start p-0 m-0">
                  {footerLinks.booking.map((link, index) => (
                    <FooterLink
                      key={link.name}
                      href={link.href}
                      delay={0.6 + index * 0.1}
                    >
                      {link.name}
                    </FooterLink>
                  ))}
                </ul>

                <ul className="space-y-4 list-none text-start p-0 m-0">
                  {footerLinks.contact.map((link, index) => (
                    <FooterLink
                      key={link.name}
                      href={link.href}
                      delay={0.8 + index * 0.1}
                    >
                      {link.name}
                    </FooterLink>
                  ))}
                </ul>

                <ul className="space-y-4 list-none text-start p-0 m-0">
                  {footerLinks.messages.map((link, index) => (
                    <FooterLink
                      key={link.name}
                      href={link.href}
                      delay={1.0 + index * 0.1}
                    >
                      {link.name}
                    </FooterLink>
                  ))}
                </ul>
              </div>
            </FooterSection>

            <div className="w-full mt-20">
              <motion.div
                className="w-12 h-[2px] bg-brandprimary mb-6"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                viewport={{ once: true }}
              />
              <div className="space-y-2">
                <motion.p
                  className="text-white text-[16px] m-0 p-0 leading-tight"
                  whileHover={{ x: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  {contactInfo.email}
                </motion.p>
                <motion.div
                  className="flex justify-between items-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.3 }}
                  viewport={{ once: true }}
                >
                  <motion.p
                    className="text-white  text-[16px] m-0 p-0 leading-tight"
                    whileHover={{ x: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {contactInfo.phone}
                  </motion.p>
                  <motion.p
                    className="text-gray-400 text-[12px] m-0 p-0"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.4 }}
                    viewport={{ once: true }}
                  >
                    © {new Date(Date.now()).getFullYear()} — Copyright
                  </motion.p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
