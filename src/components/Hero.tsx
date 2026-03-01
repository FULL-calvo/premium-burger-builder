const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-dark">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1400&q=80)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4">
          <span className="text-gradient-gold">GRILL POINT</span>
          <br />
          <span className="text-foreground">BURGERS</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-8">
          Sabor marcante, qualidade consistente e agilidade no atendimento. A escolha certa para matar a fome!
        </p>
        <a
          href="#menu"
          className="inline-block px-8 py-4 bg-primary text-primary-foreground font-bold rounded-lg hover:brightness-110 transition-all hover:scale-105"
        >
          Ver Cardápio
        </a>
      </div>
    </section>
  );
};

export default Hero;
