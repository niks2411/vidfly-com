"use client";

import { motion } from "framer-motion";

export const Animated: React.FC<{
    children: React.ReactNode;
    delay?: number;
    className?: string;
    direction?: "up" | "down" | "left" | "right";
    duration?: number;
}> = ({
    children,
    delay = 0,
    className = "",
    direction = "up",
    duration = 0.7
}) => {
        const variants = {
            hidden: {
                opacity: 0,
                y: direction === "up" ? 24 : direction === "down" ? -24 : 0,
                x: direction === "left" ? 24 : direction === "right" ? -24 : 0,
            },
            visible: {
                opacity: 1,
                y: 0,
                x: 0,
                transition: {
                    duration,
                    delay: delay / 1000,
                    ease: "easeOut"
                }
            }
        };

        return (
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10% 0px" }}
                variants={variants as any}
                className={className}
                style={{ willChange: "opacity, transform" }} // Hint for GPU
            >
                {children}
            </motion.div>
        );
    };

