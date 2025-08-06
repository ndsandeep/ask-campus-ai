import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Clock, MapPin, BookOpen, Users, Calendar } from "lucide-react";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: "building" | "department" | "service" | "event" | "resource";
  location?: string;
  icon: any;
  relevance: number;
}

interface SearchBoxProps {
  onResultSelect?: (result: SearchResult) => void;
  placeholder?: string;
  showRecent?: boolean;
}

const searchData: Omit<SearchResult, "relevance">[] = [
  {
    id: "1",
    title: "Computer Science Department",
    description: "Programming labs, faculty offices, project rooms",
    category: "department",
    location: "Building A, 2nd Floor",
    icon: BookOpen
  },
  {
    id: "2",
    title: "Central Library",
    description: "Books, digital resources, study areas",
    category: "building",
    location: "Main Campus",
    icon: MapPin
  },
  {
    id: "3",
    title: "Student Registration",
    description: "Course enrollment, academic records",
    category: "service",
    location: "Administrative Block",
    icon: Users
  },
  {
    id: "4",
    title: "Campus Tour",
    description: "Guided tour for prospective students",
    category: "event",
    location: "Main Gate",
    icon: Calendar
  },
  {
    id: "5",
    title: "Engineering Workshops",
    description: "Mechanical, electrical, and civil engineering labs",
    category: "building",
    location: "Engineering Block",
    icon: MapPin
  },
  {
    id: "6",
    title: "Student Counseling",
    description: "Academic and personal counseling services",
    category: "service",
    location: "Student Services Center",
    icon: Users
  },
  {
    id: "7",
    title: "Cafeteria",
    description: "Dining hall, food court, coffee shop",
    category: "building",
    location: "Central Campus",
    icon: MapPin
  },
  {
    id: "8",
    title: "Sports Complex",
    description: "Gymnasium, courts, fitness center",
    category: "building",
    location: "Sports Area",
    icon: MapPin
  }
];

export function SearchBox({ onResultSelect, placeholder = "Search campus...", showRecent = true }: SearchBoxProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [recentSearches, setRecentSearches] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (query.trim().length > 0) {
      const filtered = searchData
        .map(item => {
          const titleMatch = item.title.toLowerCase().includes(query.toLowerCase());
          const descMatch = item.description.toLowerCase().includes(query.toLowerCase());
          const categoryMatch = item.category.toLowerCase().includes(query.toLowerCase());
          
          let relevance = 0;
          if (titleMatch) relevance += 3;
          if (descMatch) relevance += 2;
          if (categoryMatch) relevance += 1;
          
          return { ...item, relevance };
        })
        .filter(item => item.relevance > 0)
        .sort((a, b) => b.relevance - a.relevance)
        .slice(0, 6);
      
      setResults(filtered);
      setShowResults(true);
    } else {
      setResults([]);
      setShowResults(false);
    }
  }, [query]);

  const handleResultClick = (result: SearchResult) => {
    setQuery("");
    setShowResults(false);
    
    // Add to recent searches
    const newRecent = [result, ...recentSearches.filter(r => r.id !== result.id)].slice(0, 3);
    setRecentSearches(newRecent);
    
    onResultSelect?.(result);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "building": return "bg-blue-500/10 text-blue-700";
      case "department": return "bg-green-500/10 text-green-700";
      case "service": return "bg-purple-500/10 text-purple-700";
      case "event": return "bg-orange-500/10 text-orange-700";
      case "resource": return "bg-pink-500/10 text-pink-700";
      default: return "bg-gray-500/10 text-gray-700";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "building": return MapPin;
      case "department": return BookOpen;
      case "service": return Users;
      case "event": return Calendar;
      case "resource": return BookOpen;
      default: return Search;
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowResults(query.length > 0)}
          className="pl-10 pr-4"
        />
      </div>

      {(showResults || (showRecent && recentSearches.length > 0 && query.length === 0)) && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 max-h-80 overflow-hidden">
          <CardContent className="p-0">
            {query.length === 0 && recentSearches.length > 0 && showRecent && (
              <div className="p-3 border-b">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Clock className="h-4 w-4" />
                  Recent Searches
                </div>
                <div className="space-y-1">
                  {recentSearches.map((search) => {
                    const IconComponent = search.icon;
                    return (
                      <Button
                        key={search.id}
                        variant="ghost"
                        className="w-full justify-start h-auto p-2"
                        onClick={() => handleResultClick(search)}
                      >
                        <IconComponent className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">{search.title}</span>
                      </Button>
                    );
                  })}
                </div>
              </div>
            )}

            {results.length > 0 && (
              <div className="max-h-60 overflow-y-auto">
                {results.map((result) => {
                  const IconComponent = getCategoryIcon(result.category);
                  return (
                    <Button
                      key={result.id}
                      variant="ghost"
                      className="w-full justify-start h-auto p-3 border-b last:border-b-0"
                      onClick={() => handleResultClick(result)}
                    >
                      <div className="flex items-start gap-3 w-full">
                        <IconComponent className="h-4 w-4 mt-1 text-muted-foreground flex-shrink-0" />
                        <div className="flex-1 text-left">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{result.title}</span>
                            <Badge variant="secondary" className={getCategoryColor(result.category)}>
                              {result.category}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">{result.description}</p>
                          {result.location && (
                            <div className="flex items-center gap-1 mt-1">
                              <MapPin className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">{result.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </Button>
                  );
                })}
              </div>
            )}

            {query.length > 0 && results.length === 0 && (
              <div className="p-4 text-center text-sm text-muted-foreground">
                No results found for "{query}"
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}