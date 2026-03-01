const Footer = () => {
  return (
    <footer id="contact" className="bg-card border-t border-border py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-extrabold mb-3">
              <span className="text-gradient-gold">GRILL POINT</span> BURGERS
            </h3>
            <p className="text-sm text-muted-foreground" id="about">
              Hambúrgueres clássicos com sabor marcante, ótimo custo-benefício e agilidade — no salão ou no delivery.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-3 text-foreground">Horário</h4>
            <p className="text-sm text-muted-foreground">Terça a Domingo</p>
            <p className="text-sm text-muted-foreground">18h às 23h</p>
          </div>
          <div>
            <h4 className="font-bold mb-3 text-foreground">Contato</h4>
            <p className="text-sm text-muted-foreground">📱 (11) 99999-9999</p>
            <p className="text-sm text-muted-foreground">📍 Sua cidade, seu bairro</p>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Grill Point Burgers. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
