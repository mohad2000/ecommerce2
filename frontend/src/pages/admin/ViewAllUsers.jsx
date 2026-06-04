import axios from "axios";
import React, { useEffect, useState } from "react";

const ViewAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/users/get-all-users",
          {
            withCredentials: true,
          }
        );

        setUsers(response.data.users);
      } catch (error) {
        console.log(error);
      }
    };

    getAllUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    setLoadingId(userId);

    try {
      {
        /* eslint-disable */
      }
      const response = await axios.put(
        `http://localhost:8000/api/v1/users/change-user-role/${userId}`,
        {
          role: newRole,
        },
        {
          withCredentials: true,
        }
      );

      setUsers((prev) =>
        prev.map((u) =>
          u._id === userId
            ? {
                ...u,
                role: response.data.user.role,
              }
            : u
        )
      );
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message || "Failed to update role");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              All Users
            </h1>

            <p className="text-slate-500 mt-1">
              Manage users and permissions.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-100 px-5 py-3 rounded-xl">
            <p className="text-sm text-slate-500">
              Total Users
            </p>

            <h3 className="text-2xl font-bold text-blue-600">
              {users.length}
            </h3>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        {users.length === 0 ? (
          <div className="py-24 text-center">
            <h3 className="text-xl font-semibold text-slate-700">
              No Users Found
            </h3>

            <p className="text-slate-500 mt-2">
              Users will appear here when they register.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                    User
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                    Name
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                    Email
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                    Role
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                    Joined
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                    Change Role
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-5">
                      <img
                        src={
                          user.profile?.url ||
                          "https://i.pravatar.cc/150"
                        }
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover border border-slate-200"
                      />
                    </td>

                    <td className="px-6 py-5">
                      <p className="font-semibold text-slate-800">
                        {user.name}
                      </p>
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {user.email}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold
                          ${
                            user.role === "admin"
                              ? "bg-red-100 text-red-600"
                              : "bg-green-100 text-green-600"
                          }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {new Date(
                        user.createdAt
                      ).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-5">
                      <select
                        value={user.role}
                        disabled={loadingId === user._id}
                        onChange={(e) =>
                          handleRoleChange(
                            user._id,
                            e.target.value
                          )
                        }
                        className="w-32 bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewAllUsers;
