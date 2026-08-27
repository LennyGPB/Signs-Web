export default function SupportPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center justify-center px-6 py-16">
      <div className="max-w-lg w-full">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Signs</h1>
          <p className="text-white/40 text-sm mt-2 tracking-widest uppercase">
            Support
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
          <h2 className="text-xl font-semibold mb-3">How can we help?</h2>
          <p className="text-white/50 text-sm leading-7 mb-8">
            If you have a question, encounter an issue, or need help with Signs,
            contact our support team by email.
          </p>

          <a
            href="mailto:gleam-pro@proton.me"
            className="flex items-center justify-between gap-4 rounded-2xl border border-[#B8A5FF]/30 bg-[#B8A5FF]/10 px-5 py-4 hover:bg-[#B8A5FF]/15 transition-colors"
          >
            <span className="text-[#B8A5FF] font-medium text-sm">
              gleam-pro@proton.me
            </span>
            <span className="text-[#B8A5FF]/60 text-xs uppercase tracking-widest whitespace-nowrap">
              Send email →
            </span>
          </a>
        </div>

        <p className="text-center text-white/20 text-xs mt-10">
          © {new Date().getFullYear()} Signs. All rights reserved.
        </p>
      </div>
    </main>
  );
}
