import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
    const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
    const [cursorVariant, setCursorVariant] = useState('default');

    useEffect(() => {
        const mouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', mouseMove);

        return () => {
            window.removeEventListener('mousemove', mouseMove);
        };
    }, []);

    useEffect(() => {
        const handleMouseDown = () => setCursorVariant('click');
        const handleMouseUp = () => setCursorVariant('default');

        const handleMouseEnter = (e: MouseEvent) => {
            if ( (e.target as Element).closest('a, button')) {
                 setCursorVariant('hover');
            }
        };

        const handleMouseLeave = (e: MouseEvent) => {
             if ( (e.target as Element).closest('a, button')) {
                setCursorVariant('default');
            }
        };

        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mouseover', handleMouseEnter);
        document.addEventListener('mouseout', handleMouseLeave);
        
        return () => {
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mouseover', handleMouseEnter);
            document.removeEventListener('mouseout', handleMouseLeave);
        };

    }, []);

    const variants = {
        default: {
            x: mousePosition.x - 8,
            y: mousePosition.y - 8,
            width: 16,
            height: 16,
            backgroundColor: 'rgba(242, 242, 241, 0.5)',
            mixBlendMode: 'difference',
        },
        hover: {
            x: mousePosition.x - 20,
            y: mousePosition.y - 20,
            width: 40,
            height: 40,
            backgroundColor: 'rgba(185, 166, 149, 0.3)',
            mixBlendMode: 'normal',
        },
        click: {
            x: mousePosition.x - 12,
            y: mousePosition.y - 12,
            width: 24,
            height: 24,
            backgroundColor: 'rgba(185, 166, 149, 0.5)',
            mixBlendMode: 'normal',
        }
    };

    return (
        <motion.div
            className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:block"
            variants={variants}
            animate={cursorVariant}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
    );
};

export default CustomCursor;