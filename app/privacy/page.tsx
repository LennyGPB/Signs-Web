/* eslint-disable react/no-unescaped-entities */
export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white px-6 py-16">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Signs</h1>
          <p className="text-white/40 text-sm tracking-widest uppercase">
            Privacy Policy
          </p>
        </div>

        <div className="space-y-10 text-white/70 text-sm leading-7">

          <div>
            <p className="text-white/30 text-xs uppercase tracking-widest mb-4">
              Last updated: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">1. Introduction</h2>
            <p>
              Signs (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;the app&rdquo;) is a personal development application for manifestation and daily rituals. This Privacy Policy explains how we collect, use, and protect your personal data when you use our app.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">2. Data we collect</h2>
            <ul className="space-y-2">
              <li>• <span className="text-white">Account information</span> — email address, first name/username</li>
              <li>• <span className="text-white">App content</span> — manifestations, daily rituals, posts, visualisation sessions, exercises you create within the app</li>
              <li>• <span className="text-white">Usage data</span> — streaks, completed rituals, weekly reviews</li>
              <li>• <span className="text-white">Purchase information</span> — subscription status managed via RevenueCat (we do not store payment card details)</li>
              <li>• <span className="text-white">Device token</span> — push notification token to send ritual reminders</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">3. How we use your data</h2>
            <ul className="space-y-2">
              <li>• Provide and personalise the app experience</li>
              <li>• Generate AI-powered content based on your manifestations (via OpenAI)</li>
              <li>• Send push notifications for ritual reminders and future letters</li>
              <li>• Manage your Premium subscription</li>
              <li>• Improve the app</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">4. Third-party services</h2>
            <ul className="space-y-2">
              <li>• <span className="text-white">OpenAI</span> — generates personalised content (manifestations, rituals, visualisations). Your data is processed according to <a href="https://openai.com/privacy" className="text-[#B8A5FF] underline">OpenAI's privacy policy</a>.</li>
              <li>• <span className="text-white">RevenueCat</span> — manages in-app subscriptions. See <a href="https://www.revenuecat.com/privacy" className="text-[#B8A5FF] underline">RevenueCat's privacy policy</a>.</li>
              <li>• <span className="text-white">Expo / EAS</span> — push notification delivery.</li>
              <li>• <span className="text-white">Neon (PostgreSQL)</span> — secure database hosting.</li>
              <li>• <span className="text-white">Railway</span> — backend hosting.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">5. Data retention</h2>
            <p>
              Your data is retained as long as your account is active. You can request deletion of your account and all associated data at any time.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">6. Your rights</h2>
            <ul className="space-y-2">
              <li>• Access your personal data</li>
              <li>• Correct inaccurate data</li>
              <li>• Request deletion of your account and data</li>
              <li>• Withdraw consent at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">7. Data deletion</h2>
            <p>
              To delete your account and all associated data, visit:{" "}
                <a
                href="https://signs-web-rose.vercel.app/delete-account"
                className="text-[#B8A5FF] underline"
              >
                signs-web-rose.vercel.app/delete-account
              </a>
              . Requests are processed within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">8. Security</h2>
            <p>
              All data is transmitted over HTTPS. Passwords are hashed using bcrypt. We do not sell your personal data to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">9. Contact</h2>
            <p>
              For any privacy-related questions:{" "}
              <a href="mailto:privacy@signs.app" className="text-[#B8A5FF] underline">
                privacy@signs.app
              </a>
            </p>
          </section>

        </div>

        {/* Footer */}
        <p className="text-center text-white/20 text-xs mt-16">
          © {new Date().getFullYear()} Signs. All rights reserved.
        </p>
      </div>
    </main>
  );
}
