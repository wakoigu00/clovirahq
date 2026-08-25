import { useEffect } from "react";

const SITE_URL = "https://clovirahq.com";

const DEFAULT_TITLE =
  "CloviraHQ | Outbound Growth Systems for Managed Service Providers";

const DEFAULT_DESCRIPTION =
  "CloviraHQ helps Managed Service Providers build predictable outbound systems through research-driven targeting, personalized outreach, and continuous optimization.";

const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

function setMetaTag(attribute, value, content) {
  if (!content) {
    return;
  }

  let element = document.head.querySelector(
    `meta[${attribute}="${value}"]`
  );

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, value);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function setLinkTag(rel, href) {
  let element = document.head.querySelector(
    `link[rel="${rel}"]`
  );

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}

function removeMetaTag(attribute, value) {
  const element = document.head.querySelector(
    `meta[${attribute}="${value}"]`
  );

  if (element) {
    element.remove();
  }
}

function setJsonLd(data) {
  let element = document.head.querySelector(
    'script[data-seo="structured-data"]'
  );

  if (!element) {
    element = document.createElement("script");
    element.setAttribute("type", "application/ld+json");
    element.setAttribute("data-seo", "structured-data");
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(data);
}

function buildDefaultStructuredData({
  title,
  description,
  canonicalUrl,
  imageUrl,
  type,
}) {
  const pageId = `${canonicalUrl}#webpage`;

  const organization = {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: "CloviraHQ",
    url: SITE_URL,
    description:
      "CloviraHQ helps Managed Service Providers build predictable outbound systems through research-driven targeting, personalized outreach, and continuous optimization.",
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/og-image.png`,
    },
  };

  const website = {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: "CloviraHQ",
    description: DEFAULT_DESCRIPTION,
    publisher: {
      "@id": ORGANIZATION_ID,
    },
  };

  const webpage = {
    "@type": type === "article" ? "Article" : "WebPage",
    "@id": pageId,
    url: canonicalUrl,
    name: title,
    description,
    isPartOf: {
      "@id": WEBSITE_ID,
    },
    about: {
      "@id": ORGANIZATION_ID,
    },
    publisher: {
      "@id": ORGANIZATION_ID,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: imageUrl,
    },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      website,
      webpage,
    ],
  };
}

export default function SEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  canonical,
  image = DEFAULT_IMAGE,
  type = "website",
  publishedTime,
  modifiedTime,
  author,
  section,
  structuredData,
}) {
  useEffect(() => {
    const canonicalUrl =
      canonical ||
      `${SITE_URL}${window.location.pathname}`;

    const imageUrl = image.startsWith("http")
      ? image
      : `${SITE_URL}${image}`;

    document.title = title;

    setMetaTag(
      "name",
      "description",
      description
    );

    setMetaTag(
      "name",
      "robots",
      "index, follow"
    );

    setMetaTag(
      "property",
      "og:type",
      type
    );

    setMetaTag(
      "property",
      "og:site_name",
      "CloviraHQ"
    );

    setMetaTag(
      "property",
      "og:title",
      title
    );

    setMetaTag(
      "property",
      "og:description",
      description
    );

    setMetaTag(
      "property",
      "og:url",
      canonicalUrl
    );

    setMetaTag(
      "property",
      "og:image",
      imageUrl
    );

    setMetaTag(
      "name",
      "twitter:card",
      "summary_large_image"
    );

    setMetaTag(
      "name",
      "twitter:title",
      title
    );

    setMetaTag(
      "name",
      "twitter:description",
      description
    );

    setMetaTag(
      "name",
      "twitter:image",
      imageUrl
    );

    setLinkTag(
      "canonical",
      canonicalUrl
    );

    if (type === "article") {
      if (publishedTime) {
        setMetaTag(
          "property",
          "article:published_time",
          publishedTime
        );
      } else {
        removeMetaTag(
          "property",
          "article:published_time"
        );
      }

      if (modifiedTime) {
        setMetaTag(
          "property",
          "article:modified_time",
          modifiedTime
        );
      } else {
        removeMetaTag(
          "property",
          "article:modified_time"
        );
      }

      if (author) {
        setMetaTag(
          "property",
          "article:author",
          author
        );
      } else {
        removeMetaTag(
          "property",
          "article:author"
        );
      }

      if (section) {
        setMetaTag(
          "property",
          "article:section",
          section
        );
      } else {
        removeMetaTag(
          "property",
          "article:section"
        );
      }
    } else {
      removeMetaTag(
        "property",
        "article:published_time"
      );

      removeMetaTag(
        "property",
        "article:modified_time"
      );

      removeMetaTag(
        "property",
        "article:author"
      );

      removeMetaTag(
        "property",
        "article:section"
      );
    }

    const defaultStructuredData =
      buildDefaultStructuredData({
        title,
        description,
        canonicalUrl,
        imageUrl,
        type,
      });

    if (structuredData) {
      setJsonLd(structuredData);
    } else {
      setJsonLd(
        defaultStructuredData
      );
    }
  }, [
    title,
    description,
    canonical,
    image,
    type,
    publishedTime,
    modifiedTime,
    author,
    section,
    structuredData,
  ]);

  return null;
}