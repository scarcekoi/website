import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Projects',
      links: [
        {
          text: 'Projects Home',
          href: getPermalink('/projects'),
        },
        {
          text: 'House Information',
          href: getPermalink('/projects/house-information'),
        },
      ],
    },
    {
      text: 'Blog',
      links: [
        {
          text: 'Blog Home',
          href: getBlogPermalink(),
        }
      ],
    },  
  ],
};

export const footerData = {
  links: [
    {
      title: 'Projects',
      links: [
        { text: 'House Information', href: 'projects/house-information' },
      ],
    },
  ],
  socialLinks: [
    { ariaLabel: 'YouTube', icon: 'tabler:brand-youtube', href: 'https://www.youtube.com/@scarcekoi' },
    { ariaLabel: 'Discord', icon: 'tabler:brand-discord', href: 'https://discord.gg/X8QBgNdRFd' },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/scarcekoi' },
    //{ ariaLabel: 'Mastodon', icon: 'tabler:brand-mastodon', href: 'https://mastodon.social/@scarcekoi' },
  ],
};
