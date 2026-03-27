import Container from "./Container";
import { Linkedin, Github, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer id="footer">
      <Container className="py-3 lg:py-6 lg:flex lg:flex-row lg:justify-around lg:items-center">
        <div className="flex flex-col flex-wrap justify-center items-center py-2">
          <p className="text-cyan-950 text-lg lg:text-xl font-bold">
            © DevStore {new Date().getFullYear()}
          </p>
          <p className="text-center">
            A place for developers to connect and grow.
          </p>
          <p className="text-xs lg:text-sm">Todos os direitos reservados.</p>
        </div>

        <div className="hidden md:block md:w-px md:bg-gray-300 md:h-60 md:m-0"></div>

        <div className=" grid grid-cols-1 text-center md:grid-cols-3 gap-8 md:gap-12 py-4">
          <div className="flex flex-col justify-center items-center gap-2">
            <h3 className="font-bold text-lg">Institucional</h3>
            <ul>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-600 transition-colors scale-110"
                >
                  Sobre Nós
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-600 transition-colors scale-110"
                >
                  Movimento
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-600 transition-colors scale-110"
                >
                  Trabalhe conosco
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col justify-center items-center gap-2">
            <h3 className="font-bold text-lg">Ajuda</h3>
            <ul>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-600 transition-colors scale-110"
                >
                  Suporte
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-600 transition-colors scale-110"
                >
                  Fale Conosco
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-600 transition-colors scale-110"
                >
                  Perguntas Frequentes
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col justify-center items-center gap-2">
            <h3 className="font-bold text-lg">Termos</h3>
            <ul>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-600 transition-colors scale-110"
                >
                  Termos e Condições
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-600 transition-colors scale-110"
                >
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-600 transition-colors scale-110"
                >
                  Troca e Devolução
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="hidden md:block md:w-px md:bg-gray-300 md:h-60 md:m-0"></div>

        <div className="flex flex-col justify-center items-center px-4 py-2">
          <p className="font-bold text-lg">Contato:</p>
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
      <div className="bg-blue-950 flex flex-col justify-center items-center p-4 gap-1">
        <div>
          <p className="text-gray-300">
            Desenvolvido por{" "}
            <strong className="text-white">Felipe Augusto 🍃</strong>
          </p>
        </div>
      </div>
    </footer>
  );
}
