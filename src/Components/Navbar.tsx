import React, {MouseEvent, useEffect, useState} from "react";
import {Menu, X} from "lucide-react";

// Define types for props
interface NavItem {
    href: string;
    label: string;
}

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false); // State for mobile menu visibility
    const [scrolled, setScrolled] = useState<boolean>(false); // State to track scroll position
    const [activeSection, setActiveSection] = useState<string>("Home"); // Active section based on scroll

    // Define navigation items
    const navItems: NavItem[] = [
        { href: "#Home", label: "Home" },
        { href: "#About", label: "About" },
        { href: "#Portofolio", label: "Portofolio" },
        { href: "#Contact", label: "Contact" },
    ];

    // Scroll event handler
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20); // Set the scrolled state based on window scroll position

            // Determine active section based on scroll position
            const sections = navItems
                .map((item) => {
                    const section = document.querySelector(item.href) as HTMLElement; // Casting to HTMLElement
                    if (section) {
                        return {
                            id: item.href.replace("#", ""),
                            offset: section.offsetTop - 550,
                            height: section.offsetHeight,
                        };
                    }
                    return null; // Return null if section is not found
                })
                .filter((section) => section !== null); // Filter out any null sections

            const currentPosition = window.scrollY;
            const active = sections.find((section) => {
                if (section) {
                    return (
                        currentPosition >= section.offset &&
                        currentPosition < section.offset + section.height
                    );
                }
                return false;
            });

            if (active) {
                setActiveSection(active.id); // Set active section
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Call initially to set active section
        return () => window.removeEventListener("scroll", handleScroll);
    }, [navItems]);

    // Lock/Unlock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "unset";
    }, [isOpen]);

    // Smooth scrolling function
    const scrollToSection = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const section = document.querySelector(href) as HTMLElement; // Casting to HTMLElement
        if (section) {
            const top = section.offsetTop - 100;
            window.scrollTo({
                top: top,
                behavior: "smooth",
            });
        }
        setIsOpen(false); // Close mobile menu after selection
    };

    return (
        <nav
            className={`fixed w-full top-0 z-50 transition-all duration-500 ${
                isOpen
                    ? "bg-[#030014] opacity-100"
                    : scrolled
                        ? "bg-[#030014]/50 backdrop-blur-xl"
                        : "bg-transparent"
            }`}
        >
            <div className="mx-auto px-4 sm:px-6 lg:px-[10%]">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <a
                            href="#Home"
                            onClick={(e) => scrollToSection(e, "#Home")}
                            className="text-xl font-bold bg-gradient-to-r from-[#a855f7] to-[#6366f1] bg-clip-text text-transparent"
                        >
                            SlySL
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-8 flex items-center space-x-8">
                            {navItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    onClick={(e) => scrollToSection(e, item.href)}
                                    className="group relative px-1 py-2 text-sm font-medium"
                                >
                  <span
                      className={`relative z-10 transition-colors duration-300 ${
                          activeSection === item.href.substring(1)
                              ? "bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent font-semibold"
                              : "text-[#e2d3fd] group-hover:text-white"
                      }`}
                  >
                    {item.label}
                  </span>
                                    <span
                                        className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] transform origin-left transition-transform duration-300 ${
                                            activeSection === item.href.substring(1)
                                                ? "scale-x-100"
                                                : "scale-x-0 group-hover:scale-x-100"
                                        }`}
                                    />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`relative p-2 text-[#e2d3fd] hover:text-white transition-transform duration-300 ease-in-out transform ${
                                isOpen ? "rotate-90 scale-125" : "rotate-0 scale-100"
                            }`}
                        >
                            {isOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={`md:hidden h-2/5 fixed inset-0 bg-[#030014] transition-all duration-300 ease-in-out ${
                    isOpen
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-[-100%] pointer-events-none"
                }`}
                style={{ top: "64px" }}
            >
                <div className="flex flex-col h-full">
                    <div className="px-4 py-6 space-y-4 flex-1">
                        {navItems.map((item, index) => (
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={(e) => scrollToSection(e, item.href)}
                                className={`block px-4 py-3 text-lg font-medium transition-all duration-300 ease ${
                                    activeSection === item.href.substring(1)
                                        ? "bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent font-semibold"
                                        : "text-[#e2d3fd] hover:text-white"
                                }`}
                                style={{
                                    transitionDelay: `${index * 100}ms`,
                                    transform: isOpen ? "translateX(0)" : "translateX(50px)",
                                    opacity: isOpen ? 1 : 0,
                                }}
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
