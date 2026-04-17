import { LegalLayout } from "@/components/LegalLayout";

const Privacy = () => (
  <LegalLayout
    title="Privacy Policy"
    subtitle="Last updated: January 2026"
    sections={[
      {
        title: "1. Overview",
        body: <p>Axyrix takes your privacy seriously. This policy explains what data we collect, why, and how we protect it. We follow GDPR and EU privacy standards strictly.</p>,
      },
      {
        title: "2. Data We Collect",
        body: (
          <>
            <p><strong>Account data:</strong> Email address, license key, server IP for license verification.</p>
            <p><strong>Detection data:</strong> Anonymous detection events stored on your own server. We do not transmit player data to our infrastructure.</p>
            <p><strong>Billing data:</strong> Handled exclusively by our payment provider (Stripe). We never see card details.</p>
          </>
        ),
      },
      {
        title: "3. What We Do NOT Collect",
        body: (
          <>
            <p>We do not collect player personal data, IP addresses of your players (beyond what's needed for HWID anti-spoof, which is hashed), chat logs, or any in-game content.</p>
            <p>Your players' privacy stays on your server.</p>
          </>
        ),
      },
      {
        title: "4. Cookies",
        body: <p>Our website uses essential cookies for session management and analytics cookies (only with your consent) to improve our service.</p>,
      },
      {
        title: "5. Your Rights (GDPR)",
        body: <p>You have the right to access, rectify, delete, restrict, or port your personal data. Contact support@axyrix.eu to exercise these rights.</p>,
      },
      {
        title: "6. Data Retention",
        body: <p>Account data is retained while your license is active. Billing records are kept for 10 years per German tax law. You may request deletion of all non-required data at any time.</p>,
      },
      {
        title: "7. Contact",
        body: <p>Data Protection Officer: privacy@axyrix.eu</p>,
      },
    ]}
  />
);

export default Privacy;
