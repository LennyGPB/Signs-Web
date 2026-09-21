import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { routing } from "@/i18n/routing";
import { EBOOK_NAME, EBOOK_PRICE_EUR_CENTS } from "@/lib/constants";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const requestedLocale = typeof body.locale === "string" ? body.locale : undefined;
  const locale = (routing.locales as readonly string[]).includes(requestedLocale ?? "")
    ? requestedLocale!
    : routing.defaultLocale;
  const localePrefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  const origin = request.headers.get("origin") ?? new URL(request.url).origin;

  const termsAcceptanceMessage =
    locale === "fr"
      ? `En cochant cette case, tu acceptes les [conditions générales de vente](${origin}${localePrefix}/legal) et tu demandes expressément l'exécution immédiate de la livraison de l'e-book (téléchargement numérique). En conséquence, tu reconnais renoncer à ton droit de rétractation de 14 jours dès que le téléchargement est effectué.`
      : `By checking this box, you accept the [terms of sale](${origin}${localePrefix}/legal) and expressly request immediate delivery of the e-book (digital download). As a result, you acknowledge that you waive your 14-day right of withdrawal once the download has taken place.`;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      locale: locale === "fr" ? "fr" : "en",
      // Managed Payments (activé par défaut) exige un tax_code produit qu'on ne gère pas ; on le désactive pour cette session.
      managed_payments: { enabled: false },
      // Carte uniquement : le paiement est confirmé de façon synchrone, donc la page /success (qui revérifie
      // directement auprès de Stripe) suffit sans webhook. D'autres moyens de paiement peuvent se confirmer
      // après coup et nécessiteraient un webhook pour livrer l'e-book de façon fiable.
      payment_method_types: ["card"],
      // Case à cocher obligatoire avant paiement : acceptation des CGV + renonciation explicite
      // au droit de rétractation (contenu numérique livré immédiatement, art. L221-28 13° du Code de la consommation).
      consent_collection: {
        terms_of_service: "required",
      },
      custom_text: {
        terms_of_service_acceptance: {
          message: termsAcceptanceMessage,
        },
      },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: EBOOK_PRICE_EUR_CENTS,
            product_data: {
              name: EBOOK_NAME,
            },
          },
        },
      ],
      success_url: `${origin}${localePrefix}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}${localePrefix}/`,
    });

    if (!session.url) {
      throw new Error("Stripe did not return a checkout URL");
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout session creation failed", error);
    return NextResponse.json({ error: "checkout_failed" }, { status: 500 });
  }
}
