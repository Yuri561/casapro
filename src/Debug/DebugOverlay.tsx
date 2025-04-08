import React, { useEffect } from "react";

const DebugOverlay: React.FC = () => {
  useEffect(() => {
    const styles = document.createElement("style");
    styles.innerHTML = `
      * {
        outline: 1px dashed rgba(255, 0, 0, 0.2);
      }

      body::after {
        content: "📏 DEBUG MODE ACTIVE";
        position: fixed;
        bottom: 10px;
        right: 10px;
        background: #f43f5e;
        color: white;
        font-size: 12px;
        padding: 4px 10px;
        border-radius: 4px;
        z-index: 9999;
        font-family: sans-serif;
        box-shadow: 0 0 10px rgba(0,0,0,0.3);
      }

      html, body, #root {
        background-color: rgba(255, 255, 0, 0.05);
      }
    `;
    document.head.appendChild(styles);

    return () => {
      document.head.removeChild(styles);
    };
  }, []);

  return null;
};

export default DebugOverlay;
