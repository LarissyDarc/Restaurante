import React, { useState } from 'react'

const WHATSAPP_NUMBER = '5561999999999'

const menuItems = [
  {
    name: 'Prato do Dia',
    desc: 'Uma receita especial preparada com ingredientes frescos.',
    price: 'R$ 28',
    img: 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1000&auto=format&fit=crop'
  },
  {
    name: 'Risoto de Cogumelos',
    desc: 'Arroz cremoso, cogumelos selecionados e um toque de ervas.',
    price: 'R$ 36',
    img: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=1000&auto=format&fit=crop'
  },
  {
    name: 'Moqueca Vegetariana',
    desc: 'Legumes, leite de coco e temperos que aquecem a mesa.',
    price: 'R$ 32',
    img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop'
  }
]

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#inicio" aria-label="Sabor e Arte, início">
        <span className="brand-mark">S<span>&</span>A</span>
        <span className="brand-name">Sabor <i>&</i> Arte</span>
      </a>
      <nav className="main-nav" aria-label="Navegação principal">
        <a href="#cardapio">Cardápio</a>
        <a href="#historia">Nossa casa</a>
        <a href="#visite">Visite-nos</a>
      </nav>
      <a className="button button-small" href="#reservas">Reserve sua mesa <span aria-hidden="true">↗</span></a>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-image" role="img" aria-label="Mesa posta para uma refeição especial" />
      <div className="hero-shade" />
      <div className="hero-content">
        <p className="eyebrow">COZINHA DE AFETO · DESDE 2016</p>
        <h1>Um lugar para<br /><em>saborear a vida.</em></h1>
        <p className="hero-copy">Receitas feitas com cuidado, ingredientes frescos e espaço para boas conversas.</p>
        <div className="hero-actions">
          <a className="button" href="#reservas">Reserve sua mesa <span aria-hidden="true">↗</span></a>
          <a className="text-link light-link" href="#cardapio">Descubra o cardápio <span aria-hidden="true">↓</span></a>
        </div>
      </div>
      <div className="hero-note"><span>01 / 03</span><span>FEITO PARA COMPARTILHAR</span></div>
    </section>
  )
}

function Menu() {
  return (
    <section className="menu-section section-wrap" id="cardapio">
      <div className="section-heading">
        <div>
          <p className="eyebrow eyebrow-dark">DA NOSSA COZINHA</p>
          <h2>Sabores para<br /><em>ficar na memória.</em></h2>
        </div>
        <p className="section-intro">Clássicos de casa e novidades da estação, preparados para transformar qualquer encontro em ocasião especial.</p>
      </div>
      <div className="dish-grid">
        {menuItems.map((item, index) => (
          <article className="dish-card" key={item.name}>
            <div className="dish-image-wrap">
              <img src={item.img} alt={item.name} loading="lazy" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop' }} />
              <span className="dish-number">0{index + 1}</span>
            </div>
            <div className="dish-details">
              <div className="dish-title"><h3>{item.name}</h3><span>{item.price}</span></div>
              <p>{item.desc}</p>
            </div>
          </article>
        ))}
      </div>
      <a className="text-link dark-link" href="#reservas">Venha provar <span aria-hidden="true">↗</span></a>
    </section>
  )
}

function Story() {
  return (
    <section className="story-section" id="historia">
      <div className="story-photo" role="img" aria-label="Prato preparado com ingredientes frescos" />
      <div className="story-copy">
        <p className="eyebrow">MAIS QUE UMA REFEIÇÃO</p>
        <h2>Receber bem<br />é a nossa <em>receita.</em></h2>
        <p>Acreditamos que uma boa mesa aproxima as pessoas. Por isso, cada detalhe — do primeiro ingrediente ao último café — é pensado para você se sentir em casa.</p>
        <a className="text-link light-link" href="#visite">Conheça nossa casa <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  )
}

