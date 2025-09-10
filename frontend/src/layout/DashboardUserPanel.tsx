import SearchBar from "../components/molecules/SearchBar";
import UserInfo from "../components/molecules/UserInfo";

function DashboardUserPanel() {
  return (
    <div className=" flex justify-between items-center p-2 border-b">
      <SearchBar />
      <UserInfo />
    </div>
  );
}

export default DashboardUserPanel;
