import { toast } from "react-toastify";

export const useNotify = () => {
  return (msg: string, type: string = "D", style: string = ""): void => {
    switch (type) {
      case "S": {
        toast.success(msg, {
          position: toast.POSITION.TOP_CENTER,
          className: style,
        });
        break;
      }
      case "E": {
        toast.error(msg, {
          position: toast.POSITION.TOP_CENTER,
          className: style,
        });
        break;
      }
      case "W": {
        toast.warn(msg, {
          position: toast.POSITION.BOTTOM_LEFT,
          className: style,
        });
        break;
      }

      case "N": {
        toast.info(msg, {
          position: toast.POSITION.BOTTOM_CENTER,
          className: style,
        });
        break;
      }
      default: {
        toast(msg, {
          className: style,
        });
        break;
      }
    }
  };
};
