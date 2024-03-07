import { getUserStatus } from "@/services/users.services";
import { UserType } from "@/types/users";
import { NextRequest, NextResponse } from "next/server";

function getRequiredStatus(pathname: string) {
  if (pathname === "/admin") {
    return "admin";
  } else if (pathname === "/profile") {
    return "user";
  } else {
    return "guest";
  }
}

export default async function middleware(req: NextRequest) {
  try {
    const userStatus = await getUserStatus<UserType>();
    console.log("userStatus", userStatus);
  } catch (error) {
    return NextResponse.redirect("/auth/signin");
  }
}
