import React from "react";
import { Button, Dropdown, Tooltip } from "antd";

const IconButton = ({ onClick, icon, title, disabled, overlay }) => {
  return overlay ? (
    <Tooltip title={title}>
      <Dropdown overlay={overlay} disabled={disabled}>
        <Button shape='circle' type='link' icon={icon} />
      </Dropdown>
    </Tooltip>
  ) : (
    <Tooltip title={title}>
      <Button
        shape='circle'
        type='link'
        icon={icon}
        onClick={onClick}
        disabled={disabled}
      />
    </Tooltip>
  );
};

export default IconButton;
