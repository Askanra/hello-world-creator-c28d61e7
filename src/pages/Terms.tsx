import { LegalLayout } from "@/components/LegalLayout";

const Terms = () => (
  <LegalLayout
    title="Terms of Service"
    subtitle="Last updated: January 2026"
    sections={[
      {
        title: "1. Acceptance",
        body: <p>By purchasing or using Axyrix, you agree to these Terms of Service. If you do not agree, you may not use the software.</p>,
      },
      {
        title: "2. License Grant",
        body: <p>Axyrix grants you a non-exclusive, non-transferable license to use the software on the number of servers covered by your active plan. Resale, redistribution, or reverse engineering is strictly forbidden.</p>,
      },
      {
        title: "3. Acceptable Use",
        body: (
          <>
            <p>You agree to use Axyrix only on FiveM servers you legally own or operate. You may not use it for malicious purposes, to violate Cfx.re Terms of Service, or to harm other parties.</p>
          </>
        ),
      },
      {
        title: "4. Service Availability",
        body: <p>We aim for 99.9% uptime but do not guarantee uninterrupted service. Maintenance windows will be announced in advance via Discord.</p>,
      },
      {
        title: "5. Updates",
        body: <p>Axyrix is updated frequently to combat new cheats. Active subscriptions and lifetime licenses include all updates.</p>,
      },
      {
        title: "6. Termination",
        body: <p>We reserve the right to suspend or terminate licenses found in violation of these terms, including license sharing, malicious use, or chargebacks. No refunds in such cases.</p>,
      },
      {
        title: "7. Limitation of Liability",
        body: <p>Axyrix is provided "as is". We are not liable for indirect damages, loss of revenue, or community impact resulting from cheaters bypassing detection. We commit to fast updates when bypasses surface.</p>,
      },
      {
        title: "8. Governing Law",
        body: <p>These terms are governed by the laws of the Federal Republic of Germany. Place of jurisdiction is Berlin.</p>,
      },
    ]}
  />
);

export default Terms;
