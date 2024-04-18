"use client";

import SearchStudents from "@/components/Student/SeachStudents";

export default function Page() {
  return (
    <div className="pb-4 min-h-[100vh] mt-[65px] mx-2 shadow-sm shadow-slate-600">
      <h1 className="font-bold text-slate-600 text-xl mb-2 bg-gray-200 py-2 px-2 border border-b-slate-300">
        Advanced Reports
      </h1>
      <div className="mx-2">
        <SearchStudents emptySearch={true} autoSearch={false} />
      </div>
    </div>
  );
}
