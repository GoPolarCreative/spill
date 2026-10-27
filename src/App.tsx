import { FormEvent, useState } from 'react';
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  Droplets,
  Factory,
  Leaf,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Truck,
  X,
} from 'lucide-react';

const logo = '/spilllogo.png';
const web3FormsKey = 'f2d64d50-e5cf-4aca-bd62-2309d49d0f27';
type SelectedImage = { src: string; alt: string; caption: string };

const galleryImages: SelectedImage[] = [
  { src: '/images/oil_spill_1_(1).jpg', alt: 'Spill containment equipment at a commercial site', caption: 'Containment at the source' },
  { src: '/images/oil_spill_2_(1).jpg', alt: 'Spill response team working at an industrial site', caption: 'Practical site response' },
  { src: '/images/oil_spill_3_(1).jpg', alt: 'Absorbent materials used for spill clean-up', caption: 'Safe clean-up methods' },
  { src: '/images/oil_spill_4_(1).jpg', alt: 'Spill response vehicle at a response site', caption: 'Ready across New Zealand' },
  { src: '/images/restock_and_review_(1).jpg', alt: 'Spill response equipment ready for use', caption: 'Always ready to respond' },
  { src: '/images/BEFORE_OILSPILL.webp', alt: 'Industrial site before oil spill clean-up', caption: 'Before response' },
  { src: '/images/BEFORE_OILSPILL1.webp', alt: 'Oil spill area before professional clean-up', caption: 'Assessing the affected area' },
  { src: '/images/CLEANING_OILSPILL1.webp', alt: 'Team cleaning an oil spill at an industrial site', caption: 'Professional clean-up in action' },
  { src: '/images/AFTER_OILSPILL.webp', alt: 'Industrial site after oil spill clean-up', caption: 'Site restored' },
  { src: '/images/AFTER_OILSPILL1.webp', alt: 'Clean surface after oil spill response', caption: 'A safer site, ready to reopen' },
];

