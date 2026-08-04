import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/cart",
          "/checkout",
          "/account",
          "/account/",
          "/auth/",
          "/order/",
          "/design-system",
          "/api/",
        ],
      },
      {
        userAgent: "GPTBot",
        allow: ["/", "/products", "/blog", "/category/", "/llms.txt"],
        disallow: ["/cart", "/checkout", "/account", "/auth/", "/order/"],
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: ["/cart", "/checkout", "/account", "/auth/", "/order/"],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
