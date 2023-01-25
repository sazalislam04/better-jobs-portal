const siteUrl = "https://better-jobs-portal.vercel.app/";
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
  },
  additionalSitemaps: [`${siteUrl}/sitemap.xml`, `${siteUrl}/sitemap-0.xml`],
};
