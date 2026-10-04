import { UserRound } from "lucide-react";

function Header() {
  return (
    <header className="top-header">
      <h2 className="header-title">Product Management</h2>

      <div className="header-user">
        <div className="user-avatar">
          <UserRound size={18} />
        </div>

        <div>
          <strong>Admin</strong>
        </div>
      </div>
    </header>
  );
}

export default Header;
