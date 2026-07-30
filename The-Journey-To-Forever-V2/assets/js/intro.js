const beginJourneyBtn = document.getElementById("beginJourneyBtn");

beginJourneyBtn.addEventListener("click", () => {

    const tl = gsap.timeline();

    tl.to(".intro-content",{
        y:-60,
        opacity:0,
        duration:1,
        ease:"power2.inOut"
    });

    tl.to("#intro",{
        autoAlpha:0,
        duration:.8
    });

    tl.to("#envelope",{
        autoAlpha:1,
        duration:1
    });

    tl.from(".envelope-wrapper",{
        y:80,
        opacity:0,
        scale:.8,
        duration:1.2,
        ease:"power3.out"
    });

});