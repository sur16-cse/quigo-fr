"use client";
import Link from "next/link";
import {
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { BiLogOutCircle } from "react-icons/bi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getData } from "@/domain/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { setAppState } from "@/redux/slices/appStateReducer";
import { Roles } from "@/lib/types";

const ProfileDropdown = () => {
  const isLogged = useSelector((state: RootState) => state.appState.isLogged);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isLoggedOut = () => {
    if (isLogged) {
      getData("/logout", {}, "").then((data) => {
        console.log(data);
        console.log(data === undefined);
        if (data.status === "success") {
          toast.success(data.message);
          dispatch(setAppState({ current_role: Roles.GUEST, isLogged: false }));
          router.push("/");
        } else if (data.status === "fail") {
          toast.error(data.message);
        } else if (data.status === "error") {
          toast.error(data.message);
        }
      });
    }
  };

  return (
    <div className="absolute right-10 top-16 mt-2 w-60 bg-white rounded-sm border-0 shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] z-20 p-1">
      {isLogged ? (
        <>
          <Link
            className="px-4 py-2 flex space-x-9 items-center justify-between"
            href="/profile/me"
          >
            <div className="inline-flex justify-between items-center w-20">
              <CgProfile size={20} />
              <p> Profile</p>
            </div>
            <MdOutlineKeyboardArrowRight />
          </Link>
          <div className="border-t border-gray-300"></div>

          <button
            className="px-4 py-2 flex space-x-[100px] items-center justify-between"
            onClick={() => isLoggedOut()}
          >
            <div className="inline-flex justify-between items-center w-[88px] -ml-1">
              <BiLogOutCircle size={22} />
              <p> Logout</p>
            </div>
            <MdOutlineKeyboardArrowRight />
          </button>
        </>
      ) : (
        <>
          <Link
            className="px-4 py-2 flex space-x-9 items-center justify-between"
            href="/auth/login"
          >
            Log In
            <MdOutlineKeyboardArrowRight />
          </Link>
          <div className="border-t border-gray-300"></div>
          <Link
            className="px-4 py-2px-4 py-2 flex space-x-9 items-center justify-between"
            href="/auth/signup"
          >
            Sign Up
            <MdOutlineKeyboardArrowRight />
          </Link>
        </>
      )}
    </div>
  );
};

export default ProfileDropdown;
