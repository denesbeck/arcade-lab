import { Tooltip as MuiTooltip, TooltipProps } from "@mui/material";
import { ReactElement } from "react";

interface ITooltip extends Omit<TooltipProps, "children"> {
  children: ReactElement;
}

const Tooltip = ({ children, ...props }: ITooltip) => {
  return (
    <MuiTooltip
      {...props}
      arrow
      slotProps={{
        tooltip: {
          className: "!bg-dark-700 border border-dark-500 text-sm",
        },
        arrow: {
          className: "before:!bg-dark-700 before:border before:border-dark-500",
        },
      }}
    >
      {children}
    </MuiTooltip>
  );
};

export default Tooltip;
