// Test Configuration
let testInfo = {
  name: `CF XX - Ramp Homepage: Enhanced Hero Headline for Automation Value Prop`,
};

// Initialize test and exit if already running
let testInitiated = initTest(testInfo);
if (!testInitiated) return false;

// Main Code
monitorChangesByConditionAndRun(checkForElements, onElementsFound);

// === MAIN FUNCTIONS ===

function onElementsFound() {
  // Code to Run
  console.log(`Running Code for: `, testInfo.name, testInfo);
  document
    .querySelector(`body`)
    ?.setAttribute(`cf-test-active`, testInfo.name);

  // Find the hero headline element
  const heroHeadline = document.querySelector('h1.leading-trim.headline-xl.text-primaryReverse');
  
  if (heroHeadline) {
    // Clear existing content and add new compelling headline
    heroHeadline.innerHTML = '';
    
    // Create new headline with line break for visual hierarchy
    const line1 = document.createTextNode('Automate finance.');
    const lineBreak = document.createElement('br');
    const line2 = document.createTextNode('Accelerate growth.');
    
    heroHeadline.appendChild(line1);
    heroHeadline.appendChild(lineBreak);
    heroHeadline.appendChild(line2);
    
    console.log('Hero headline successfully updated');
  } else {
    console.error('Hero headline element not found');
    return; // Exit early if headline not found
  }

  // Add "How It Works" section
  addHowItWorksSection();
  
  // Inform Coframe SDK variant has successfully finished rendering
  window.CFQ = window.CFQ || [];
  window.CFQ.push({ emit: 'variantRendered' });
}

