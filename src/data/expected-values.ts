export const EXPECTED_VALUES = {
  homePage: {
    title: 'QA Testing for Startups & Web Product Teams | JV William Andal',
    contactDetails: 'contact@jvwilliam.com',
    heroHeading: 'QA Testing for Small Web Product Teams',
    brandName: 'JV William',
    contactLinkSubject: 'QA support inquiry',
    pHeadings: {
      expertiseSection: 'Expertise',
      ctaSection: 'Ship Reliable Web Apps With Practical QA Support',
    },
  },
} as const;

export type ExpectedValues = typeof EXPECTED_VALUES;
