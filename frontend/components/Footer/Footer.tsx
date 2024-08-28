import { Instagram, X, Linkedin, Youtube } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-5 bg-black text-white/60 border-t border-white/20">
      <div className="container">
        <div className="flex flex-col gap-5 sm:flex-row sm:justify-between items-center">
          <div className="text-center">© 2024 Tpezz. All rights reserved.</div>
          <ul className="flex justify-center gap-4">
            <li>
              <a
                href="https://twitter.com/animesh_xd"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 transition-colors"
              >
                <X size={20} />
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/animesh_xd"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/animesh_xd"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 transition-colors"
              >
                <Instagram size={20} />
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/animesh_xd"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 transition-colors"
              >
                <Youtube size={20} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
