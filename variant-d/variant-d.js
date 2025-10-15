console.log('Memory Air Hero Background Image Replacement Variant');

// Target the div with background image
function replaceHeroBackgroundImage() {
  // Look for the div with id "lp-pom-box-417"
  const heroDiv = document.querySelector('#lp-pom-box-417');

  if (heroDiv) {
    console.log('Found hero div, replacing background-image');

    // Replace the background-image with new product image
    heroDiv.style.backgroundImage = 'url("https://memoryair.com/cdn/shop/products/sleep_1024x1024.png?v=1710485406")';

    // Add a custom class to mark the replacement
    heroDiv.classList.add('cf-hero-bg-replaced');

    console.log('Background image replaced successfully');

    return true;
  }

  return false;
}

// Try to replace immediately
if (replaceHeroBackgroundImage()) {
  window.CFQ = window.CFQ || [];
  window.CFQ.push({ emit: 'variantRendered' });
} else {
  // Wait for the div to load
  console.log('Hero div not found yet, setting up observer');

  const observer = new MutationObserver(() => {
    if (replaceHeroBackgroundImage()) {
      console.log('Background image replaced after DOM mutation');
      observer.disconnect();
      window.CFQ = window.CFQ || [];
      window.CFQ.push({ emit: 'variantRendered' });
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Timeout after 5 seconds
  setTimeout(() => {
    observer.disconnect();
    console.error('Timeout: Hero div not found after 5 seconds');
  }, 5000);
}