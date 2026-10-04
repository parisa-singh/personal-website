// Central place for all outbound links + the repo-name prettifier.
export const LINKS = {
  linkedin: 'https://www.linkedin.com/in/parisa-singh/',
  github: 'https://github.com/parisa-singh',
  substack: 'https://creativecompiler77.substack.com',
  email: 'mailto:parisasingh@gmail.com',
  resume: 'https://drive.google.com/file/d/1lIrF5fA7tJJ1c-Dzn06On99H8tWSh_ta/view?usp=sharing',
}

// Résumé variants, tailored per track — shown in the Résumé picker (in this order).
export const RESUMES = [
  { key: 'SWE', label: 'Software Engineering', sub: 'Building the product end to end.', href: 'https://drive.google.com/file/d/1ofZ-TkjM0vKUTMNsTG5xxc4IzAhPJ3Ym/view?usp=drive_link' },
  { key: 'FDE', label: 'Forward-Deployed', sub: 'Shipping with customers in the loop.', href: 'https://drive.google.com/file/d/11OqeH1T_dKE5mOPOPesAzi3EYISIHtPN/view?usp=drive_link' },
  { key: 'PM', label: 'Product Management', sub: 'Strategy, roadmap & outcomes.', href: 'https://drive.google.com/file/d/1iqCoEa3OaqjNVOlTLfcOP2eAaX1gvyxG/view?usp=drive_link' },
]

export const prettyName = (name = '') =>
  name.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
