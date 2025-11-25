import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NavLink: React.FC<{ href: string, children: React.ReactNode }> = ({ href, children }) => {
    return (
        <motion.a 
            // @ts-ignore
            href={href} 
            // @ts-ignore
            className="relative text-xs uppercase tracking-wider transition-colors duration-300 text-noir"
            whileHover={{
                opacity: 0.8
            }}
            initial="rest"
        >
            {children}
            <motion.div 
                // @ts-ignore
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
            // @ts-ignore
            href={href}
            // @ts-ignore
            onClick={onClick}
            // @ts-ignore
            className="text-3xl font-serif text-noir/80 hover:text-noir transition-colors duration-300"
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
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
                // @ts-ignore
                className="fixed top-0 left-0 right-0 z-50 w-full"
                style={{
                    backgroundColor: 'rgba(242, 242, 241, 0.05)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)'
                }}
            >
                <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                    <a href="/" className="flex items-center z-50">
                        <img 
                            src="/Noble-logo-blanco.png" 
                            alt="Noble Architecture Studio" 
                            className="h-20 md:h-24 w-auto"
                            style={{
                                filter: 'invert(1) brightness(0.15) contrast(1.2)'
                            }}
                        />
                    </a>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center space-x-6">
                        <NavLink href="/about">About</NavLink>
                        <NavLink href="/#process">Process</NavLink>
                        <NavLink href="/#portfolio">Portfolio</NavLink>
                        <motion.a 
                            // @ts-ignore
                            href="/#contact" 
                            // @ts-ignore
                            className="text-noir text-xs uppercase tracking-wider font-medium px-4 py-2"
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
                            // @ts-ignore
                            onClick={toggleMobileMenu} 
                            // @ts-ignore
                            className="w-7 h-7 relative focus:outline-none"
                            animate={mobileMenuOpen ? "open" : "closed"}
                            aria-label="Toggle navigation menu"
                            aria-expanded={mobileMenuOpen}
                        >
                            <motion.span
                                // @ts-ignore
                                className="absolute h-0.5 w-5 block rounded-full bg-noir"
                                variants={{
                                    closed: { top: '35%', rotate: 0 },
                                    open: { top: '50%', y: '-50%', rotate: 45 },
                                }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                            />
                            <motion.span
                                // @ts-ignore
                                className="absolute h-0.5 w-5 block rounded-full bg-noir"
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
                        // @ts-ignore
                        className="fixed inset-0 bg-cloud/95 backdrop-blur-lg z-40 flex flex-col justify-center items-center md:hidden"
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
                                // @ts-ignore
                                href="/#contact" 
                                // @ts-ignore
                                onClick={toggleMobileMenu}
                                // @ts-ignore
                                className="text-noir text-xl font-serif mt-8 px-8 py-4"
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