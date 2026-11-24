import Link from 'next/link';
import { MapPin, BedDouble, Maximize2, ArrowUpRight } from 'lucide-react';
import type { Property } from '@/lib/properties';
export default function PropertyCard({ property }: { property: Property }) {
  return <article className="property-card"><Link href={`/property/${property.id}`} className="property-image" style={{ backgroundImage: `url(${property.image})` }} aria-label={`View ${property.title}`}>{property.tag && <span className="image-tag">{property.tag}</span>}<span className="purpose-tag">For {property.purpose}</span></Link><div className="property-info"><p className="eyebrow">{property.type}</p><h3><Link href={`/property/${property.id}`}>{property.title}</Link></h3><p className="location"><MapPin size={15}/>{property.location}</p><div className="property-meta"><span><BedDouble size={15}/>{property.beds}</span><span><Maximize2 size={15}/>{property.area}</span></div><div className="card-bottom"><strong>{property.price}</strong><Link href={`/property/${property.id}`} aria-label="View property"><ArrowUpRight size={19}/></Link></div></div></article>;
}
