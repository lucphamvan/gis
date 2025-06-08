import App from "@/App";
import r2wc from "@r2wc/react-to-web-component";

const WebApp = r2wc(App);

customElements.define("web-app", WebApp);
