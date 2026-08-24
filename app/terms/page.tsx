export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] px-6 py-16 text-white">
      <div className="mx-auto max-w-2xl">
        <header className="mb-12">
          <h1 className="mb-2 text-4xl font-bold tracking-tight">Signs</h1>
          <p className="text-sm uppercase tracking-widest text-white/40">Terms of Use</p>
        </header>

        <div className="space-y-9 text-sm leading-7 text-white/70">
          <p className="text-xs uppercase tracking-widest text-white/30">
            Last updated: 24 August 2026
          </p>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">1. The service</h2>
            <p>
              Signs provides personal-development tools, guided rituals, visualisation exercises,
              journaling features, and AI-generated suggestions. The service is intended for
              personal reflection and does not provide medical, psychological, legal, or financial
              advice.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">2. Your account</h2>
            <p>
              You are responsible for keeping your credentials secure and for the activity on your
              account. You must provide accurate information and use the service lawfully. You can
              permanently delete your account and associated data from the app settings.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">3. Subscriptions</h2>
            <p>
              Premium subscriptions are billed through the Apple App Store or Google Play. Prices,
              billing periods, trials, and renewal terms are displayed by the store before purchase.
              Subscriptions renew automatically unless cancelled through your store account before
              the renewal date. Deleting your Signs account does not automatically cancel a store
              subscription.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">4. Generated content</h2>
            <p>
              AI-generated content may occasionally be incomplete or inaccurate. You remain
              responsible for deciding whether and how to use it. Do not submit unlawful content or
              information you are not authorised to share.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">5. Availability</h2>
            <p>
              We may update, suspend, or modify features to maintain and improve the service. We do
              not guarantee uninterrupted availability, but we work to restore service promptly when
              incidents occur.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">6. Privacy</h2>
            <p>
              Our handling of personal data is described in our{" "}
              <a href="/privacy" className="text-[#B8A5FF] underline">
                Privacy Policy
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">7. Contact</h2>
            <p>
              Questions about these terms can be sent to{" "}
              <a href="mailto:gleam-pro@proton.me" className="text-[#B8A5FF] underline">
                gleam-pro@proton.me
              </a>
              .
            </p>
          </section>
        </div>

        <p className="mt-12 text-center text-xs text-white/20">
          © {new Date().getFullYear()} Signs. All rights reserved.
        </p>
      </div>
    </main>
  );
}
