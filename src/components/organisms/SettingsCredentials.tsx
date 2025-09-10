import Button from "../atoms/Button";
type UserPropsT = {
  userImageUrl: string;
};
function SettingsCredentials({ userImageUrl }: UserPropsT) {
  return (
    <div className="flex justify-between ">
      <div className="flex items-center gap-4 ">
        <picture className="rounded-full size-12 border overflow-hidden ">
          <img className="size-full object-cover" src={userImageUrl} alt="" />
        </picture>
        <div className="flex flex-col">
          <h1 className="font-semibold ">Profile picture</h1>
          <span>PNG, JPEG under 15 MB</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outlined" text="Upload new picture" />
        <Button variant="outlined" text="Delete" />
      </div>
    </div>
  );
}

export default SettingsCredentials;
