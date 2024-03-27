import Conversations from './Conversations';
import SearchInput from './SearchInput';

const Sidebar = () => {
  return (
    <div>
      <SearchInput />
      <Conversations />
      <div className="divider px-3"></div>
      {/* <LogoutButton />  */}
    </div>
  );
};
export default Sidebar;
