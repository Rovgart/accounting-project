import { NavLink } from "react-router";

type MenuItemPropsT = {
  menuText: string;
  to: string;
};
export default function MenuItem({ menuText, to }: MenuItemPropsT) {
  return (
    <NavLink to={`/dashboard/${to}`}>
      <div className="text-md cursor-pointer px-2  py-3 rounded-md hover:bg-[var(--color-primary-dark)] hover:opacity-75 hover:text-white">
        {menuText}
      </div>
    </NavLink>
  );
}
