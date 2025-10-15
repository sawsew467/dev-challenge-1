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

  // Add Feature Comparison Table section
  addComparisonSection();

  // Inform Coframe SDK variant has successfully finished rendering
  window.CFQ = window.CFQ || [];
  window.CFQ.push({ emit: 'variantRendered' });
}

function addComparisonSection() {
  // Find insertion point (after Ramp product suite section)
  const productSuiteSection = document.querySelector('section.bg-white.spacer-p-t-l');

  if (!productSuiteSection) {
    console.error('Could not find Ramp product suite section for comparison table insertion');
    return;
  }

  // Check if comparison section already exists
  if (document.querySelector('#cf-comparison-section')) {
    console.log('Comparison section already exists');
    return;
  }

  // Create the Feature Comparison section
  const comparisonSection = (
    <section id="cf-comparison-section" className="spacer-p-t-l cf:bg-white">
      <div className="cf:mx-auto cf:w-full cf:max-w-screen-2xl cf:px-4 cf:md:px-8 cf:lg:px-12 cf:xl:px-16 cf:py-12 cf:md:py-16 cf:lg:py-20">
        <div className="cf:text-center cf:mb-8 cf:md:mb-12">
          <div className="cf:text-xs cf:md:text-sm cf:font-medium cf:text-gray-500 cf:uppercase cf:tracking-wider cf:mb-3 cf:md:mb-4">
            Why Choose Ramp
          </div>
          <h2 className="cf:text-3xl cf:md:text-4xl cf:lg:text-5xl cf:font-normal cf:tracking-tight cf:mb-3 cf:md:mb-4 cf:text-gray-900 cf:px-4">
            Transform your finance operations
          </h2>
          <p className="cf:text-base cf:md:text-lg cf:text-gray-600 cf:max-w-2xl cf:mx-auto cf:px-4">
            See how Ramp eliminates the inefficiencies holding your finance team back
          </p>
        </div>

        {/* Mobile Card Layout */}
        <div className="cf:block cf:md:hidden cf:space-y-4 cf:px-2">
          {MobileComparisonCard({
            challenge: "Expense Reports",
            before: "Hours spent chasing receipts and manually entering data",
            after: "Auto-capture receipts with AI, instant submission"
          })}
          {MobileComparisonCard({
            challenge: "Bill Payments",
            before: "5+ days to process invoices with multiple approvals",
            after: "Process bills in seconds with automated workflows"
          })}
          {MobileComparisonCard({
            challenge: "Spending Control",
            before: "Discover out-of-policy spending after the fact",
            after: "Real-time controls that prevent overspending"
          })}
          {MobileComparisonCard({
            challenge: "Month-End Close",
            before: "2+ weeks of manual reconciliation and coding",
            after: "Close books 75% faster with automation"
          })}
          {MobileComparisonCard({
            challenge: "Vendor Management",
            before: "Scattered contracts, duplicate vendors, price creep",
            after: "Centralized vendor database with price intelligence"
          })}
          {MobileComparisonCard({
            challenge: "Financial Insights",
            before: "Outdated reports, no visibility into real-time spend",
            after: "Live dashboards with AI-powered insights"
          })}
        </div>

        {/* Desktop Table Layout */}
        <div className="cf:hidden cf:md:block cf:overflow-x-auto">
          <table className="cf:w-full cf:max-w-4xl cf:mx-auto cf:bg-white cf:rounded-lg cf:overflow-hidden">
            <thead className="cf:bg-gray-50">
              <tr>
                <th className="cf:text-left cf:p-4 cf:text-base cf:lg:text-lg cf:font-medium cf:text-gray-900 cf:w-1/3">
                  Challenge
                </th>
                <th className="cf:text-left cf:p-4 cf:text-base cf:lg:text-lg cf:font-medium cf:text-red-600 cf:w-1/3">
                  <div className="cf:flex cf:items-center cf:gap-2">
                    Before Ramp
                  </div>
                </th>
                <th className="cf:text-left cf:p-4 cf:text-base cf:lg:text-lg cf:font-medium cf:text-green-600 cf:w-1/3">
                  <div className="cf:flex cf:items-center cf:gap-2">
                    With Ramp
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {ComparisonRow({
                challenge: "Expense Reports",
                before: "Hours spent chasing receipts and manually entering data",
                after: "Auto-capture receipts with AI, instant submission"
              })}
              {ComparisonRow({
                challenge: "Bill Payments",
                before: "5+ days to process invoices with multiple approvals",
                after: "Process bills in seconds with automated workflows"
              })}
              {ComparisonRow({
                challenge: "Spending Control",
                before: "Discover out-of-policy spending after the fact",
                after: "Real-time controls that prevent overspending"
              })}
              {ComparisonRow({
                challenge: "Month-End Close",
                before: "2+ weeks of manual reconciliation and coding",
                after: "Close books 75% faster with automation"
              })}
              {ComparisonRow({
                challenge: "Vendor Management",
                before: "Scattered contracts, duplicate vendors, price creep",
                after: "Centralized vendor database with price intelligence"
              })}
              {ComparisonRow({
                challenge: "Financial Insights",
                before: "Outdated reports, no visibility into real-time spend",
                after: "Live dashboards with AI-powered insights"
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );

  // Insert after logo wall section
  productSuiteSection.parentNode?.insertBefore(comparisonSection, productSuiteSection.nextSibling);
  console.log('Feature Comparison section successfully added');
}

// Mobile card component for comparison
function MobileComparisonCard({ challenge, before, after }) {
  return (
    <div className="cf:h-full cf:rounded-xl cf:border border-primary cf:bg-white cf:px-4 cf:py-6">
      <h3 className="body-m cf:mb-6 leading-trim text-primary">
        {challenge}
      </h3>
      
      <ul className="cf:flex cf:flex-col cf:gap-4">
        <li className="cf:flex cf:items-start cf:gap-3">
          <span className="cf:text-red-500 cf:text-base cf:flex-shrink-0 cf:mt-1">✕</span>
          <div>
            <div className="body-s leading-trim text-hushed cf:mb-2 cf:uppercase cf:tracking-wide">
              Before Ramp
            </div>
            <div className="body-m leading-trim text-primary">
              {before}
            </div>
          </div>
        </li>
        
        <li className="cf:flex cf:items-start cf:gap-3">
          <span className="cf:text-green-500 cf:text-base cf:flex-shrink-0 cf:mt-1">✓</span>
          <div>
            <div className="body-s leading-trim text-hushed cf:mb-2 cf:uppercase cf:tracking-wide">
              With Ramp
            </div>
            <div className="body-m leading-trim text-primary">
              {after}
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

// Component for comparison table rows
function ComparisonRow({ challenge, before, after }) {
  return (
    <tr className="cf:border-t cf:border-gray-200">
      <td className="cf:p-4 cf:font-medium cf:text-gray-900 cf:align-top">
        {challenge}
      </td>
      <td className="cf:p-4 cf:text-gray-600 cf:align-top">
        <div className="cf:flex cf:items-start cf:gap-2">
          <span className="cf:text-red-500 cf:mt-1 cf:flex-shrink-0">✕</span>
          {before}
        </div>
      </td>
      <td className="cf:p-4 cf:text-gray-700 cf:align-top">
        <div className="cf:flex cf:items-start cf:gap-2">
          <span className="cf:text-green-500 cf:mt-1 cf:flex-shrink-0">✓</span>
          {after}
        </div>
      </td>
    </tr>
  );
}

// Icon components for the table header
function CheckIcon() {
  const iconDiv = document.createElement('div');
  iconDiv.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="#16a34a" stroke-width="2"/>
      <path d="M8 12l2 2 4-4" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
  return iconDiv;
}

function XIcon() {
  const iconDiv = document.createElement('div');
  iconDiv.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="#dc2626" stroke-width="2"/>
      <path d="M15 9l-6 6M9 9l6 6" stroke="#dc2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
  return iconDiv;
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