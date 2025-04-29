import { ThemeToggle } from "./ThemeToggle";
import { Link } from "react-router-dom";
import { Heart, Columns3, History, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  return (
    <header className="border-b sticky top-0 z-10 bg-background">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          ServiceShop
        </Link>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/favorites">
              <Heart className="h-4 w-4 mr-2" />
              Favorites
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/compare">
              <Columns3 className="h-4 w-4 mr-2" />
              Compare
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/orders">
              <History className="h-4 w-4 mr-2" />
              Orders
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/providers">
              <Users className="h-4 w-4 mr-2" />
              Providers
            </Link>
          </Button>
          <ThemeToggle />
        </div>

        <div className="flex md:hidden items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                Menu
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/favorites" className="flex items-center w-full">
                  <Heart className="h-4 w-4 mr-2" />
                  Favorites
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/compare" className="flex items-center w-full">
                  <Columns3 className="h-4 w-4 mr-2" />
                  Compare
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/orders" className="flex items-center w-full">
                  <History className="h-4 w-4 mr-2" />
                  Orders
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/providers" className="flex items-center w-full">
                  <Users className="h-4 w-4 mr-2" />
                  Providers
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
