import React from 'react'

function Hero() {
  return (
    <header className="hero">
      <div className="container">
        <h1>Restaurante Sabor & Arte</h1>
        <p>Pratos artesanais feitos com ingredientes frescos e amor.</p>
        <a className="btn" href="#contato">Reserve agora</a>
      </div>
    </header>
  )
}

function Menu() {
  const items = [
    { name: 'Prato do Dia', desc: 'Especial da casa', price: 'R$ 28' },
    { name: 'Risoto de Cogumelos', desc: 'Creme e vinho branco', price: 'R$ 36' },
    { name: 'Moqueca Vegetariana', desc: 'Leve e saborosa', price: 'R$ 32' }
  ]
  return (
    <section className="menu container">
      <h2>Nosso Menu</h2>
      <div className="cards">
        {items.map((it) => (
          <article key={it.name} className="card">
            <h3>{it.name}</h3>
            <p>{it.desc}</p>
            <span className="price">{it.price}</span>
          </article>
        ))}
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>© {new Date().getFullYear()} Restaurante Sabor & Arte</p>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div>
      <Hero />
      <main>
        <Menu />
      </main>
      <Footer />
    </div>
  )
}
