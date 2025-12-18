import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NavLink: React.FC<{ href: string, children: React.ReactNode }> = ({ href, children }) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        // Si es un enlace de ancla (empieza con #)
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const element = document.getElementById(targetId);
            if (element) {
                const headerOffset = 100; // Altura del header
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
        // Si es un enlace a otra página, dejar que el navegador maneje la navegación
    };

    return (
        <motion.a
            // @ts-ignore
            href={href}
            // @ts-ignore
            onClick={handleClick}
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
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        onClick(); // Cerrar el menú móvil
        
        // Si es un enlace de ancla (empieza con #)
        if (href.startsWith('#')) {
            e.preventDefault();
            // Pequeño delay para que el menú se cierre antes del scroll
            setTimeout(() => {
                const targetId = href.substring(1);
                const element = document.getElementById(targetId);
                if (element) {
                    const headerOffset = 100; // Altura del header
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        }
        // Si es un enlace a otra página, dejar que el navegador maneje la navegación
    };

    return (
        <motion.a
            // @ts-ignore
            href={href}
            // @ts-ignore
            onClick={handleClick}
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
                    <a 
                        href="/" 
                        className="flex items-center z-50"
                        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                            // Si estamos en la página principal, hacer scroll suave al inicio
                            if (window.location.pathname === '/' || window.location.pathname === '') {
                                e.preventDefault();
                                const element = document.getElementById('inicio');
                                if (element) {
                                    window.scrollTo({
                                        top: 0,
                                        behavior: 'smooth'
                                    });
                                } else {
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }
                            }
                            // Si estamos en otra página, dejar que el navegador navegue normalmente
                        }}
                    >
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
                        <NavLink href="/#inicio">Inicio</NavLink>
                        <NavLink href="/#proyectos">Proyectos</NavLink>
                        <NavLink href="/#equipo">Equipo</NavLink>
                        <motion.a
                            // @ts-ignore
                            href="/#contact"
                            // @ts-ignore
                            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                e.preventDefault();
                                const element = document.getElementById('contact');
                                if (element) {
                                    const headerOffset = 100;
                                    const elementPosition = element.getBoundingClientRect().top;
                                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                                    window.scrollTo({
                                        top: offsetPosition,
                                        behavior: 'smooth'
                                    });
                                }
                            }}
                            // @ts-ignore
                            className="text-noir text-xs uppercase tracking-wider font-medium px-4 py-2"
                            whileHover={{ scale: 1.05, filter: 'brightness(1.1)' }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            Contacto
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
                            <MobileNavLink href="/#inicio" onClick={toggleMobileMenu}>Inicio</MobileNavLink>
                            <MobileNavLink href="/#proyectos" onClick={toggleMobileMenu}>Proyectos</MobileNavLink>
                            <MobileNavLink href="/#equipo" onClick={toggleMobileMenu}>Equipo</MobileNavLink>
                            <motion.a
                                // @ts-ignore
                                href="/#contact"
                                // @ts-ignore
                                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                    toggleMobileMenu();
                                    e.preventDefault();
                                    setTimeout(() => {
                                        const element = document.getElementById('contact');
                                        if (element) {
                                            const headerOffset = 100;
                                            const elementPosition = element.getBoundingClientRect().top;
                                            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                                            window.scrollTo({
                                                top: offsetPosition,
                                                behavior: 'smooth'
                                            });
                                        }
                                    }, 100);
                                }}
                                // @ts-ignore
                                className="text-noir text-xl font-serif mt-8 px-8 py-4"
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 },
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Contacto
                            </motion.a>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;