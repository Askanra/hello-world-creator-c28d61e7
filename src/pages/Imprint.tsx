import { LegalLayout } from "@/components/LegalLayout";

const Imprint = () => (
  <LegalLayout
    title="Imprint"
    subtitle="Information according to § 5 TMG (German Telemedia Act)"
    sections={[
      {
        title: "Provider",
        body: (
          <>
            <p>Axyrix Anticheat</p>
            <p>Operated by: Axyrix Software UG (haftungsbeschränkt)</p>
            <p>Friedrichstraße 123<br />10117 Berlin, Germany</p>
          </>
        ),
      },
      {
        title: "Contact",
        body: (
          <>
            <p>Email: support@axyrix.eu</p>
            <p>Discord: discord.gg/axyrix</p>
          </>
        ),
      },
      {
        title: "Commercial Register",
        body: (
          <>
            <p>Register Court: Amtsgericht Berlin-Charlottenburg</p>
            <p>Registration Number: HRB 234567 B</p>
            <p>VAT ID: DE345678901</p>
          </>
        ),
      },
      {
        title: "Responsible for content",
        body: <p>Axyrix Software UG, address as above.</p>,
      },
      {
        title: "Disclaimer",
        body: (
          <>
            <p>The content of this website has been created with the greatest possible care. However, we cannot guarantee the accuracy, completeness or up-to-dateness of the content.</p>
            <p>Axyrix is an independent third-party tool and is not affiliated with, endorsed by, or sponsored by Cfx.re or Rockstar Games.</p>
          </>
        ),
      },
      {
        title: "EU Dispute Resolution",
        body: <p>The European Commission provides a platform for online dispute resolution: <a href="https://ec.europa.eu/consumers/odr" className="text-primary hover:underline">https://ec.europa.eu/consumers/odr</a>. We are not obliged or willing to participate in dispute resolution proceedings before a consumer arbitration board.</p>,
      },
    ]}
  />
);

export default Imprint;
