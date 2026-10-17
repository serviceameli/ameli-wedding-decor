import { ArrowUpRight } from 'lucide-react';
import { asset } from '@/data/catalog';
import { siteHref } from '@/lib/navigation';

export function TactileNavigation() {
  const links = [
    { image: 'setting', title: 'Готовые сочетания', href: siteHref('#wedding-zones') },
    { image: 'inspiration', title: 'Посмотреть идеи', href: siteHref('portfolio/') },
    { image: 'invitation', title: 'Как всё устроено', href: siteHref('how-it-works/') },
    { image: 'phone', title: 'Поговорить с Амели', href: siteHref('contacts/') },
  ];
  return <nav className="tactile-navigation page-width" aria-label="Начните знакомство с Амели">{links.map(link => <a href={link.href} className="tactile-link" key={link.image}><span className="tactile-link-image"><img src={asset(`brand/${link.image}.png`)} alt="" width="1080" height="1080" loading="lazy" /></span><span className="tactile-link-title">{link.title}<ArrowUpRight size={17} /></span></a>)}</nav>;
}
