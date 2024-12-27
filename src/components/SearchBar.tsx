import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export const SearchBar = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative flex items-center">
        <Input
          type="text"
          placeholder="Search properties..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full h-12 pl-12 pr-4 text-lg bg-white/80 backdrop-blur-sm border-gray-200 rounded-full shadow-lg focus:ring-2 focus:ring-gray-200 transition-all duration-300"
        />
        <Search className="absolute left-4 w-5 h-5 text-gray-400" />
        <Button
          className="absolute right-2 rounded-full px-6 bg-gray-900 hover:bg-gray-800 text-white transition-all duration-300"
        >
          Search
        </Button>
      </div>
    </div>
  );
};