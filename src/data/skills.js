// Skills for the Skills page. `level` is a 1–5 proficiency shown as dots.
// Edit the `level` values to taste. Tools also carry a devicon `icon`.

const D = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons'

export const TOOLS = {
  cap: 'Languages & Tools',
  items: [
    { label: 'Python', level: 5, icon: `${D}/python/python-original.svg` },
    { label: 'JavaScript', level: 4, icon: `${D}/javascript/javascript-original.svg` },
    { label: 'Java', level: 4, icon: `${D}/java/java-original.svg` },
    { label: 'React', level: 4, icon: `${D}/react/react-original.svg` },
    { label: 'SQL', level: 3, icon: `${D}/mysql/mysql-original.svg` },
    { label: 'Git', level: 5, icon: `${D}/git/git-original.svg` },
    { label: 'HTML / CSS', level: 4, icon: `${D}/html5/html5-original.svg` },
    { label: 'Figma', level: 4, icon: `${D}/figma/figma-original.svg` },
  ],
}

export const FOCUS = {
  cap: 'Focus Areas',
  items: [
    { label: 'Artificial Intelligence', level: 4 },
    { label: 'Machine Learning', level: 3 },
    { label: 'Web Development', level: 5 },
    { label: 'UI / UX Design', level: 4 },
    { label: 'Game Development', level: 2 },
    { label: 'Data Science', level: 3 },
  ],
}

export const STRENGTHS = {
  cap: 'Strengths',
  items: [
    { label: 'Leadership', level: 5 },
    { label: 'Communication', level: 5 },
    { label: 'Problem Solving', level: 5 },
    { label: 'Teamwork', level: 4 },
    { label: 'Adaptability', level: 4 },
    { label: 'Critical Thinking', level: 4 },
  ],
}
