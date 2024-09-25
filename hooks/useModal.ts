import React, { useImperativeHandle } from "react";

const useModal = (bool: boolean) => {
  const [visible, setVisible] = React.useState(false);

  const show = React.useCallback(() => {
    return setVisible(true);
  }, []);

  const hide = React.useCallback(() => {
    return setVisible(false);
  }, []);

  return { visible, show, hide };
};

export default useModal;
