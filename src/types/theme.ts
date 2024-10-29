export type ThemeData = {
  borderRadius: number;
  colorPrimary: string;
  colorBgBase: string;
  fontSize: number;
  fontFamily: string;
  Button?: {
    algorithm?: boolean;
  };
  Input: {
    colorBgContainer: string; // Set background to white
  };
  Modal: {
    titleColor: string;
  };
  DatePicker: {
    colorBgContainer: string;
  };
};
