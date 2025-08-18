import Input from "../atoms/Input";

export default function SearchBar() {
  return (
    <Input
      type="text"
      variants="outlined"
      placeholder="Szukaj..."
      classNames="text-white"
    ></Input>
  );
}
