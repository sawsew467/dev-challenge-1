console.log('Memory Air - Adding Key Benefits Section');

// Wait for the page to be ready
function addBenefitsSection() {
  const parentBox = document.querySelector('#lp-pom-box-415');
  const headlineElement = document.querySelector('#lp-pom-text-421');
  const subheadlineElement = document.querySelector('#lp-pom-text-422');
  const buttonElement = document.querySelector('#lp-pom-button-423');
  
  if (!parentBox || !headlineElement || !subheadlineElement || !buttonElement) {
    console.error('Required elements not found');
    return false;
  }

  // Check if we've already added the section
  if (document.querySelector('#cf-benefits-section')) {
    console.log('Benefits section already exists');
    return true;
  }

  // Get the position of the subheadline to place benefits after it
  const subheadlineRect = subheadlineElement.getBoundingClientRect();
  const parentRect = parentBox.getBoundingClientRect();
  
  // Calculate top position relative to parent box
  const topPosition = subheadlineRect.bottom - parentRect.top + 20; // 20px gap
  
  // Get the left position from the headline to align properly
  const headlineStyles = window.getComputedStyle(headlineElement);
  const leftPosition = headlineStyles.left;

  // Create the benefits section using JSX with absolute positioning
  const benefitsSection = (
    <div 
      id="cf-benefits-section" 
      className="lp-element cf:absolute"
      style={`position: absolute; left: ${leftPosition}; top: ${topPosition}px; width: 436px; z-index: 215;`}
    >
      <ul className="cf:flex cf:flex-col cf:gap-1">
        <BenefitItem icon="✓" text="Improves memory by up to 300% - clinically proven results" />
        <BenefitItem icon="✓" text="Works while you sleep - no effort required" />
        <BenefitItem icon="✓" text="Based on 16 years of neuroscience research" />
        <BenefitItem icon="✓" text="No drugs, no side effects - 100% natural" />
        <BenefitItem icon="✓" text="Created by a Top 2% Scientist in the world" />
      </ul>
    </div>
  );

  // Insert the benefits section into the parent box
  parentBox.appendChild(benefitsSection);
  
  // Position button below the product image (left side)
  const imageBox = document.querySelector('#lp-pom-box-417');
  if (imageBox) {
    const imageRect = imageBox.getBoundingClientRect();
    const parentRect = parentBox.getBoundingClientRect();
    
    // Calculate button position below the image
    const buttonTopPosition = imageRect.bottom - parentRect.top + 30; // 30px gap below image
    buttonElement.style.top = buttonTopPosition + 'px';
    
    // Center the button horizontally with the image
    const imageStyles = window.getComputedStyle(imageBox);
    const imageLeft = parseInt(imageStyles.left);
    const imageWidth = parseInt(imageStyles.width);
    const buttonWidth = parseInt(window.getComputedStyle(buttonElement).width);
    const buttonLeft = imageLeft + (imageWidth - buttonWidth) / 2;
    buttonElement.style.left = buttonLeft + 'px';
    
    // Expand parent container to fit the new layout
    const newParentHeight = buttonTopPosition + 100; // Button height + padding
    parentBox.style.height = newParentHeight + 'px';
    
    console.log(`Button repositioned below image at top: ${buttonTopPosition}px, left: ${buttonLeft}px`);
    console.log(`Parent container expanded to height: ${newParentHeight}px`);
  }
  
  console.log(`Benefits section added at top: ${topPosition}px`);
  
  return true;
}

// Benefit item component
function BenefitItem({ icon, text }) {
  return (
    <li className="cf:flex cf:items-start cf:gap-3">
      <span className="cf:flex-shrink-0 cf:text-[#0098db] cf:font-bold cf:text-xl">
        {icon}
      </span>
      <span className="cf:text-black cf:text-base cf:leading-relaxed">
        {text}
      </span>
    </li>
  );
}

// Execute
if (addBenefitsSection()) {
  window.CFQ = window.CFQ || [];
  window.CFQ.push({ emit: 'variantRendered' });
  console.log('Benefits section added successfully');
} else {
  console.error('Failed to add benefits section');
}