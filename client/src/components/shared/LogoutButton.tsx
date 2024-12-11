import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store/useStore";
import { useMutation } from "@tanstack/react-query";
import { BiLogOut } from "react-icons/bi";
import { logout } from "../../api/auth";
export default function LogoutButton() {
  const [loading, setLoading] = useState(false);

  const { setUser } = useStore();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setUser(null);
    },
  });

  const handleLogout = async () => {
    try {
      setLoading(true);
      await mutation.mutateAsync();
      setTimeout(() => {
        setLoading(false);
        navigate("/login");
      }, 2000);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const { isError, error, isSuccess } = mutation;
  return (
    <div className="mt-auto">
      <div className="toast toast-top toast-start">
        {isError && (
          <div className="alert alert-error">
            <span>
              <strong>Error: {error?.message}</strong>
            </span>
          </div>
        )}
        {isSuccess && (
          <div className="alert alert-success">
            <span>Logout successfull!</span>
          </div>
        )}
      </div>
      {!loading ? (
        <BiLogOut
          className="w-6 h-6 text-white cursor-pointer"
          onClick={handleLogout}
        />
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
}
