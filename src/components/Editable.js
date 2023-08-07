import React from "react";
import { Button } from "antd";
import { EditOutlined, CheckOutlined } from "@ant-design/icons";

import "./Editable.scss";

const Editable = ({ buildName, editable, setEditable, setBuildName }) => {
  const handlePressEnter = (e) => {
    if (e.key === "Enter") setEditable(false);
  };

  const handleClick = () => {
    setEditable(true);
  };
  return (
    <span>
      {editable ? (
        <input
          className="editable-input"
          value={buildName}
          onChange={(e) => setBuildName(e.target.value)}
          onKeyDown={handlePressEnter}
          onFocus={(e) => e.target.select()}
          autoFocus
          onBlur={() => setEditable(false)}
        />
      ) : (
        <span className="editable-span" onClick={handleClick}>
          {buildName}
        </span>
      )}
      <Button
        shape="circle"
        type="link"
        onClick={() => setEditable(!editable)}
        icon={editable ? <CheckOutlined /> : <EditOutlined />}
      />
    </span>
  );
};

export default Editable;
