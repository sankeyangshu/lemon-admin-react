function Footer() {
  return (
    <div className="flex h-full items-center justify-center bg-sidebar">
      <span
        className="
          cursor-pointer transition-colors duration-300
          hover:text-primary
        "
        onClick={() =>
          window.open('https://github.com/sankeyangshu/lemon-admin-react/blob/main/LICENSE', '_blank', 'noopener,noreferrer')}
      >
        Copyright MIT © 2022-PRESENT sankeyangshu
      </span>
    </div>
  );
}

export default Footer;
