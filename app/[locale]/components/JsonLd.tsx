export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Les données injectées sont statiques et contrôlées par nous (pas d'entrée utilisateur).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
