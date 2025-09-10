import Button from "../atoms/Button";
import Input from "../atoms/Input";

function SettingsContactMail({ userEmail }: { userEmail: string }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col ">
        <h1 className="text-lg">Contact mail</h1>
        <span className="text-sm">
          Manager your accounts email address for the invoices
        </span>
      </div>
      <div className="flex justify-between items-center">
        <Input variants="outlined" label="Email" value={userEmail} />
        <Button text="Dodaj kolejny email" />
      </div>
      <hr />
    </div>
  );
}

export default SettingsContactMail;
