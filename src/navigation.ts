import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Projects',
      links: [
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
          text: 'Blog Posts',
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
        { text: 'House Information', href: 'house-information' },
        { text: 'Blog', href: '#' },
        { text: 'Careers', href: '#' },
        { text: 'Press', href: '#' },
        { text: 'Inclusion', href: '#' },
        { text: 'Social Impact', href: '#' },
        { text: 'Shop', href: '#' },
      ],
    },
  ],
  socialLinks: [
    { ariaLabel: 'YouTube', icon: 'tabler:brand-youtube', href: 'https://www.youtube.com/@scarcekoi' },
    { ariaLabel: 'Discord', icon: 'tabler:brand-discord', href: 'https://discord.gg/X8QBgNdRFd' },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/scarcekoi' },
  ],
};
