import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';

const NavLink: React.FC<{ href: string, children: React.ReactNode }> = ({ href, children }) => {
    return (
        <motion.a 
            href={href} 
            className="relative text-sm uppercase tracking-wider text-cloud/70 hover:text-cloud transition-colors duration-300"
            whileHover="hover"
            initial="rest"
        >
            {children}
            <motion.div 
                className="absolute bottom-[-4px] left-0 right-0 h-px bg-camel"
                variants={{
                    rest: { scaleX: 0 },
                    hover: { scaleX: 1 }
                }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                style={{ transformOrigin: 'left' }}
            />
        </motion.a>
    )
}

const MobileNavLink: React.FC<{ href: string, children: React.ReactNode, onClick: () => void }> = ({ href, children, onClick }) => {
    return (
         <motion.a
            href={href}
            onClick={onClick}
            className="text-3xl font-serif text-cloud/80 hover:text-cloud transition-colors duration-300"
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
            }}
        >
            {children}
        </motion.a>
    )
}


const Header: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 50);
    });

    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

    const mobileMenuVariants = {
        hidden: {
            opacity: 0,
            transition: { when: "afterChildren", staggerChildren: 0.1, staggerDirection: -1 }
        },
        visible: {
            opacity: 1,
            transition: { when: "beforeChildren", staggerChildren: 0.15 }
        }
    };

    return (
        <>
            <motion.header
                className="fixed top-0 left-0 right-0 z-50 w-full"
                initial={false}
                animate={{
                    backgroundColor: scrolled ? 'rgba(18, 18, 18, 0.8)' : 'rgba(18, 18, 18, 0)',
                    backdropFilter: scrolled ? 'blur(10px)' : 'blur(0px)',
                }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
                <div className={`container mx-auto px-6 py-5 flex justify-between items-center border-b transition-colors duration-300 ${scrolled ? 'border-cloud/10' : 'border-transparent'}`}>
                    <a href="/" className="flex items-center z-50">
                        <img 
                            src="/Noble-logo-blanco.png" 
                            alt="Noble Architecture Studio" 
                            className="h-8 w-auto"
                        />
                    </a>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <NavLink href="/about">About</NavLink>
                        <NavLink href="/#process">Process</NavLink>
                        <NavLink href="/#portfolio">Portfolio</NavLink>
                        <motion.a 
                            href="/#contact" 
                            className="bg-camel text-noir text-sm uppercase tracking-wider font-medium px-6 py-3"
                            whileHover={{ scale: 1.05, filter: 'brightness(1.1)' }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            Contact
                        </motion.a>
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden z-50">
                         <motion.button 
                            onClick={toggleMobileMenu} 
                            className="w-8 h-8 relative focus:outline-none"
                            animate={mobileMenuOpen ? "open" : "closed"}
                            aria-label="Toggle navigation menu"
                            aria-expanded={mobileMenuOpen}
                        >
                            <motion.span
                                className="absolute h-0.5 w-6 bg-cloud block rounded-full"
                                variants={{
                                    closed: { top: '35%', rotate: 0 },
                                    open: { top: '50%', y: '-50%', rotate: 45 },
                                }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                            />
                            <motion.span
                                className="absolute h-0.5 w-6 bg-cloud block rounded-full"
                                variants={{
                                    closed: { top: '65%', rotate: 0 },
                                    open: { top: '50%', y: '-50%', rotate: -45 },
                                }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                            />
                        </motion.button>
                    </div>
                </div>
            </motion.header>
            
            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        className="fixed inset-0 bg-noir/95 backdrop-blur-lg z-40 flex flex-col justify-center items-center md:hidden"
                        variants={mobileMenuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        <nav className="flex flex-col items-center space-y-8">
                            <MobileNavLink href="/about" onClick={toggleMobileMenu}>About</MobileNavLink>
                            <MobileNavLink href="/#process" onClick={toggleMobileMenu}>Process</MobileNavLink>
                            <MobileNavLink href="/#portfolio" onClick={toggleMobileMenu}>Portfolio</MobileNavLink>
                            <motion.a 
                                href="/#contact" 
                                onClick={toggleMobileMenu}
                                className="bg-camel text-noir text-xl font-serif mt-8 px-8 py-4"
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 },
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Contact
                            </motion.a>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;