import { AdminSidebar } from "@/components/shared/AdminSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <main className="w-full bg-[#f3f3f1]" >
        <div className="px-3">
          <SidebarTrigger />
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}