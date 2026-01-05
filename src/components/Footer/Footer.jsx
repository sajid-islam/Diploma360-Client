const Footer = () => {
  return (
    <footer className="border-t bg-white dark:bg-background">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-600 dark:text-gray-400">
        <p>© {new Date().getFullYear()} All rights reserved.</p>

        <p>
          Built by{" "}
          <a
            href="https://sajid-islam.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-gray-900 dark:text-gray-100 hover:underline"
          >
            Sajid Islam
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
