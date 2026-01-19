import { Button, Tooltip, Typography } from "@material-tailwind/react";
import { twMerge } from "tailwind-merge";
import { NavLink, useMatch } from "react-router-dom";
import React, { type ForwardRefExoticComponent } from "react";
import { type ButtonProps } from "@material-tailwind/react/components/Button";
import { useTranslation } from "react-i18next";

export type MenuItem = {
  title: string;
  icon:
    | ForwardRefExoticComponent<
        React.PropsWithoutRef<React.SVGProps<SVGSVGElement>>
      >
    | React.ElementType;
  to: string;
  img?: string;
};

type SideNavItemProps = {
  item: MenuItem;
  open: boolean;
  dataTestId?: string;
};

const NavButtonContent = (
  props: SideNavItemProps & { isActive?: boolean }
): JSX.Element => {
  const item = props.item;
  const isActive = props.isActive || false;
  const { t } = useTranslation();

  return (
    <>
      <div>
        {!item.img && (
          <item.icon
            className={twMerge(
              "w-[22px] h-[22px] truncate",
              isActive ? "text-green-700" : "text-green-600"
            )}
          />
        )}
        {item.img && (
          <span className="w-[22px] h-[22px] mr-5">
            <img
              src={item.img}
              alt={item.title}
              className={twMerge(
                "w-[22px] h-[22px] absolute truncate",
                isActive ? "text-green-700" : "text-green-600"
              )}
            />
          </span>
        )}
      </div>

      <Typography
        variant="small"
        className={twMerge(
          "text-sm origin-left duration-200 font-medium normal-case truncate text-slate-800",
          !props.open ? "hidden" : ""
        )}
      >
        {t(item.title)}
      </Typography>
    </>
  );
};

const NavButton = React.forwardRef<
  HTMLButtonElement,
  SideNavItemProps & Partial<ButtonProps>
>((props, ref) => {
  const match = useMatch(props.item.to);
  const isActive = !!match;

  return (
    <Button
      {...props}
      ref={ref}
      ripple={false}
      fullWidth
      variant={isActive ? "gradient" : "text"}
      style={{ backgroundImage: "none" }}
      className={twMerge(
        "flex mb-3 p-2 gap-x-4 min-h-[40px] min-w-[40px] w-full border-none",
        isActive
          ? "bg-slate-50 text-slate-800 font-semibold"
          : "hover:bg-slate-50/50 text-slate-800/90 bg-transparent",
        !props.open ? "-translate-x-2" : ""
      )}
    >
      <NavButtonContent {...props} isActive={isActive} />
    </Button>
  );
});

export const SideNavItem = (props: SideNavItemProps): JSX.Element => {
  const { t } = useTranslation();

  const [tooltipOpen, setTooltipOpen] = React.useState(false);

  return (
    <li className="w-[70%]">
      <NavLink to={props.item.to}>
        <Tooltip
          content={t(props.item.title)}
          placement={"right"}
          open={props.open ? false : tooltipOpen}
          handler={setTooltipOpen}
        >
          <NavButton {...props} />
        </Tooltip>
      </NavLink>
    </li>
  );
};
