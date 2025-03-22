type MobileMenuToggleProps = {
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  menuOpen: boolean;
};

const MobileMenuToggle = ({ setMenuOpen, menuOpen }: MobileMenuToggleProps) => (
  <button
    aria-label="Toggle menu"
    onClick={() => setMenuOpen((prev) => !prev)}
    className="flex items-center justify-center w-12 h-12 text-black rounded-full transition-transform duration-300 hover:scale-105 active:scale-95"
  >
    {menuOpen ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    )}
  </button>
);

export { MobileMenuToggle };
