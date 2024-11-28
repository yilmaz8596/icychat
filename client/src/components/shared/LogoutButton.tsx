import { useState } from "react";
import { BiLogOut } from "react-icons/bi";
export default function LogoutButton() {
  const [loading, setLoading] = useState(false);

  const logout = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  return (
    <div className="mt-auto">
      {!loading ? (
        <BiLogOut
          className="w-6 h-6 text-white cursor-pointer"
          onClick={logout}
        />
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
}
