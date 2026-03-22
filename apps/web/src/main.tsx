import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";
import schoolLogoUrl from "./assets/school-logo.png";

function setFavicon(url: string) {
  let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }
  link.type = "image/png";
  link.href = url;
}

setFavicon(schoolLogoUrl);

createRoot(document.getElementById("root")!).render(<App />);
  