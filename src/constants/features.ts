import { BarChart2, Cloud, Database, Lock, Moon, FileText } from "lucide-react";

export const features = [
  {
    heading: "Carga inteligente y validación automática.",
    description:
      "Sube tus archivos con un solo clic y nuestro sistema verifica automáticamente que toda la información esté en el formato correcto. Sin errores, sin complicaciones.",
    icon: FileText,
  },
  {
    heading: "Resumen interactivo de documentos.",
    description:
      "Obtén una visión clara de tus archivos. Nuestra plataforma organiza la información en tablas interactivas para que selecciones lo que necesitas procesar.",
    icon: BarChart2,
  },
  {
    heading: "Automatización inteligente en la nube.",
    description:
      "Procesamos tus documentos automáticamente, extrayendo datos clave con inteligencia artificial y asegurando que estén listos para tus necesidades.",
    icon: Cloud,
  },
  {
    heading: "Almacenamiento seguro en la nube.",
    description:
      "Tus archivos se guardan en Azure Blob Storage con seguridad de nivel empresarial, organizados con un ID único para que siempre puedas acceder a ellos fácilmente.",
    icon: Database,
  },
  {
    heading: "Tus datos son tuyos. Privacidad garantizada.",
    description:
      "Tu información es privada y está protegida. Nunca rastreamos ni vendemos tus datos, porque entendemos el valor de tu privacidad.",
    icon: Lock,
  },
  {
    heading: "Modo oscuro para tu comodidad.",
    description:
      "Sabemos que los desarrolladores trabajan día y noche. Por eso, nuestra plataforma soporta modo oscuro para cuidar tu vista y tu estilo.",
    icon: Moon,
  },
];