import { useEffect } from "react";
import gsap from "gsap";

// A moving cursor effect

const Cursor = () => {
    useEffect(() => {
        const cursor = document.querySelector(".cursor");

        if (cursor) {
            // Move the cursor with the mouse
            window.addEventListener("mousemove", (e) => {
                gsap.to(cursor, {
                    x: e.pageX - 15,
                    y: e.pageY - 15,
                    duration: 0.2,
                    delay: 0.03,
                    ease: "power3.out",
                });
            });

        // A Magic effect when double Cliked on scremn
          window.addEventListener("dblclick", () => {
            gsap.to(cursor, {
                scale: 0.2, // Shrink first
                duration: 0.2,
                ease: "power2.out",
                onComplete: () => {
                    gsap.to(cursor, {
                        scale: 10,
                        duration: 0.8,
                        ease: "power4.inOut",
                        backgroundColor: "transparent",
                        onComplete: () => {
                            gsap.to(cursor, {
                                scale: 1, 
                                duration: 0.5,
                                ease: "power3.out",
                                backgroundColor: "transparent",
                            });
                        },
                    });
                },
            });
        });
            // Scale the cursor on hover over inputs or headings
            const hoverElements = document.querySelectorAll("input, h1, p, button");
            hoverElements.forEach((el) => {
                el.addEventListener("mouseenter", () => {
                    gsap.to(cursor, {
                        scale: 1.5,
                        duration: 0.5,
                        delay: 0.1,
                        ease: "power3.out",
                    });
                });

                el.addEventListener("mouseleave", () => {
                    gsap.to(cursor, {
                        scale: 1,
                        delay: 0.1,    
                        duration: 0.5,
                        ease: "power3.out",
                    });
                });
            });
        }
    }, []);

    return <div className="cursor pointer-events-none bg-transparent border border-black w-[30px] h-[30px] rounded-full absolute z-50"></div>;
};

export default Cursor;