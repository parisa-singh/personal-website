// Skills for the adaptive site. `level` is a 1–5 proficiency shown as dots.
// `lens` is relevance per audience (0–3): swe / fde / pm — drives emphasis.
// Tools also carry a devicon `icon`.

const D = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons'

export const TOOLS = {
  cap: 'Languages & Tools',
  items: [
    { label: 'Python', level: 5, icon: `${D}/python/python-original.svg`, lens: { swe: 3, fde: 3, pm: 1 } },
    { label: 'JavaScript', level: 4, icon: `${D}/javascript/javascript-original.svg`, lens: { swe: 3, fde: 2, pm: 1 } },
    { label: 'Java', level: 4, icon: `${D}/java/java-original.svg`, lens: { swe: 3, fde: 1, pm: 0 } },
    { label: 'React', level: 4, icon: `${D}/react/react-original.svg`, lens: { swe: 3, fde: 2, pm: 1 } },
    { label: 'SQL', level: 3, icon: `${D}/mysql/mysql-original.svg`, lens: { swe: 2, fde: 2, pm: 2 } },
    { label: 'Git', level: 5, icon: `${D}/git/git-original.svg`, lens: { swe: 3, fde: 2, pm: 1 } },
    { label: 'HTML / CSS', level: 4, icon: `${D}/html5/html5-original.svg`, lens: { swe: 2, fde: 1, pm: 1 } },
    { label: 'Figma', level: 4, icon: `${D}/figma/figma-original.svg`, lens: { swe: 1, fde: 1, pm: 3 } },
  ],
}

export const FOCUS = {
  cap: 'Focus Areas',
  items: [
    { label: 'Artificial Intelligence', level: 4, lens: { swe: 2, fde: 3, pm: 2 } },
    { label: 'Machine Learning', level: 3, lens: { swe: 2, fde: 3, pm: 2 } },
    { label: 'Web Development', level: 5, lens: { swe: 3, fde: 2, pm: 1 } },
    { label: 'UI / UX Design', level: 4, lens: { swe: 1, fde: 1, pm: 3 } },
    { label: 'Game Development', level: 2, lens: { swe: 2, fde: 0, pm: 1 } },
    { label: 'Data Science', level: 3, lens: { swe: 2, fde: 2, pm: 2 } },
  ],
}

export const STRENGTHS = {
  cap: 'Strengths',
  items: [
    { label: 'Leadership', level: 5, lens: { swe: 1, fde: 2, pm: 3 } },
    { label: 'Communication', level: 5, lens: { swe: 1, fde: 3, pm: 3 } },
    { label: 'Problem Solving', level: 5, lens: { swe: 3, fde: 3, pm: 2 } },
    { label: 'Teamwork', level: 4, lens: { swe: 2, fde: 2, pm: 3 } },
    { label: 'Adaptability', level: 4, lens: { swe: 2, fde: 3, pm: 2 } },
    { label: 'Critical Thinking', level: 4, lens: { swe: 3, fde: 2, pm: 3 } },
  ],
}

// Flat list used by the knowledge base / ask engine.
export const ALL_SKILLS = [...TOOLS.items, ...FOCUS.items, ...STRENGTHS.items]
