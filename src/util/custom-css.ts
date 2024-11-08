export default function addCustomCss(css: string) {
  if (!document) return;

  const [html] = document.getElementsByTagName("html");
  if (!html) return;

  let [styleElement] = document.getElementsByTagName("style");
  if (!styleElement) {
    styleElement = document.createElement("style");
  }
  styleElement.innerHTML = css;
  html.appendChild(styleElement);
}
