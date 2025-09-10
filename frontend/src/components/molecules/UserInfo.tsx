import { UserIcon } from "lucide-react";
import type { UserT } from "../../types/types";
import Notifications from "./Notifications";
type UserInfoPropsT = {
  user?: UserT;
};

function UserInfo({ user }: UserInfoPropsT) {
  return (
    <div className="flex justify-center items-center gap-4 px-2 py-4">
      <div className="border rounded-full size-8 flex items-center justify-center">
        <Notifications />
      </div>
      <div className="flex gap-2 items-center ">
        <picture className="size-10 rounded-full border overflow-hidden flex flex-col justify-center items-center bg-gray-100">
          {user?.imageUrl ? (
            <img src={user.imageUrl} alt="#" />
          ) : (
            <UserIcon className="w-full h-full p-1 " />
          )}
        </picture>
        <span className="font-semibold ">Daniel Niedzielski</span>
      </div>
    </div>
  );
}

export default UserInfo;
