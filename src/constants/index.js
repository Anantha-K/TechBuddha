import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
  threejs,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
    href: "/#about", 
  },
  {
    id: "members",
    title: "Members",
    href: "/#members", 
  },
  {
    id: "achievements",
    title: "Achievements",
    href: "/#achievements", 
  },
  {
    id: "projects",
    title: "Projects",
    href: "/#projects", 
  },
  {
    id: "contact",
    title: "Contact Us",
    href: "/#contact", 
  },
];

const services = [
  {
    title: "Medical",
    icon: web,
  },
  // {
  //   title: "Agriculture",
  //   icon: mobile,
  // },
  {
    title: "App Development",
    icon: backend,
  },
  // {
  //   title: "Industrial",
  //   icon: creator,
  // },
];



const experiences = [
  {
    title: "HOSPEX DETAILS",
    company_name: "",
    icon: starbucks,
    iconBg: "#383E56",
    date: "",
    points: [
      ""
    ],
  },
  {
    title: "Ideathon",
    company_name: "",
    // icon: tesla,
    iconBg: "#E6DEDD",
    date: "Jan 2021 - Feb 2022",
    points: [
     ""
    ],
  },
{
    title: "",
    company_name: "",
    // icon: shopify,
    iconBg: "#383E56",
    date: "",
    points: [
      ""
    ],
  },
  {
    title: "",
    company_name: "",
    // icon: meta,
    iconBg: "#E6DEDD",
    date: "",
    points: [
      "",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "Car Rent",
    description:
      "Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: carrent,
    source_code_link: "https://github.com/",
  },
  {
    name: "Job IT",
    description:
      "Web application that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "restapi",
        color: "green-text-gradient",
      },
      {
        name: "scss",
        color: "pink-text-gradient",
      },
    ],
    image: jobit,
    source_code_link: "https://github.com/",
  },
  {
    name: "Trip Guide",
    description:
      "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link: "https://github.com/",
  },
];

export { services, experiences, testimonials, projects };
