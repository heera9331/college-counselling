import { useEffect } from "react";

 
const LeftSidebar = () => {
  const { openLeftSidebar, token, isAdmin, isLeftSidebarOpen } =
 

  useEffect(() => {}, [isLeftSidebarOpen]);

  return (
    <>
      {isLeftSidebarOpen && (
        <aside class="bg-primary flex text-white pl-6 pt-6 pr-2 fixed left-0 top-[57px] min-h-[100vh] min-w-[200px]">
          <div class="">
            <p class="text-2xl font-semibold">Student</p>
            <div class="options flex flex-col gap-2 my-2">
              <p
                class="bg-secondary rounded-sm p-1 hover:border border-sm"
                role="button"
              >
                Register
              </p>
              <p
                class="bg-secondary rounded-sm p-1 hover:border border-sm"
                role="button"
              >
                Remove
              </p>
              <p
                class="bg-secondary rounded-sm p-1 hover:border border-sm"
                role="button"
              >
                Update
              </p>
            </div>
            <p class="text-2xl font-semibold">Counsellor</p>
            <div class="options flex flex-col gap-2 my-2">
              <p
                class="bg-secondary rounded-sm p-1 hover:border border-sm"
                role="button"
              >
                Register
              </p>
              <p
                class="bg-secondary rounded-sm p-1 hover:border border-sm"
                role="button"
              >
                Remove
              </p>
              <p
                class="bg-secondary rounded-sm p-1 hover:border border-sm"
                role="button"
              >
                Update
              </p>
            </div>
          </div>
        </aside>
      )}
    </>
  );
};
export default LeftSidebar;
