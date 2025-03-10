// Initialize Lenis smooth scrolling
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: "vertical",
  gestureOrientation: "vertical",
  smoothWheel: true,
  smoothTouch: false,
  touchMultiplier: 2,
});

// Get parallax elements
const heroImage = document.querySelector(".hero-image");
const heroContent = document.querySelector(".hero-content");

// Parallax scroll function
function handleScroll(scrollPos) {
  // Parallax for hero image (very subtle movement)
  const imageSpeed = 0.1;
  const imageYPos = scrollPos * imageSpeed;
  heroImage.style.transform = `translate3d(0, ${imageYPos}px, 0) scale(1.1)`;

  // Parallax for hero text (slightly more movement)
  const textSpeed = 0.15;
  const textYPos = -scrollPos * textSpeed;
  const textRotation = 0;
  heroContent.style.transform = `translate3d(0, ${textYPos}px, 0) rotate(${textRotation}deg)`;
}

// Lenis scroll handler
lenis.on("scroll", ({ scroll }) => {
  requestAnimationFrame(() => {
    handleScroll(scroll);
  });
});

// Start the animation loop
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Register plugins
gsap.registerPlugin(TextPlugin, CustomEase);

// Create custom ease
CustomEase.create("custom", "M0,0 C0.4,0 0,1 1,1");

// Create a timeline for better control
const tl = gsap.timeline({
  defaults: { duration: 0.6, ease: "power2.out" },
});

// Hero Section Animations
tl.from("header", {
  y: -10,
  opacity: 0,
})
  .from(
    ".hero-image",
    {
      scale: 1.3,
      opacity: 0,
      duration: 1.2,
      ease: "custom",
      customEase: "M0,0 C0.25,0 0.35,1 1,1",
    },
    "-=0.2"
  )
  .from(
    ".magazine-category",
    {
      y: 20,
      opacity: 0,
    },
    "-=0.3"
  )
  .from(
    ".hero-title",
    {
      y: 30,
      opacity: 0,
    },
    "-=0.3"
  )
  .from(
    ".hero-description",
    {
      y: 20,
      opacity: 0,
    },
    "-=0.3"
  )
  .from(
    ".magazine-byline",
    {
      opacity: 0,
    },
    "-=0.3"
  )
  .from(
    ".magazine-issue",
    {
      opacity: 0,
    },
    "-=0.3"
  );

// / Project Grid Animations
// sap.utils.toArray(".project-row").forEach((row, i) => {
//  gsap.from(row, {
//    opacity: 0,
//    y: 30,
//    duration: 0.8,
//    ease: "power2.out",
//    scrollTrigger: {
//      trigger: row,
//      start: "top 80%",
//      end: "bottom 20%",
//      toggleActions: "play none none reverse",
//    },
//  });
// );
