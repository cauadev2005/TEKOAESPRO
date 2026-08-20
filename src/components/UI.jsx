import { motion } from 'framer-motion';
export const Reveal=({children,className='',delay=0})=><motion.div className={className} initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} transition={{duration:.65,delay}} viewport={{once:true,amount:.18}}>{children}</motion.div>;
export const SectionTitle=({eyebrow,title,light=false})=><div className={`section-title ${light?'light':''}`}>{eyebrow&&<span>{eyebrow}</span>}<h2>{title}</h2></div>;
