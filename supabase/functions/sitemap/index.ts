import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const baseUrl = "https://yhensproperty.com";

const staticPages = [
  { url: "/", priority: "1.0", changefreq: "daily" },
  { url: "/about", priority: "0.8", changefreq: "monthly" },
  { url: "/contact", priority: "0.7", changefreq: "monthly" },
  { url: "/sell", priority: "0.8", changefreq: "monthly" },
  { url: "/category/buy-condos", priority: "0.7", changefreq: "daily" },
  { url: "/category/buy-houses", priority: "0.7", changefreq: "daily" },
  { url: "/category/buy-land", priority: "0.7", changefreq: "daily" },
  { url: "/category/buy-commercial", priority: "0.7", changefreq: "daily" },
  { url: "/category/rent", priority: "0.7", changefreq: "daily" },
  { url: "/category/rent-condos", priority: "0.6", changefreq: "daily" },
  { url: "/category/rent-houses", priority: "0.6", changefreq: "daily" },
  { url: "/category/rent-land", priority: "0.6", changefreq: "daily" },
  { url: "/category/rent-commercial", priority: "0.6", changefreq: "daily" },
  { url: "/privacy", priority: "0.3", changefreq: "yearly" },
  { url: "/terms", priority: "0.3", changefreq: "yearly" },
  { url: "/guides", priority: "0.9", changefreq: "monthly" },
  { url: "/guides/foreigner-property-ownership", priority: "0.9", changefreq: "monthly" },
  { url: "/guides/ra-12252-99-year-lease", priority: "0.9", changefreq: "monthly" },
  { url: "/guides/bgc-makati-batangas-rental-yields", priority: "0.9", changefreq: "monthly" },
  { url: "/guides/retiring-philippines-srrv", priority: "0.8", changefreq: "monthly" },
  { url: "/guides/selling-guide-non-resident", priority: "0.8", changefreq: "monthly" },
];

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!
    );

    const { data: properties } = await supabase
      .from("properties")
      .select("slug, created_at")
      .eq("status", "active")
      .order("created_at", { ascending: false });

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    for (const page of staticPages) {
      xml += "  <url>\n";
      xml += `    <loc>${baseUrl}${page.url}</loc>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;
      xml += "  </url>\n";
    }

    if (properties && properties.length > 0) {
      for (const property of properties) {
        xml += "  <url>\n";
        xml += `    <loc>${baseUrl}/property/${property.slug}</loc>\n`;
        xml += `    <lastmod>${new Date(property.created_at).toISOString().split("T")[0]}</lastmod>\n`;
        xml += "    <changefreq>weekly</changefreq>\n";
        xml += "    <priority>0.8</priority>\n";
        xml += "  </url>\n";
      }
    }

    xml += "</urlset>";

    return new Response(xml, {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
