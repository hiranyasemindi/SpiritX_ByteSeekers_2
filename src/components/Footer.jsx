const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-center text-gray-600 text-sm p-5">
      <p>
        &copy; {currentYear} All rights reserved.{" "}
        <a
          href="https://virul.me"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#FF5B27] hover:underline"
        >
          ByteSkeers
        </a>
      </p>
    </footer>
  );
};

export default Footer;
