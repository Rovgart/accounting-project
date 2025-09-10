import { UserIcon } from "lucide-react";

type Props = {
  name: string;
  imageUrl?: string;
};
function Customer({ name, imageUrl }: Props) {
  return (
    <div className="flex items-center justify-center gap-4 ">
      <picture className="size-8 aspect-square  rounded-full border   flex items-center justify-center overflow-hidden">
        {imageUrl ? (
          <img
            className="size-full object-cover"
            src={imageUrl}
            alt={`${name}-photo`}
          />
        ) : (
          <UserIcon className="size-full object-cover p-1 aspect-square " />
        )}
      </picture>
      <span className="w-1/2">{name}</span>
    </div>
  );
}

export default Customer;
