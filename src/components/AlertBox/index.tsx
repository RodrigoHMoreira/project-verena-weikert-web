import React, { FC } from "react";
import InfoIcon from "../../assets/icons/InfoIcon";

export interface AlertBoxProps {
  returnMessage: string;
  variant: "success" | "error";
}

const AlertBox: FC<AlertBoxProps> = ({
  returnMessage,
  variant,
}: AlertBoxProps) => {
  const styles = [
    {
      variant: "success",
      class:
        "absolute top-[15%] left-[45%] flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50",
    },
    {
      variant: "error",
      class:
        "absolute top-[15%] left-[45%] flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50",
    },
  ];

  const style = styles.find((s) => s.variant === variant);

  return (
    <div className={style?.class}>
      <InfoIcon />
      <div>
        <span className="font-medium">{returnMessage}</span>
      </div>
    </div>
  );
};

export default AlertBox;
