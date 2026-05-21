export const EXPECTED_VALUES = {
    homePage: {
        title: "JV William Andal | Modern QA | Web App Testing Specialist",
        contactDetails: "contact@jvwilliam.com",
        pHeadings: {
            "aboutSection" : "JV William Andal",
            "expertiseSection" : "Expertise",
            "experienceSection" : "Experience",
            "skillsSection": "Competencies & Tools",
            "trainingsSection" : "Trainings & Certifications",
            "ctaSection": "Shipping a Web App? Let's make sure it's solid!"
        }
    }
} as const;

export type ExpectedValues = typeof EXPECTED_VALUES;