particlesJS("particles-js", {
    particles: {
        //!
        number: { value: 15 0, density: { enable: true, value_area: 800 } },
        color: { value: "#ffff27" },
        shape: { type: "circle" },
        opacity: { value: 1 },
        size: { value: 0 },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            out_mode: "bounce"
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "grab" },
            onclick: { enable: true, mode: "push" }
        },
        modes: {
            grab: { distance: 200, line_linked: { opacity: 1 } },
            push: { particles_nb: 4 }
        }
    },
    retina_detect: true
});
