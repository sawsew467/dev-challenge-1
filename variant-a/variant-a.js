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
    
    // Inform Coframe SDK variant has successfully finished rendering
    window.CFQ = window.CFQ || [];
    window.CFQ.push({ emit: 'variantRendered' });
  } else {
    console.error('Hero headline element not found');
  }
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