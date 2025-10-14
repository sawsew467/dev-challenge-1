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
      if (currentBg.includes('cloudinary') || currentBg.includes('Screenshot_2025')) {
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

// ========== NEW: Add Benefits Section ==========

// JSX Component for benefit item with icon
function BenefitItem({ icon, title, description }) {
  return (
    <div className="cf:flex cf:items-start cf:gap-6 cf:p-8 cf:bg-gradient-to-br cf:from-white cf:to-gray-50 cf:rounded-2xl cf:border cf:border-gray-200 cf:shadow-md cf:hover:shadow-xl cf:transition-all cf:duration-300 cf:hover:scale-[1.02]">
      <div className="cf:flex-shrink-0 cf:w-16 cf:h-16 cf:bg-gradient-to-br cf:from-blue-600 cf:to-blue-800 cf:rounded-2xl cf:flex cf:items-center cf:justify-center cf:shadow-lg">
        <div className="cf:text-3xl">{icon}</div>
      </div>
      <div className="cf:flex-1">
        <h3 className="cf:text-2xl cf:font-bold cf:text-gray-900 cf:mb-3">{title}</h3>
        <p className="cf:text-lg cf:text-gray-700 cf:leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

// JSX Component for the entire benefits section
function BenefitsSection() {
  const benefits = [
    {
      icon: '🧠',
      title: 'Proven Memory Enhancement',
      description: 'Clinical studies show 226-300% improvement in memory through our neuroscience-backed scent therapy'
    },
    {
      icon: '😴',
      title: 'Effortless While You Sleep',
      description: 'Let your brain heal and strengthen naturally during sleep with 40 therapeutic scents'
    },
    {
      icon: '🌿',
      title: '100% Natural & Safe',
      description: 'No drugs, no chemicals, no side effects - just the power of natural aromatherapy'
    },
    {
      icon: '⚡',
      title: 'Backed by Science',
      description: '16 years of neuroscience research from top 2% scientists worldwide'
    }
  ];

  return (
    <div className="cf:w-full cf:py-16 cf:px-4 cf:block" id="cf-benefits-section" style="background: linear-gradient(180deg, rgba(249, 250, 251, 0.95) 0%, rgba(255, 255, 255, 0.95) 100%); position: absolute; top: 950px; left: 0; right: 0; min-height: 600px; z-index: 1;">
      <div className="cf:max-w-6xl cf:mx-auto">
        <div className="cf:text-center cf:mb-12">
          <h2 className="cf:text-5xl cf:font-bold cf:text-gray-900 cf:mb-4" style="font-family: Arial, sans-serif;">Why Memory Air™ Works</h2>
          <p className="cf:text-xl cf:text-gray-600 cf:max-w-2xl cf:mx-auto">Transform your cognitive health with proven scent therapy</p>
        </div>
        <div className="cf:grid cf:grid-cols-1 cf:md:grid-cols-2 cf:gap-6">
          {benefits.map((benefit, index) => (
            <BenefitItem 
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Flag to track if benefits section has been added and elements adjusted
let benefitsSectionAdded = false;
let elementsAdjusted = false;

// Function to insert benefits section
function addBenefitsSection() {
  // Check if already added
  if (benefitsSectionAdded || document.querySelector('#cf-benefits-section')) {
    console.log('Benefits section already exists, skipping');
    return true;
  }

  // Insert into the positioned content container where all other elements live
  const positionedContent = document.querySelector('.lp-positioned-content');
  
  console.log('Insertion target found:', { 
    positionedContent: !!positionedContent
  });
  
  if (positionedContent) {
    const benefitsElement = <BenefitsSection />;
    
    console.log('Strategy: Inserting into positioned content container');
    // Append to the positioned content where all page elements are
    positionedContent.appendChild(benefitsElement);
    
    // Mark as added before adjusting elements to prevent re-runs
    benefitsSectionAdded = true;
    
    // Only adjust elements once
    if (!elementsAdjusted) {
      // Push down all elements that come after our section
      const allElements = Array.from(document.querySelectorAll('.lp-positioned-content > .lp-element'));
      let adjustedCount = 0;
      
      allElements.forEach(el => {
        // Skip if element has already been marked as adjusted
        if (el.dataset.cfAdjusted === 'true') {
          return;
        }
        
        const currentTop = parseInt(window.getComputedStyle(el).top) || 0;
        // If element is positioned after the benefits section (at 950px), push it down
        // Only adjust elements in the 950-1600px range to avoid over-adjusting
        if (currentTop >= 950 && currentTop < 1600) {
          el.style.top = (currentTop + 700) + 'px';
          el.dataset.cfAdjusted = 'true'; // Mark as adjusted
          adjustedCount++;
          console.log(`Pushed down element ${el.id} from ${currentTop}px to ${currentTop + 700}px`);
        }
      });
      
      elementsAdjusted = true;
      console.log(`Adjusted ${adjustedCount} elements`);
    }
    
    console.log('Benefits section added successfully');
    return true;
  }
  
  console.error('Could not find positioned content container');
  return false;
}

// Add benefits section with longer timeout to ensure DOM is ready
setTimeout(() => {
  addBenefitsSection();
}, 1000);