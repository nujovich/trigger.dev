import GitHubStarsTemplateBg from "../../../public/images/templates/github-stars-template-bg.png";
import ResendSlackTemplateBg from "../../../public/images/templates/resend-slack-template-bg.png";
import ShopifyTemplateBg from "../../../public/images/templates/shopify-template-bg.png";

export type TemplateData = {
  title: string;
  shortTitle: string;
  description: string;
  imageURL: string;
  githubRepoURL: string;
  services: string[];
  documentation?: string;
};

export const templateData = [
  {
    title: "Slack notifications when a GitHub repo is starred",
    shortTitle: "GitHub stars to Slack",
    description:
      "When a GitHub repo is starred, post information about the user to Slack",
    imageURL: GitHubStarsTemplateBg,
    githubRepoURL: "repo-url",
    services: ["slack", "github"],
    documentation: "```js\nconsole.log('hello world')\n```"
  },
  {
    title: "New user welcome email drip campaign",
    shortTitle: "GitHub stars to Slack",
    description: "Create a welcome email drip campaign using Slack and Resend",
    imageURL: ResendSlackTemplateBg,
    githubRepoURL: "repo-url",
    services: ["slack", "github"],
  },
  {
    title: "Add a new product to Shopify",
    shortTitle: "GitHub stars to Slack",
    description: "Add a new product to Shopify",
    imageURL: ShopifyTemplateBg,
    githubRepoURL: "repo-url",
    services: ["slack", "github"],
  },
];
