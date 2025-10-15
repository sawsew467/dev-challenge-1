console.log('meowbox FAQ Accordion Variant');

// FAQ data
const faqs = [
  {
    question: "How does the subscription work?",
    answer: "Choose between monthly or bi-monthly delivery. Each box contains at least 5 unique toys and treats. You can pause, skip, or cancel anytime with no commitment. Manage everything easily through your account."
  },
  {
    question: "When will my first box arrive?",
    answer: "Your first meowbox ships within 3-5 business days after ordering. Subsequent boxes ship around the same date each month. You'll receive tracking information via email once your box ships."
  },
  {
    question: "Can I skip a month or cancel anytime?",
    answer: "Absolutely! There's no commitment. You can pause, skip a month, or cancel your subscription anytime through your account dashboard. No cancellation fees, no hassle."
  },
  {
    question: "What if my cat has dietary restrictions?",
    answer: "We offer a 'No Treats' option that replaces all treats with an extra toy. Simply select this option when setting up your subscription or update it in your account settings at any time."
  },
  {
    question: "Do you ship internationally?",
    answer: "Currently, we ship to the United States, Canada, and the United Kingdom. International shipping rates and delivery times vary by location. Check our shipping page for detailed information."
  },
  {
    question: "What's your return policy?",
    answer: "We want both you and your cat to love meowbox! If you're not satisfied, contact us at humans@meowbox.com within 30 days. We'll work with you to make it right, whether that's a replacement or refund."
  },
  {
    question: "Can I give meowbox as a gift?",
    answer: "Yes! We offer gift subscriptions for 1, 3, 6, or 12 months. Each gift includes a personalized message and beautifully packaged box. Perfect for birthdays, adoption days, or any cat celebration!"
  },
  {
    question: "Are the toys safe for all cat ages?",
    answer: "All our toys are carefully selected with safety in mind and are suitable for adult cats. Always supervise playtime, especially with new toys. If you have a kitten or senior cat with special needs, contact us for recommendations."
  }
];

// FAQ Accordion Component
function FAQItem({ question, answer, index }) {
  const itemId = `faq-item-${index}`;
  const contentId = `faq-content-${index}`;

  return (
    <div className="cf:border-b cf:border-[#2c4143]/10 cf:last:border-b-0">
      <button
        className="cf:rounded-xl cf:w-full cf:text-left cf:py-3 cf:px-6 cf:flex cf:items-center cf:justify-between cf:gap-4 cf:transition-colors cf:duration-200 cf:hover:text-[#ed6835] cf:group"
        data-faq-button={itemId}
        aria-expanded="false"
        aria-controls={contentId}
      >
        <h3 className="cf:text-2xl cf:font-semibold cf:text-[#2c4143] cf:group-hover:text-[#ed6835] cf:transition-colors cf:duration-200" style="font-family: 'Open Sans', sans-serif; letter-spacing: 0.6px;">
          {question}
        </h3>
        <div className="cf:flex-shrink-0 cf:w-6 cf:h-6 cf:relative" data-faq-icon={itemId}>
          <div className="cf:absolute cf:inset-0 cf:flex cf:items-center cf:justify-center">
            <svg className="cf:w-6 cf:h-6 cf:text-[#ed6835] cf:transition-transform cf:duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </div>
        </div>
      </button>
      <div
        id={contentId}
        className="cf:overflow-hidden cf:transition-all cf:duration-300 cf:ease-in-out"
        style="max-height: 0;"
        data-faq-content={itemId}
      >
        <div className="cf:pb-6 cf:pr-12">
          <p className="cf:text-xl cf:text-[#2c4143]/80 cf:leading-relaxed" style="font-family: 'Open Sans', sans-serif; letter-spacing: 0.6px;">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

function FAQSection() {
  return (
    <section className="cf:py-16 cf:px-4 cf:bg-[#fbfaf6]">
      <div className="cf:max-w-4xl cf:mx-auto">
        {/* Header */}
        <div className="cf:text-center cf:mb-12">
          <h2 className="cf:text-5xl cf:md:text-6xl cf:font-bold cf:text-[#273839] cf:mb-4" style="font-family: Tobi-Black, Arial; letter-spacing: 0.6px;">
            ⚞ Frequently Asked Questions ⚟
          </h2>
          <p className="cf:text-base cf:text-[#2c4143]/75 cf:max-w-2xl cf:mx-auto" style="font-family: 'Open Sans', sans-serif; letter-spacing: 0.6px;">
            Got questions? We've got answers! Can't find what you're looking for? Contact us at{' '}
            <a href="mailto:humans@meowbox.com" className="cf:text-[#ed6835] cf:hover:underline cf:font-semibold">
              humans@meowbox.com
            </a>
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="cf:bg-white cf:rounded-2xl cf:shadow-sm cf:p-8 cf:flex cf:flex-col cf:gap-3">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} index={index} />
          ))}
        </div>

        {/* CTA at bottom */}
        <div className="cf:text-center cf:mt-10">
          <p className="cf:text-base cf:text-[#2c4143]/75 cf:mb-4" style="font-family: 'Open Sans', sans-serif; letter-spacing: 0.6px;">
            Still have questions? We're here to help!
          </p>
          <a
            href="/pages/contact"
            className="cf:inline-block cf:bg-[#ed6835] cf:text-white cf:px-8 cf:py-3 cf:rounded-full cf:font-semibold cf:transition-all cf:duration-200 cf:hover:bg-[#d95a3a] cf:hover:shadow-lg cf:hover:scale-105 cf:text-base"
            style="font-family: 'Open Sans', sans-serif; letter-spacing: 0.6px;"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}

