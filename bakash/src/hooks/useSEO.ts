import { useEffect } from "react";

interface SEOProps {
  title: string;
  description?: string;
}

export const useSEO = ({ title, description }: SEOProps) => {
  useEffect(() => {
    // Set standard document title
    document.title = `${title} | bKash Payment`;
    
    // Set Open Graph title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", document.title);

    // Set Twitter title
    const twitterTitle = document.querySelector('meta[property="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute("content", document.title);

    // Set descriptions if provided
    if (description) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) metaDescription.setAttribute("content", description);

      const ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) ogDescription.setAttribute("content", description);

      const twitterDescription = document.querySelector('meta[property="twitter:description"]');
      if (twitterDescription) twitterDescription.setAttribute("content", description);
    }
  }, [title, description]);
};
