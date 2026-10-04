import { Package, LogOut } from "lucide-react";

function Sidebar({ onLogout }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h1>KALAKAL</h1>
        <span>1521</span>
      </div>

      <nav className="sidebar-nav">
        <button type="button" className="sidebar-link active">
          <Package size={19} />
          Products
        </button>
      </nav>

      <div className="sidebar-footer">
        <button type="button" className="sidebar-logout" onClick={onLogout}>
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
