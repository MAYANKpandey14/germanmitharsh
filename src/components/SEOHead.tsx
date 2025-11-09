import { Helmet } from "react-helmet";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonical?: string;
}

const SEOHead = ({
  title = "Learn German Online | A1-C1 Courses by Harsh",
  description = "Master German with live classes, 1:1 mentorship, and proven results. 95% exam pass rate. Learn from ex-Language Pantheon faculty. Enroll in A1-C1 courses today!",
  keywords = "learn german online, german courses, german classes, german language, A1 german, B2 german, german tutor, online german course",
  ogImage = "https://germanmitharsh.lovable.app/og-image.jpg",
  ogType = "website",
  canonical
}: SEOHeadProps) => {
  const siteUrl = "https://germanmitharsh.lovable.app";
  const fullTitle = title.includes("German Mit Harsh") ? title : `${title} | German Mit Harsh`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical || siteUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonical || siteUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />

      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
    </Helmet>
  );
};

export default SEOHead;