function Visit() {
  return (
    <section className="visit-section section-wrap" id="visite">
      <div className="visit-heading">
        <p className="eyebrow eyebrow-dark">A MESA ESTÁ POSTA</p>
        <h2>Seu próximo<br /><em>momento favorito.</em></h2>
      </div>
      <div className="visit-details">
        <p>Venha almoçar sem pressa, celebrar uma data ou simplesmente aproveitar algo gostoso. A gente cuida do resto.</p>
        <div className="hours"><span>TER — DOM</span><strong>12h às 22h</strong></div>
        <a className="button" href="#reservas">Faça sua reserva <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  )
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  function onChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  function onSubmit(event) {
    event.preventDefault()
    const message = [
      'Olá! Gostaria de fazer uma reserva no Sabor & Arte.',
      `Nome: ${form.name}`,
      `E-mail: ${form.email}`,
      form.message ? `Detalhes: ${form.message}` : ''
    ].filter(Boolean).join('\n')
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank', 'noopener,noreferrer')
    setSent(true)
  }

  return (
    <section className="reservation-section" id="reservas">
      <div className="reservation-copy">
        <p className="eyebrow">BONS MOMENTOS COMEÇAM À MESA</p>
        <h2>Vamos guardar<br />um lugar <em>para você?</em></h2>
        <p>Deixe seus dados e entraremos em contato para combinar sua visita.</p>
      </div>
      <div className="reservation-form-wrap">
        {sent ? (
          <p className="form-notice" role="status">Mensagem preparada no WhatsApp. Revise e envie na conversa para concluir seu pedido.</p>
        ) : (
          <form className="reservation-form" onSubmit={onSubmit}>
            <label>Seu nome<input name="name" autoComplete="name" placeholder="Como podemos chamar você?" required value={form.name} onChange={onChange} /></label>
            <label>Seu e-mail<input type="email" name="email" autoComplete="email" placeholder="voce@email.com" required value={form.email} onChange={onChange} /></label>
            <label>Conte um pouco mais<textarea name="message" placeholder="Data, horário ou ocasião especial" rows={3} value={form.message} onChange={onChange} /></label>
            <button className="button" type="submit">Enviar pedido <span aria-hidden="true">↗</span></button>
          </form>
        )}
      </div>
    </section>
  )
}

function WhatsAppButton() {
  const message = encodeURIComponent('Olá! Gostaria de falar com o Restaurante Sabor & Arte.')
  return (
    <a className="whatsapp-float" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`} target="_blank" rel="noopener noreferrer" aria-label="Fale com o Sabor & Arte pelo WhatsApp">
      <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3a12.5 12.5 0 0 0-10.7 19L3.5 29l7.2-1.8A12.5 12.5 0 1 0 16 3Zm0 22.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-4.2 1.1 1.1-4.1-.3-.4A10.2 10.2 0 1 1 16 25.8Zm5.6-7.6c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8.3 8.3 0 0 1-2.5-1.5 9.4 9.4 0 0 1-1.7-2.1c-.2-.3 0-.5.2-.7l.5-.6c.2-.2.2-.4.3-.6s0-.4 0-.6-.7-1.7-.9-2.3c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4s-1.2 1.2-1.2 2.8 1.2 3.2 1.4 3.4 2.4 3.7 5.8 5.1c.8.3 1.4.5 1.8.6.8.2 1.5.2 2.1.1.7-.1 1.8-.7 2.1-1.4s.3-1.3.2-1.4-.3-.2-.6-.4Z"/></svg>
      <span>WhatsApp</span>
    </a>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <a className="brand footer-brand" href="#inicio"><span className="brand-mark">S<span>&</span>A</span><span className="brand-name">Sabor <i>&</i> Arte</span></a>
      <p>Feito com carinho. Servido com alegria.</p>
      <a href="#inicio">Voltar ao início ↑</a>
      <small>© {new Date().getFullYear()} Restaurante Sabor & Arte</small>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Menu />
        <Story />
        <Visit />
        <Contact />
      </main>
      <WhatsAppButton />
      <Footer />
    </>
  )
}



