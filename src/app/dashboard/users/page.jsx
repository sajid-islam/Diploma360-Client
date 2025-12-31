"use client";

import Loader from "@/components/Loader/Loader";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useRole from "@/hooks/useRole";
import moment from "moment";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const UsersPage = () => {
  const AxiosPrivate = useAxiosPrivate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingUser, setUpdatingUser] = useState(null);
  const { currentUserId } = useRole();

  // Fetch all users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await AxiosPrivate.get("/api/user/all");
      setUsers(res.data.users);
    } catch (err) {
      console.error(err);
      toast.error("ব্যবহারকারীদের লোড করতে সমস্যা হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle role change
  const handleRoleChange = async (userId, newRole) => {
    setUpdatingUser(userId);
    try {
      await AxiosPrivate.patch(`/api/user/${userId}/role`, { role: newRole });
      setUsers((prev) =>
        prev.map((user) =>
          user._id === userId ? { ...user, role: newRole } : user
        )
      );
      toast.success("Role updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Role update failed");
    } finally {
      setUpdatingUser(null);
    }
  };

  return (
    <>
      {/* Header / Breadcrumb */}
      <header className="flex h-16 items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>All Users</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="p-4 md:p-8">
        <h2 className="text-2xl font-semibold mb-4">সমস্ত ব্যবহারকারী</h2>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table className="min-w-full border rounded-lg">
              <TableCaption>
                সুপার অ্যাডমিনের জন্য ব্যবহারকারীর তালিকা
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">নাম</TableHead>
                  <TableHead className="min-w-[250px]">ইমেইল</TableHead>
                  <TableHead className="min-w-[150px]">রোল</TableHead>
                  <TableHead className="min-w-[150px]">
                    নিবন্ধনের তারিখ
                  </TableHead>
                  <TableHead className="text-right min-w-[180px]">
                    অ্যাকশন
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      কোনো ব্যবহারকারী পাওয়া যায়নি।
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell className="capitalize">{user.role}</TableCell>
                      <TableCell>
                        {moment(user.createdAt).format("Do MMM, YYYY")}
                      </TableCell>

                      <TableCell className="text-right">
                        {user._id !== currentUserId &&
                          user.role !== "super_admin" && (
                            <Select
                              value={user.role}
                              onValueChange={(value) =>
                                handleRoleChange(user._id, value)
                              }
                              disabled={updatingUser === user._id}
                            >
                              <SelectTrigger className="w-40">
                                <SelectValue placeholder="Change Role" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="student">Student</SelectItem>
                                <SelectItem value="organizer">
                                  Organizer
                                </SelectItem>
                                <SelectItem value="super_admin">
                                  Super Admin
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </>
  );
};

export default UsersPage;
