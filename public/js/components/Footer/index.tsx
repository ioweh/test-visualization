import * as React from "react";
import "./index.less"; // Import the corresponding LESS file

const TestsFooter = () => {
  const infoItems = [
    {
      colorClass: "footer__info__color--client",
      text: "Клиентская часть",
    },
    {
      colorClass: "footer__info__color--server",
      text: "Серверная часть",
    },
    {
      colorClass: "footer__info__color--database",
      text: "База данных",
    },
  ];

  return (
    <div className="footer">
      {infoItems.map((item, index) => (
        <div className="footer__info" key={index}>
          <div className={`footer__info__color ${item.colorClass}`}></div>
          <div className="footer__info__text">{item.text}</div>
        </div>
      ))}
    </div>
  );
};

export default TestsFooter;
