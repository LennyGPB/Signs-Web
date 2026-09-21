import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Signs",
    short_name: "Signs",
    description: "Manifeste avec méthode, pas par hasard.",
    start_url: "/",
    display: "standalone",
    background_color: "#0A0A0A",
    theme_color: "#0A0A0A",
    icons: [
      {
        src: "/logo-icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
