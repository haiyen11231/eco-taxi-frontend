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
          colorPrimary: DEFAULT_THEME.colorPrimary,
          borderRadius: DEFAULT_THEME.borderRadius,
        },
        components: {
          Button: {
            algorithm: DEFAULT_THEME.Button?.algorithm,
          },
        },
      }}
    >
      <App />
    </ConfigProvider>
  </Provider>
);
