import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/global.scss";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
import { ConfigProvider } from "antd";
import { DEFAULT_THEME } from "./const/theme.ts";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ConfigProvider
      theme={{
        token: {
          borderRadius: DEFAULT_THEME.borderRadius,
          colorPrimary: DEFAULT_THEME.colorPrimary,
          colorBgBase: DEFAULT_THEME.colorBgBase,
          fontSize: DEFAULT_THEME.fontSize,
          fontFamily: DEFAULT_THEME.fontFamily,
        },
        components: {
          Button: {
            algorithm: DEFAULT_THEME.Button?.algorithm,
          },
          Input: {
            colorBgContainer: DEFAULT_THEME.Input.colorBgContainer, // Set background to white
          },
          Modal: {
            titleColor: DEFAULT_THEME.Modal.titleColor,
          },
          DatePicker: {
            colorBgContainer: DEFAULT_THEME.DatePicker.colorBgContainer,
          },
        },
      }}
    >
      <App />
    </ConfigProvider>
  </Provider>
);
