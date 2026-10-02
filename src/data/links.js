// Central place for all outbound links + the repo-name prettifier.
export const LINKS = {
  linkedin: 'https://www.linkedin.com/in/parisa-singh/',
  github: 'https://github.com/parisa-singh',
  substack: 'https://creativecompiler77.substack.com',
  email: 'mailto:parisasingh@gmail.com',
  resume: 'https://drive.google.com/file/d/1lIrF5fA7tJJ1c-Dzn06On99H8tWSh_ta/view?usp=sharing',
}

export const prettyName = (name = '') =>
  name.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
