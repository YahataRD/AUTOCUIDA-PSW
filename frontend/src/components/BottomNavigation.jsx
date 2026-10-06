const navigationItems = [
  { id: "dashboard", label: "Painel", icon: "◔" },
  { id: "garage", label: "Garagem", icon: "▱" },
  { id: "service", label: "Serviço", icon: "⚒" },
  { id: "costs", label: "Custos", icon: "▥" },
];

export default function BottomNavigation({ activePage, onNavigate, disabled }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-10 border-t border-line bg-surface/96 backdrop-blur-md lg:static lg:mx-auto lg:mt-7 lg:w-[calc(100%-5rem)] lg:overflow-hidden lg:rounded-2xl lg:border" aria-label="Navegação principal">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-4 px-2 pt-[0.55rem] pb-[max(0.7rem,env(safe-area-inset-bottom))]">
        {navigationItems.map((item) => (
          <button
            disabled={disabled}
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
