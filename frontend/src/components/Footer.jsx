function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-emerald-900 text-white mt-auto border-t border-emerald-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-emerald-200/80 text-sm">
            © {currentYear} Diagnosis Cabai. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
