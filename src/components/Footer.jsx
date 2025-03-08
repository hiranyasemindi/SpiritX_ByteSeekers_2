const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="m-8 text-center text-gray-600 text-sm">
      <p>
        &copy; {currentYear} All rights reserved.{" "}
        <a
          href="https://virul.me"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#FF5B27] hover:underline"
        >
          iamvirul
        </a>
      </p>
    </footer>
  );
};

export default Footer;
