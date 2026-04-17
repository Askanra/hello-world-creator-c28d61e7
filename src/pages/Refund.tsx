import { LegalLayout } from "@/components/LegalLayout";

const Refund = () => (
  <LegalLayout
    title="Refund Policy"
    subtitle="Last updated: January 2026"
    sections={[
      {
        title: "Digital Product Notice",
        body: <p>Axyrix is a digital software product delivered electronically and protected by escrow. By completing a purchase, you acknowledge that the product is digital and the right of withdrawal expires upon download or activation, in accordance with EU Directive 2011/83/EU Article 16(m).</p>,
      },
      {
        title: "14-Day Refund Window",
        body: <p>If Axyrix does not function as advertised on your server, you may request a refund within 14 days of purchase, provided you have given our support team a reasonable opportunity to resolve the issue.</p>,
      },
      {
        title: "Non-Refundable Cases",
        body: (
          <>
            <p>Refunds will not be issued in the following cases:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>License has been actively used for more than 14 days</li>
              <li>Refund requested due to change of mind</li>
              <li>Violation of Terms of Service (license sharing, etc.)</li>
              <li>Lifetime plans after 14 days</li>
            </ul>
          </>
        ),
      },
      {
        title: "How to Request",
        body: <p>Email refund@axyrix.eu with your order ID and reason. We process valid refunds within 5-10 business days back to the original payment method.</p>,
      },
      {
        title: "Chargebacks",
        body: <p>Filing a chargeback without contacting support first will result in immediate license termination and a permanent ban from purchasing Axyrix products.</p>,
      },
    ]}
  />
);

export default Refund;
