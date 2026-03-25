import Container from "./Container";
import { Linkedin, Github, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer>
      <Container className="py-3 lg:py-6 lg:flex lg:flex-row lg:justify-around lg:items-center">
        <div className="flex flex-col justify-center items-center">
          <p>© DevStore {new Date().getFullYear()}</p>
          <p>Todos os direitos reservados.</p>
        </div>
        <div className="flex flex-col justify-center items-center p-4 gap-1">
          <p>
            Desenvolvido por <strong>Felipe Augusto</strong>
          </p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p>Contato:</p>
          <div className="flex justify-center items-center gap-4 p-2">
            <a
              href="https://www.linkedin.com/in/felipesilva90/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="https://www.github.com/felipedev90"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors scale-110"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a
              href="mailto:augusto.felipedev90@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors scale-110"
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
