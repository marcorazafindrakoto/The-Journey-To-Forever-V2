/* ==========================================================
   ENVELOPE
========================================================== */

const seal = document.getElementById("waxSeal");
const flap = document.getElementById("envelopeFlap");
const letter = document.querySelector(".letter");
const invitation = document.getElementById("invitation");

if (seal && flap && letter) {

    gsap.set(letter, {
        y: 80
    });

    seal.addEventListener("click", () => {

        const tl = gsap.timeline();

        /* Seal */

        tl.to(seal, {

            scale: 0,

            opacity: 0,

            duration: .35,

            ease: "back.in(2)"

        });

        /* Flap */

        tl.to(flap, {

            rotationX: -180,

            transformOrigin: "50% 22%",

            duration: .9,

            ease: "power2.inOut"

        });

        /* Letter */

        tl.to(letter, {

            y: -180,

            duration: 1.3,

            ease: "power3.out"

        }, "-=.25");

        /* Zoom */

        tl.to(".envelope-wrapper", {

            scale: 1.08,

            duration: .8,

            ease: "power2.out"

        }, "<");

        /* Fade Envelope */

        tl.to("#envelope", {

            autoAlpha: 0,

            duration: .8

        }, "+=.4");

        /* Invitation */

        tl.to(invitation, {

            autoAlpha: 1,

            duration: .8

        }, "-=.2");

        /* Scroll */

        tl.call(() => {

            invitation.scrollIntoView({

                behavior: "smooth"

            });

        });

    });

}