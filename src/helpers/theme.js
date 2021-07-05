export const THEMES = {
  darkTheme: "darkTheme",
  lightTheme: "lightTheme",
};

export const VALID_THEME = Object.keys(THEMES);

export const GET_DEFAULT_THEME = () => {
  return (
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: darkTheme)").matches
      ? "darkTheme"
      : "lightTheme")
  );
};

export const SetTheme = (theme) => {
  if (!VALID_THEME.includes(theme)) return;

  const mainBody = window.document.getElementsByTagName("body")[0];
  mainBody.setAttribute("class", theme);
  localStorage.setItem("theme", theme);
  console.log("mainBody", theme);
};

export const IsDark = (theme) => THEMES.darkTheme === theme;

export const IsLight = (theme) => THEMES.lightTheme === theme;

export const Toggle = (theme) =>
  IsDark(theme) === true ? THEMES.lightTheme : THEMES.darkTheme;
