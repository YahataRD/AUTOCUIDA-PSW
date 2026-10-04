const navigationItems = [
  { id: "dashboard", label: "Painel", icon: "◔" },
  { id: "garage", label: "Garagem", icon: "▱" },
  { id: "service", label: "Serviço", icon: "⚒" },
  { id: "costs", label: "Custos", icon: "▥" },
];

export default function BottomNavigation({ activePage, onNavigate }) {
  return (
    <nav className="bottom-nav" aria-label="Navegação principal">
      <div className="bottom-nav-inner">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            className={`nav-button ${activePage === item.id ? "active" : ""}`}
            type="button"
            onClick={() => onNavigate(item.id)}
            aria-current={activePage === item.id ? "page" : undefined}
          >
            <span aria-hidden="true">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