function addHowItWorksSection() {
  // Find the section after hero (the logo wall section)
  const logoWallSection = document.querySelector('.hidden.md\\:block.md\\:bg-white.lg\\:bg-transparent');
  
  if (!logoWallSection) {
    console.error('Could not find insertion point for How It Works section');
    return;
  }
  
  // Create the How It Works section using JSX
  const howItWorksSection = (
    <section className="cf:bg-white cf:py-20 cf:border-t cf:border-gray-100">
      <div className="cf:mx-auto cf:w-full cf:max-w-screen-2xl cf:px-4 cf:md:px-8 cf:lg:px-12 cf:xl:px-16">
        <div className="cf:text-center cf:mb-12">
          <div className="cf:text-sm cf:font-medium cf:text-gray-500 cf:uppercase cf:tracking-wider cf:mb-4">
            How It Works
          </div>
          <h2 className="cf:text-4xl cf:font-normal cf:text-gray-900 cf:mb-4">
            Get up and running in minutes
          </h2>
          <p className="cf:text-lg cf:text-gray-600 cf:max-w-2xl cf:mx-auto">
            Join thousands of companies automating their finances with Ramp
          </p>
        </div>
        
        <div className="cf:grid cf:grid-cols-1 cf:md:grid-cols-3 cf:gap-8 cf:mt-16">
          <StepCard 
            number="1"
            title="Connect your systems"
            description="Link your ERP, HRIS, and accounting tools in minutes. No complex setup required."
            icon={IntegrationIcon()}
          />
          <StepCard 
            number="2"
            title="Set your policies"
            description="Define spending rules, approval workflows, and controls that enforce themselves automatically."
            icon={PolicyIcon()}
          />
          <StepCard 
            number="3"
            title="Watch savings grow"
            description="See immediate time and cost savings as Ramp automates expenses, bills, and accounting."
            icon={GrowthIcon()}
          />
        </div>
        
        <div className="cf:text-center cf:mt-12">
          <a 
            href="/see-a-demo" 
            className="cf:inline-flex cf:items-center cf:justify-center cf:px-8 cf:py-4 cf:bg-black cf:text-white cf:rounded-lg cf:font-medium cf:text-lg cf:transition-all cf:hover:bg-gray-800 cf:hover:shadow-lg cf:shadow-md"
          >
            See how it works
            <svg className="cf:ml-2 cf:w-5 cf:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
  
  // Insert the section before the logo wall
  logoWallSection.parentNode?.insertBefore(howItWorksSection, logoWallSection);
  console.log('How It Works section successfully added');
}

// Component for individual step cards
function StepCard({ number, title, description, icon }) {
  const iconContainer = document.createElement('div');
  iconContainer.className = "cf:inline-flex cf:items-center cf:justify-center cf:w-16 cf:h-16 cf:rounded-full cf:bg-gradient-to-br cf:from-[#f6fab2] cf:to-[#f4f894] cf:mb-4 cf:shadow-sm";
  iconContainer.innerHTML = icon;
  
  return (
    <div className="cf:relative cf:text-center cf:p-6 cf:transition-all cf:hover:scale-105">
      <div className="cf:mb-6">
        {iconContainer}
        <div className="cf:text-xs cf:font-semibold cf:text-gray-400 cf:uppercase cf:tracking-wider cf:mb-2">
          Step {number}
        </div>
      </div>
      <h3 className="cf:text-xl cf:font-medium cf:text-gray-900 cf:mb-3">
        {title}
      </h3>
      <p className="cf:text-base cf:text-gray-600 cf:leading-relaxed">
        {description}
      </p>
    </div>
  );
}

// SVG Icon Components
function IntegrationIcon() {
  return `
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 6C4 4.89543 4.89543 4 6 4H9L11 6H18C19.1046 6 20 6.89543 20 8V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6Z" 
            stroke="#374151" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 10V16M12 16L9 13M12 16L15 13" 
            stroke="#374151" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
}

function PolicyIcon() {
  return `
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 11L12 14L22 4" 
            stroke="#374151" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M21 12V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H16" 
            stroke="#374151" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
}

function GrowthIcon() {
  return `
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 22L3 13" 
            stroke="#374151" stroke-width="2" stroke-linecap="round"/>
      <path d="M8 22L8 10" 
            stroke="#374151" stroke-width="2" stroke-linecap="round"/>
      <path d="M13 22L13 7" 
            stroke="#374151" stroke-width="2" stroke-linecap="round"/>
      <path d="M18 22L18 4" 
            stroke="#374151" stroke-width="2" stroke-linecap="round"/>
      <path d="M21 2L18 5L15 2" 
            stroke="#374151" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
}

function checkForElements() {
  // Check for required elements before running code
  try {
    const cfDefined = typeof window.CF !== "undefined";
    console.log("Check: typeof window.CF !== 'undefined' =>", cfDefined);

    const testActiveSelector = `body[cf-test-active="${testInfo.name}"]`;
    const testActiveElem = document.querySelector(testActiveSelector);
    const testActiveAbsent = !testActiveElem;
    console.log(`Check: !document.querySelector('${testActiveSelector}') =>`, testActiveAbsent);

    // Check for the hero headline element
    const heroHeadlineSelector = 'h1.leading-trim.headline-xl.text-primaryReverse';
    const heroHeadlineElem = document.querySelector(heroHeadlineSelector);
    const heroHeadlineExists = !!heroHeadlineElem;
    console.log(`Check: document.querySelector('${heroHeadlineSelector}') =>`, heroHeadlineExists);

    return cfDefined && testActiveAbsent && heroHeadlineExists;
  } catch (e) {
    console.error("Check error:", e);
    return false;
  }
}

// === HELPER FUNCTIONS ===

function monitorChangesByConditionAndRun(check, code, keepChecking = false) {
  let checkAndRun = () =>
    check() && (!keepChecking && observer.disconnect(), code());
  var observer = new MutationObserver(checkAndRun);
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
  checkAndRun(); // Run once immediately

  // 10s observer killswitch
  if (!keepChecking) setTimeout(() => observer.disconnect(), 10000);
}

function initTest() {
  // Obtain or Create Object For Tests
  let cfObj = window.CF || { qaTesting: false, testsRunning: [] };

  // Check Whether Test Is Already Running
  if (cfObj.testsRunning.find((test) => test.name == testInfo.name)) {
    console.warn(`The following test is already running: `, testInfo);
    return false;
  }

  // Add Test to List of Running Tests
  cfObj.testsRunning = [...cfObj.testsRunning, testInfo];

  // Update Global Object
  window.CF = { ...window.CF, ...cfObj };

  return { ...window.CF };
}