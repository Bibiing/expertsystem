function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-linear-to-b from-[#5a5f52] to-[#4a4e45] text-[#EEEEEE] mt-auto rounded-t-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center">
          <p className="text-[#CBCBCB] text-sm">
            © {currentYear} Diagnosis Cabai. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
