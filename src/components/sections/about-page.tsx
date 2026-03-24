'use client';

import AboutStorySection from './about-story-section';
import WhySolvingSection from './why-solving-section';
import WhatDrivesSection from './what-drives-section';
import MeetTeamSection from './meet-team-section';
import AboutCTASection from './about-cta';
import AboutFAQSection from './about-faq';
import JoinTribeSection from './join-tribe-section';

/**
 * @fileOverview The main content for the About page, refactored into modular sections.
 */

const AboutPageContent = () => {
  return (
    <div className="flex flex-col bg-background">
      <AboutStorySection />
      <WhySolvingSection />
      <WhatDrivesSection />
      <MeetTeamSection />
      <AboutCTASection />
      <AboutFAQSection />
      <JoinTribeSection />
    </div>
  );
};

export default AboutPageContent;