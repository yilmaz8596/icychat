import SearchInput from "../search-input/SearchInput";
import Conversations from "../chat/Conversations";
import LogoutButton from "../shared/LogoutButton";
export default function Sidebar() {
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <SearchInput />
      <div className="divider px-3"></div>
      <Conversations />
      <LogoutButton />
    </div>
  );
}
