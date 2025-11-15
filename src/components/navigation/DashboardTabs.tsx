import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Tab {
  name: string;
  path: string;
}

interface DashboardTabsProps {
  tabs: Tab[];
}

const DashboardTabs = ({ tabs }: DashboardTabsProps) => {
  const location = useLocation();

  return (
    <div className="border-b border-border mb-6">
      <nav className="flex overflow-x-auto">
        {tabs.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path}
            className={cn(
              "px-6 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors",
              location.pathname === tab.path
                ? "border-gold text-gold"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            )}
          >
            {tab.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default DashboardTabs;
