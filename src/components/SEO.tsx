import { useEffect } from 'react';
import { siteConfig } from '../config/site';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  ogImage?: string;
  ogImageWidth?: string;
  ogImageHeight?: string;
  ogImageAlt?: string;
  ogImageType?: string;
  ogSiteName?: string;
  ogLocale?: string;
  ogPriceAmount?: string;
  ogPriceCurrency?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  structuredData?: object;
  breadcrumbs?: BreadcrumbItem[];
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  ogType = 'website',
  ogTitle,
  ogDescription,
  ogUrl,
  ogImage,
  ogImageWidth,
  ogImageHeight,
  ogImageAlt,
  ogImageType,
  ogSiteName,
  ogLocale,
  ogPriceAmount,
  ogPriceCurrency,
  twitterCard = 'summary_large_image',
  twitterTitle,
  twitterDescription,
  twitterImage,
  structuredData,
  breadcrumbs,
}) => {
  useEffect(() => {
    document.title = title;

    const setMetaTag = (name: string, content: string, isProperty = false) => {
      if (!content) return;

      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;

      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }

      element.content = content;
    };

    const setLinkTag = (rel: string, href: string) => {
      if (!href) return;

      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;

      if (!element) {
        element = document.createElement('link');
        element.rel = rel;
        document.head.appendChild(element);
      }

      element.href = href;
    };

    setMetaTag('description', description);
    if (canonical) setLinkTag('canonical', canonical);

    setMetaTag('fb:app_id', '1234567890', true);
    setMetaTag('og:type', ogType, true);
    setMetaTag('og:title', ogTitle || title, true);
    setMetaTag('og:description', ogDescription || description, true);
    if (ogUrl) setMetaTag('og:url', ogUrl, true);
    if (ogImage) {
      setMetaTag('og:image', ogImage, true);
      setMetaTag('og:image:secure_url', ogImage, true);
      if (ogImageWidth) setMetaTag('og:image:width', ogImageWidth, true);
      if (ogImageHeight) setMetaTag('og:image:height', ogImageHeight, true);
      if (ogImageAlt) setMetaTag('og:image:alt', ogImageAlt, true);
      if (ogImageType) setMetaTag('og:image:type', ogImageType, true);
    }
    setMetaTag('og:site_name', ogSiteName || siteConfig.seo.ogSiteName, true);
    if (ogLocale) setMetaTag('og:locale', ogLocale, true);
    if (ogPriceAmount) setMetaTag('og:price:amount', ogPriceAmount, true);
    if (ogPriceCurrency) setMetaTag('og:price:currency', ogPriceCurrency, true);

    setMetaTag('twitter:card', twitterCard);
    setMetaTag('twitter:title', twitterTitle || title);
    setMetaTag('twitter:description', twitterDescription || description);
    if (twitterImage) setMetaTag('twitter:image', twitterImage);

    if (structuredData) {
      let scriptElement = document.querySelector('script[type="application/ld+json"][data-schema="main"]') as HTMLScriptElement;

      if (!scriptElement) {
        scriptElement = document.createElement('script');
        scriptElement.type = 'application/ld+json';
        scriptElement.setAttribute('data-schema', 'main');
        document.head.appendChild(scriptElement);
      }

      scriptElement.textContent = JSON.stringify(structuredData);
    }

    if (breadcrumbs && breadcrumbs.length > 0) {
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item.name,
          "item": item.url
        }))
      };

      let breadcrumbScript = document.querySelector('script[type="application/ld+json"][data-schema="breadcrumb"]') as HTMLScriptElement;

      if (!breadcrumbScript) {
        breadcrumbScript = document.createElement('script');
        breadcrumbScript.type = 'application/ld+json';
        breadcrumbScript.setAttribute('data-schema', 'breadcrumb');
        document.head.appendChild(breadcrumbScript);
      }

      breadcrumbScript.textContent = JSON.stringify(breadcrumbSchema);
    }
  }, [
    title,
    description,
    canonical,
    ogType,
    ogTitle,
    ogDescription,
    ogUrl,
    ogImage,
    ogImageWidth,
    ogImageHeight,
    ogImageAlt,
    ogImageType,
    ogSiteName,
    ogLocale,
    ogPriceAmount,
    ogPriceCurrency,
    twitterCard,
    twitterTitle,
    twitterDescription,
    twitterImage,
    structuredData,
    breadcrumbs,
  ]);

  return null;
};
