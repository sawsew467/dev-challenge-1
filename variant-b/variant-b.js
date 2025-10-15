console.log('Adding How it works section to Ramp homepage');

// Wait for the hero section to be available
const heroSection = document.querySelector('#hero-section');
if (heroSection && heroSection.parentElement) {
  // Create and insert the How it works section
  const howItWorksSection = (
    <section className="cf:bg-white cf:py-16 cf:md:pt-24 cf:lg:pt-32">
      <div className="cf:mx-auto cf:w-full max-w-screen-2xl cf:px-4 cf:md:px-8 cf:lg:px-12 cf:xl:px-16">
        <div className="cf:text-center cf:mb-12 cf:lg:mb-16">
          <h2 className="cf:text-4xl cf:lg:text-5xl cf:font-normal cf:tracking-tight cf:mb-4 cf:text-[oklch(0.1465_0.0057_69.2)]">
            How it works
          </h2>
          <p className="cf:text-base cf:lg:text-lg cf:text-[oklch(0.1465_0.0057_69.2/0.6)] cf:max-w-2xl cf:mx-auto">
            Get started with Ramp in three simple steps
          </p>
        </div>

        <div className="cf:grid cf:grid-cols-1 cf:md:grid-cols-3 cf:gap-8 cf:lg:gap-12">
          <Step
            number="1"
            title="Sign up in minutes"
            description="Create your account and connect your business information. No lengthy paperwork or complicated."
          />
          <Step
            number="2"
            title="Issue cards instantly"
            description="Get virtual and physical cards for your team with custom spending limits and automated controls."
          />
          <Step
            number="3"
            title="Save time and money"
            description="Watch as Ramp automates expense tracking, accounting, and finds ways to reduce your spending."
          />
        </div>
      </div>
    </section>
  );

  // Insert after hero section's parent container
  const heroContainer = heroSection.parentElement;
  heroContainer.insertAdjacentElement('afterend', howItWorksSection);

  console.log('How it works section added successfully');

  // Emit variantRendered event after successful insertion
  window.CFQ = window.CFQ || [];
  window.CFQ.push({ emit: 'variantRendered' });
} else {
  console.error('Hero section not found');
}

// JSX component for each step
function Step({ number, title, description }) {
  return (
    <div className="cf:flex cf:flex-col  cf:items-center  cf:text-center  cf:gap-4">
      <div className="cf:w-12 cf:h-12 cf:flex-shrink-0 cf:rounded-full cf:bg-[oklch(0.9199_0.2009_113.99)] cf:flex cf:items-center cf:justify-center">
        <span className="cf:text-xl cf:font-medium cf:text-[oklch(0.1465_0.0057_69.2)]">
          {number}
        </span>
      </div>
      <div className="cf:flex cf:flex-col cf:items-center ">
        <h3 className="cf:text-xl cf:lg:text-2xl cf:font-normal cf:mb-3 cf:text-[oklch(0.1465_0.0057_69.2)]  cf:text-center">
          {title}
        </h3>
        <p className="cf:text-base cf:text-[oklch(0.1465_0.0057_69.2/0.6)] cf:leading-relaxed  cf:text-center">
          {description}
        </p>
      </div>
    </div>
  );
}