const services = [
  {
    icon: Droplets,
    number: '01',
    title: 'Oil & fuel spills',
    text: 'Fast containment and professional clean-up for diesel, petrol, hydraulic oil and more.',
  },
  {
    icon: Factory,
    number: '02',
    title: 'Industrial clean-up',
    text: 'Practical spill support for workshops, depots, factories, yards and heavy machinery sites.',
  },
  {
    icon: Truck,
    number: '03',
    title: 'Roads & sites',
    text: 'Rapid response for vehicle incidents, transport sites, roadways and public areas.',
  },
  {
    icon: Leaf,
    number: '04',
    title: 'Containment & disposal',
    text: 'Safe isolation, recovery and responsible disposal with environmental impact in mind.',
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [heroStatus, setHeroStatus] = useState('');
  const [detailStatus, setDetailStatus] = useState('');
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null);

  const submitForm = async (event: FormEvent<HTMLFormElement>, setStatus: (message: string) => void) => {
    event.preventDefault();
    setStatus('Sending your request...');

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append('access_key', web3FormsKey);
    formData.append('subject', 'New spill response enquiry - Spill Response NZ');
    formData.append('from_name', 'Spill Response NZ website');
    formData.append('replyto', String(formData.get('email') || ''));

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json() as { success?: boolean };
      if (!response.ok || !result.success) throw new Error('Unable to send');
      form.reset();
      setStatus('Request received. Our response team will be in touch shortly.');
    } catch {
      setStatus('We could not send your request. Please call 0800 939 274 instead.');
    }
  };

  return (
    <div className="site-shell">
      <div className="topline"><span className="pulse-dot" /> 24/7 emergency response across New Zealand</div>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Spill Response NZ home"><img src={logo} alt="Spill Response NZ" /></a>
        <button className="menu-button" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={24} /> : <Menu size={24} />}</button>
        <nav className={menuOpen ? 'main-nav open' : 'main-nav'}>
          <a href="#services" onClick={() => setMenuOpen(false)}>Our services</a>
          <a href="#why-us" onClick={() => setMenuOpen(false)}>Why us</a>
          <a href="#areas" onClick={() => setMenuOpen(false)}>Coverage</a>
          <a className="nav-call" href="tel:0800939274"><Phone size={16} /> 0800 939 274</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero section-wrap">
          <div className="hero-copy">
            <div className="eyebrow"><span /> Fast response. Expert clean-up. A safer tomorrow.</div>
            <h1>When a spill happens, <em>we respond.</em></h1>
            <p className="hero-lede">Professional oil spill containment and clean-up for businesses, worksites and communities across New Zealand.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="tel:0800939274"><Phone size={18} /> Call 0800 939 274</a>
              <a className="text-link" href="#services">Explore our services <ArrowRight size={17} /></a>
            </div>
            <div className="trust-row"><div><strong>10+</strong><span>years industry experience</span></div><div><strong>24/7</strong><span>rapid response</span></div><div><strong>2</strong><span>key NZ regions</span></div></div>
          </div>
          <div className="hero-form-card" id="enquire">
            <div className="form-card-top"><div><span className="form-kicker">Need help now?</span><h2>Request a response</h2></div><div className="form-icon"><ShieldCheck size={25} /></div></div>
            <p>Tell us a little about the situation and our team will contact you as soon as possible.</p>
            <form onSubmit={(event) => submitForm(event, setHeroStatus)}>
              <div className="field-grid"><label>Name*<input name="name" required placeholder="Your name" /></label><label>Phone*<input name="phone" required type="tel" placeholder="Your phone number" /></label></div>
              <label>Email address*<input name="email" required type="email" placeholder="you@company.co.nz" /></label>
              <label>How can we help?*<textarea name="message" required rows={3} placeholder="Briefly describe the spill and its location" /></label>
              <button className="button button-dark" type="submit">Send enquiry <ArrowRight size={17} /></button>
              {heroStatus && <p className="form-status" aria-live="polite">{heroStatus}</p>}
            </form>
          </div>
        </section>

        <section className="alert-strip"><div className="section-wrap alert-inner"><Clock3 size={22} /><p><strong>Spill presents an immediate danger?</strong> Move to a safe location and contact emergency services. Only approach or contain the spill if it is safe to do so.</p><a href="tel:111">Emergency services <ArrowRight size={16} /></a></div></section>

        <section className="intro section-wrap" id="why-us">
          <div className="section-label">01 / The response difference</div>
          <div className="intro-grid"><h2>More than a clean-up.<br /><span>Peace of mind.</span></h2><div><p className="large-copy">Spill Response NZ is an Auckland-based team with over a decade of experience in professional cleaning and specialist spill services.</p><p>We bring that practical experience to every spill response, helping you contain the problem quickly, minimise environmental impact and safely get your site back on track.</p><a className="text-link blue-link" href="#enquire">Talk to our team <ArrowRight size={17} /></a></div></div>
          <div className="feature-list"><div><Check size={18} /><span>Trained, equipped response team</span></div><div><Check size={18} /><span>Practical support from first call to clean-up</span></div><div><Check size={18} /><span>Safety and environmental focus</span></div></div>

        </section>

        <section className="services-section" id="services"><div className="section-wrap"><div className="section-label light-label">02 / What we do</div><div className="section-heading"><h2>Ready for the<br /><span>unexpected.</span></h2><p>From a small site spill to a major incident, our team has the equipment, experience and calm approach to take control.</p></div><div className="service-grid">{services.map(({ icon: Icon, number, title, text }) => <article className="service-card" key={title}><div className="service-number">{number}</div><Icon className="service-icon" size={30} /><h3>{title}</h3><p>{text}</p><a href="#enquire" aria-label={`Enquire about ${title}`}><ArrowRight size={19} /></a></article>)}</div></div></section>

        <section className="field-gallery"><div className="section-wrap"><div className="section-label light-label">03 / Out in the field</div><div className="gallery-heading"><h2>Real work.<br /><span>Real results.</span></h2><p>Our team works in the places spills happen most, from busy yards and transport sites to commercial and industrial facilities.</p></div><div className="gallery-grid">{galleryImages.map((image) => <figure className="gallery-tile" key={image.src}><button className="image-trigger" type="button" onClick={() => setSelectedImage(image)} aria-label={`Enlarge image: ${image.caption}`}><img src={image.src} alt={image.alt} /></button><figcaption>{image.caption}</figcaption></figure>)}</div></div></section>

        <section className="coverage section-wrap" id="areas"><div className="coverage-map"><div className="map-ring ring-one" /><div className="map-ring ring-two" /><MapPin size={34} /><span className="map-label label-auckland">Auckland</span><span className="map-label label-waikato">Waikato</span></div><div className="coverage-copy"><div className="section-label">03 / Where we respond</div><h2>Local support.<br /><span>National standards.</span></h2><p>Kiwi-owned and locally operated, our response team supports Auckland, Waikato and surrounding areas with fast, professional help when you need it most.</p><div className="coverage-items"><div><MapPin size={18} /><span>Auckland & surrounding areas</span></div><div><MapPin size={18} /><span>Waikato & surrounding areas</span></div><div><Phone size={18} /><a href="tel:0800939274">One call: 0800 939 274</a></div></div></div></section>

        <section className="detail-section section-wrap"><button className="accordion-trigger" onClick={() => setDetailsOpen(!detailsOpen)} aria-expanded={detailsOpen}><span><span className="section-label">04 / Detailed request</span><strong>Need to provide more information?</strong><small>Open the full spill response form for a detailed assessment.</small></span><span className="accordion-icon">{detailsOpen ? <X size={22} /> : <ChevronDown size={22} />}</span></button>{detailsOpen && <div className="detail-form-wrap"><form onSubmit={(event) => submitForm(event, setDetailStatus)}><input type="hidden" name="request_type" value="Detailed spill response" /><div className="form-section-title">Contact details</div><div className="field-grid three"><label>Name*<input name="name" required /></label><label>Company<input name="company" /></label><label>Phone number*<input name="phone" required type="tel" /></label><label>Email address*<input name="email" required type="email" /></label><label>On-site contact & phone<input name="onsite_contact" /></label></div><div className="form-section-title">Spill location</div><label>Site / location address*<input name="location" required /></label><div className="form-section-title">Spill details</div><div className="field-grid three"><label>What has been spilled?*<input name="spill_type" required /></label><label>Approximate amount spilled*<input name="spill_amount" required /></label><label>When did it occur?*<input name="spill_time" required placeholder="e.g. Today, 2pm" /></label></div><div className="field-grid"><label>Is the spill still leaking?*<select name="still_leaking" required><option value="">Please select</option><option>Yes</option><option>No</option></select></label><label>Has it reached a drain, waterway, soil or sensitive area?*<select name="environmental_impact" required><option value="">Please select</option><option>Yes</option><option>No</option><option>Unsure</option></select></label></div><div className="form-section-title">Photos & additional information</div><label>Upload photos, if safe to do so<input name="attachment" type="file" accept="image/*" /></label><label>Is there anything else our response team should know?<textarea name="additional_information" rows={4} /></label><div className="detail-submit"><button className="button button-primary" type="submit">Request spill response <ArrowRight size={17} /></button><span>We will use these details to prepare for the job.</span></div>{detailStatus && <p className="form-status" aria-live="polite">{detailStatus}</p>}</form></div>}</section>

        <section className="final-cta"><div className="section-wrap final-inner"><div><div className="eyebrow"><span /> One call. Rapid response. Expert clean-up.</div><h2>Don’t wait for a spill<br /><em>to become a crisis.</em></h2></div><a className="button button-light" href="tel:0800939274"><Phone size={18} /> Call our response team</a></div></section>
      </main>

      <footer className="site-footer"><div className="section-wrap footer-grid"><div><img className="footer-logo" src={logo} alt="Spill Response NZ" /><p>Fast response, expert clean-up and a safer tomorrow.</p></div><div><span className="footer-heading">Get in touch</span><a href="tel:0800939274"><Phone size={16} /> 0800 939 274</a><a href="mailto:response@spillresponsenz.co.nz"><Mail size={16} /> response@spillresponsenz.co.nz</a></div><div><span className="footer-heading">Service areas</span><span>Auckland</span><span>Waikato</span><span>New Zealand</span></div></div><div className="section-wrap footer-bottom"><span>© {new Date().getFullYear()} Spill Response NZ. All rights reserved.</span><a href="https://www.itscold.com.au" target="_blank" rel="noreferrer">Website by Go Polar</a></div></footer>
      {selectedImage && <div className="image-lightbox" role="dialog" aria-modal="true" aria-label={selectedImage.caption} onClick={(event) => { if (event.target === event.currentTarget) setSelectedImage(null); }}><div className="lightbox-content"><button className="lightbox-close" type="button" onClick={() => setSelectedImage(null)} aria-label="Close enlarged image"><X size={24} /></button><img src={selectedImage.src} alt={selectedImage.alt} /><p>{selectedImage.caption}</p></div></div>}
    </div>
  );
}

export default App;
