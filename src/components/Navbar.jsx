import { useEffect, useState } from 'react';

const links=[['Início','inicio'],['Nossa Essência','essencia'],['Missão','identidade'],['Pilares','pilares'],['Como Atuamos','atuacao'],['Impacto','impacto'],['Contato','contato']];
export default function Navbar(){
 const [open,setOpen]=useState(false),[scrolled,setScrolled]=useState(false),[active,setActive]=useState('inicio');
 useEffect(()=>{const fn=()=>setScrolled(scrollY>24);addEventListener('scroll',fn);return()=>removeEventListener('scroll',fn)},[]);
 useEffect(()=>{const sections=links.map(([,id])=>document.getElementById(id)).filter(Boolean);const observer=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&setActive(e.target.id)),{rootMargin:'-35% 0px -55%'});sections.forEach(s=>observer.observe(s));return()=>observer.disconnect()},[]);
 const go=id=>{document.getElementById(id)?.scrollIntoView({behavior:'smooth'});setOpen(false)};
 return <header className={`nav ${scrolled?'nav--scrolled':''}`}><button className="brand" onClick={()=>go('inicio')} aria-label="Ir ao início"><i className="bi bi-leaf"/> TEKOÁ</button><nav className={open?'navlinks open':'navlinks'}>{links.slice(0,-1).map(([t,id])=><button className={active===id?'active':''} key={id} onClick={()=>go(id)}>{t}</button>)}</nav><button className="nav-contact" onClick={()=>go('contato')}>Fale conosco <i className="bi bi-arrow-up-right"/></button><button className="menu" onClick={()=>setOpen(!open)} aria-label="Abrir menu"><i className={`bi ${open?'bi-x-lg':'bi-list'}`}/></button></header>
}
