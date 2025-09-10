import Input from "../components/atoms/Input";
import SettingsContactMail from "../components/organisms/SettingsContactMail";
import SettingsCredentials from "../components/organisms/SettingsCredentials";
import SettingsIntegratedAccounts from "../components/organisms/SettingsIntegratedAccounts";
import SettingsPasswords from "../components/organisms/SettingsPasswords";
import type { UserT } from "../types/types";
type UserPropsT = {
  user: UserT;
};

function SettingsPage() {
  const user = {
    email: "samplemail@wp.pl",
    fullName: "Sample",
    imageUrl: "https://picsum.photos/id/237/200/300",
  };
  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-4  p-6">
      <div className="flex flex-col">
        <h1 className="font-semibold">Konto</h1>
        <span>Real-time information and activities of your property</span>
      </div>
      <hr />
      <SettingsCredentials userImageUrl={user.imageUrl} />
      <div className="flex justify-around w-full   gap-4">
        <Input
          value={user.email}
          classNames=" w-full"
          label="First name"
          variants="outlined"
        />
        <Input
          value={user.fullName}
          classNames=" w-full"
          label="Last name"
          variants="outlined"
        />
      </div>
      <SettingsContactMail userEmail={user.email} />
      <SettingsPasswords />
      <SettingsIntegratedAccounts />
    </div>
  );
}

export default SettingsPage;
