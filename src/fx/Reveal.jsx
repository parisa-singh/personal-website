import { motion } from 'framer-motion'

const base = {
  hidden: { opacity: 0, y: 26 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.07, ease: [0.22, 1, 0.3, 1] },
  }),
}

/** Scroll-into-view reveal. `i` staggers siblings; `as` sets the element. */
export default function Reveal({ children, i = 0, as = 'div', className, style, ...rest }) {
  const M = motion[as] || motion.div
  return (
    <M
      className={className}
      style={style}
      variants={base}
      custom={i}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      {...rest}
    >
      {children}
    </M>
  )
}
