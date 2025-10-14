console.log('Variant: Replace main hero image');

// Function to replace the hero image
function replaceHeroImage() {
  // Target ALL hero/product images on the page
  const heroImageSelectors = [
    '#lp-pom-image-137 img',
    '#lp-pom-image-139 img',
    '#lp-pom-image-212 img',
    '#lp-pom-image-222 img',
    '#lp-pom-image-231 img',
    '#lp-pom-image-234 img',
    '#lp-pom-image-163 img',
    '#lp-pom-image-166 img',
    '#lp-pom-image-169 img',
    '#lp-pom-image-201 img',
    '#lp-pom-image-373 img'
  ];
  
  // IMPORTANT: Also target elements with background images
  const backgroundImageSelectors = [
    '#lp-pom-box-417',
    '#lp-pom-box-116',
    '#lp-pom-block-414'
  ];
  
  const newImageUrl = 'https://res.cloudinary.com/dtwolzqmc/image/upload/v1760448996/Screenshot_2025-10-14_at_20.32.52_f9uwxv.png';
  let replacedCount = 0;
  
  // Replace <img> tags
  heroImageSelectors.forEach(selector => {
    const heroImage = document.querySelector(selector);
    
    if (heroImage) {
      // Check if already replaced to avoid infinite loops
      if (heroImage.getAttribute('src') === newImageUrl || heroImage.src === newImageUrl) {
        return;
      }
      
      console.log(`Replacing image with selector: ${selector}`);
      
      // Replace the image source
      heroImage.setAttribute('src', newImageUrl);
      heroImage.src = newImageUrl;
      
      // CRITICAL: Remove srcset to prevent it from overriding the src
      heroImage.removeAttribute('srcset');
      heroImage.srcset = '';
      
      // Update the alt text
      heroImage.setAttribute('alt', 'Mac Mini');
      heroImage.alt = 'Mac Mini';
      
      // Apply styling to ensure proper display
      heroImage.style.width = '100%';
      heroImage.style.height = '100%';
      heroImage.style.maxWidth = '100%';
      heroImage.style.display = 'block';
      heroImage.style.objectFit = 'contain';
      
      // Remove code that was breaking the layout - don't modify parent containers
      replacedCount++;
    }
  });
  
  // Replace background images
  backgroundImageSelectors.forEach(selector => {
    const element = document.querySelector(selector);
    
    if (element) {
      const currentBg = window.getComputedStyle(element).backgroundImage;
      
      // Check if already replaced
      if (currentBg.includes('mac-mini.jpg')) {
        return;
      }
      
      console.log(`Replacing background image for: ${selector}`);
      
      // Replace the background image
      element.style.backgroundImage = `url('${newImageUrl}')`;
      element.style.backgroundSize = 'cover';
      element.style.backgroundPosition = 'center';
      element.style.backgroundRepeat = 'no-repeat';
      
      replacedCount++;
    }
  });
  
  if (replacedCount > 0) {
    console.log(`Successfully replaced ${replacedCount} hero images`);
    return true;
  }
  
  return false;
}

// Initial replacement
if (replaceHeroImage()) {
  console.log('Hero images replaced successfully');
  
  // Emit variant rendered event
  window.CFQ = window.CFQ || [];
  window.CFQ.push({ emit: 'variantRendered' });
}

// Set up a persistent MutationObserver to monitor and re-apply changes if the page reverts them
const persistentObserver = new MutationObserver((mutations) => {
  replaceHeroImage();
});

// Start observing the entire body for any changes
persistentObserver.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ['src', 'srcset', 'style']
});

console.log('Persistent observer set up to maintain image replacement');