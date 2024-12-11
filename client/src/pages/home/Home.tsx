import { useStore } from "../../store/useStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";
import toast from "react-hot-toast";

export default function Home() {
  const { user } = useStore();

  const navigate = useNavigate();

  console.log(user);

  useEffect(() => {
    if (!user?._id) {
      toast.error("Please login to continue");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, [user, navigate]);

  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <Sidebar />
      <MessageContainer />
    </div>
  );
}