// Wait for footer to be available and insert FAQ section before it
function insertFAQSection() {
  const footer = document.querySelector('#shopify-section-sections--25269131968833__footer');

  if (!footer) {
    console.error('Footer not found');
    return false;
  }

  // Check if FAQ already inserted
  if (document.querySelector('[data-cf-faq-section]')) {
    console.log('FAQ section already exists');
    return true;
  }

  // Create and insert FAQ section
  const faqContainer = <div data-cf-faq-section="true"><FAQSection /></div>;
  footer.parentNode.insertBefore(faqContainer, footer);

  // Add click handlers for accordion functionality
  setupAccordion();

  console.log('FAQ section inserted successfully');
  return true;
}

// Use MutationObserver to wait for the footer
function waitForFooterAndInsert() {
  const footer = document.querySelector('#shopify-section-sections--25269131968833__footer');
  
  if (footer) {
    if (insertFAQSection()) {
      window.CFQ = window.CFQ || [];
      window.CFQ.push({ emit: 'variantRendered' });
      console.log('FAQ section inserted and variantRendered emitted');
    }
    return;
  }

  // If footer not found, observe for it
  const observer = new MutationObserver((mutations, obs) => {
    const footer = document.querySelector('#shopify-section-sections--25269131968833__footer');
    if (footer) {
      obs.disconnect();
      if (insertFAQSection()) {
        window.CFQ = window.CFQ || [];
        window.CFQ.push({ emit: 'variantRendered' });
        console.log('FAQ section inserted and variantRendered emitted');
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Safety timeout after 10 seconds
  setTimeout(() => {
    observer.disconnect();
    console.error('Timeout waiting for footer');
  }, 10000);
}

// Setup accordion click handlers
function setupAccordion() {
  const buttons = document.querySelectorAll('[data-faq-button]');

  buttons.forEach((button) => {
    button.addEventListener('click', function () {
      const itemId = this.getAttribute('data-faq-button');
      const content = document.querySelector(`[data-faq-content="${itemId}"]`);
      const icon = document.querySelector(`[data-faq-icon="${itemId}"] svg`);
      const isExpanded = this.getAttribute('aria-expanded') === 'true';

      // Close all other items
      buttons.forEach(otherButton => {
        if (otherButton !== this) {
          const otherItemId = otherButton.getAttribute('data-faq-button');
          const otherContent = document.querySelector(`[data-faq-content="${otherItemId}"]`);
          const otherIcon = document.querySelector(`[data-faq-icon="${otherItemId}"] svg`);

          otherButton.setAttribute('aria-expanded', 'false');
          otherContent.style.maxHeight = '0';
          otherIcon.style.transform = 'rotate(0deg)';
        }
      });

      // Toggle current item
      if (isExpanded) {
        this.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = '0';
        icon.style.transform = 'rotate(0deg)';
      } else {
        this.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = content.scrollHeight + 'px';
        icon.style.transform = 'rotate(45deg)';
      }
    });
  });
}

// Run the insertion
try {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForFooterAndInsert);
  } else {
    waitForFooterAndInsert();
  }
} catch (error) {
  console.error('Error inserting FAQ section:', error);
}