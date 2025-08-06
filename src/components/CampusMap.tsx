import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Search, Navigation, Clock, Phone } from "lucide-react";

interface Building {
  id: string;
  name: string;
  type: string;
  description: string;
  coordinates: { x: number; y: number };
  facilities: string[];
  openingHours?: string;
  contact?: string;
}

const campusBuildings: Building[] = [
  {
    id: "1",
    name: "Main Administrative Block",
    type: "admin",
    description: "Admissions, Student Services, Principal's Office",
    coordinates: { x: 50, y: 30 },
    facilities: ["Admissions Office", "Student Records", "Financial Aid"],
    openingHours: "9:00 AM - 5:00 PM",
    contact: "(555) 123-4567"
  },
  {
    id: "2",
    name: "Computer Science Department",
    type: "academic",
    description: "CS Labs, Faculty Offices, Seminar Halls",
    coordinates: { x: 30, y: 50 },
    facilities: ["Programming Labs", "Project Rooms", "Faculty Lounge"],
    openingHours: "8:00 AM - 8:00 PM"
  },
  {
    id: "3",
    name: "Central Library",
    type: "library",
    description: "Books, Digital Resources, Study Areas",
    coordinates: { x: 60, y: 60 },
    facilities: ["Reading Rooms", "Computer Lab", "Group Study Rooms"],
    openingHours: "8:00 AM - 10:00 PM",
    contact: "(555) 123-4568"
  },
  {
    id: "4",
    name: "Student Cafeteria",
    type: "dining",
    description: "Dining Hall, Food Court, Coffee Shop",
    coordinates: { x: 70, y: 40 },
    facilities: ["Main Dining", "Snack Bar", "Coffee Corner"],
    openingHours: "7:00 AM - 9:00 PM"
  },
  {
    id: "5",
    name: "Sports Complex",
    type: "sports",
    description: "Gymnasium, Courts, Fitness Center",
    coordinates: { x: 80, y: 70 },
    facilities: ["Basketball Court", "Fitness Center", "Swimming Pool"],
    openingHours: "6:00 AM - 10:00 PM"
  },
  {
    id: "6",
    name: "Engineering Block",
    type: "academic",
    description: "Mechanical, Electrical, Civil Departments",
    coordinates: { x: 20, y: 70 },
    facilities: ["Workshops", "Labs", "Project Centers"],
    openingHours: "8:00 AM - 6:00 PM"
  }
];

interface CampusMapProps {
  onBuildingSelect?: (building: Building) => void;
  searchQuery?: string;
}

export function CampusMap({ onBuildingSelect, searchQuery = "" }: CampusMapProps) {
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [searchTerm, setSearchTerm] = useState(searchQuery);
  const [hoveredBuilding, setHoveredBuilding] = useState<string | null>(null);

  const filteredBuildings = campusBuildings.filter(building =>
    building.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    building.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    building.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBuildingClick = (building: Building) => {
    setSelectedBuilding(building);
    onBuildingSelect?.(building);
  };

  const getBuildingColor = (type: string) => {
    switch (type) {
      case "admin": return "bg-blue-500";
      case "academic": return "bg-green-500";
      case "library": return "bg-purple-500";
      case "dining": return "bg-orange-500";
      case "sports": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getBuildingIcon = (type: string) => {
    switch (type) {
      case "admin": return "🏢";
      case "academic": return "🎓";
      case "library": return "📚";
      case "dining": return "🍽️";
      case "sports": return "🏃";
      default: return "🏠";
    }
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search buildings, departments, or facilities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Map Container */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Interactive Campus Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border-2 border-dashed border-border/30 h-80 overflow-hidden">
            {/* Campus Map Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/50 to-blue-100/50">
              {/* Pathways */}
              <svg className="absolute inset-0 w-full h-full">
                <path
                  d="M 0,150 Q 200,150 400,150"
                  stroke="hsl(var(--muted))"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="5,5"
                />
                <path
                  d="M 200,0 Q 200,200 200,320"
                  stroke="hsl(var(--muted))"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="5,5"
                />
              </svg>
            </div>

            {/* Building Markers */}
            {filteredBuildings.map((building) => (
              <Button
                key={building.id}
                variant="ghost"
                className={`absolute p-2 h-12 w-12 rounded-full transition-all duration-200 transform -translate-x-1/2 -translate-y-1/2 ${
                  getBuildingColor(building.type)
                } text-white hover:scale-110 ${
                  selectedBuilding?.id === building.id ? "ring-4 ring-primary scale-110" : ""
                } ${
                  hoveredBuilding === building.id ? "scale-105" : ""
                }`}
                style={{
                  left: `${building.coordinates.x}%`,
                  top: `${building.coordinates.y}%`,
                }}
                onClick={() => handleBuildingClick(building)}
                onMouseEnter={() => setHoveredBuilding(building.id)}
                onMouseLeave={() => setHoveredBuilding(null)}
              >
                <span className="text-lg">
                  {getBuildingIcon(building.type)}
                </span>
              </Button>
            ))}

            {/* Hover Tooltip */}
            {hoveredBuilding && (
              <div
                className="absolute bg-popover border rounded-lg p-2 shadow-lg pointer-events-none z-10 transform -translate-x-1/2 -translate-y-full"
                style={{
                  left: `${campusBuildings.find(b => b.id === hoveredBuilding)?.coordinates.x}%`,
                  top: `${campusBuildings.find(b => b.id === hoveredBuilding)?.coordinates.y}%`,
                }}
              >
                <p className="text-sm font-medium text-popover-foreground">
                  {campusBuildings.find(b => b.id === hoveredBuilding)?.name}
                </p>
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-blue-500/10 text-blue-700">
              🏢 Administrative
            </Badge>
            <Badge variant="secondary" className="bg-green-500/10 text-green-700">
              🎓 Academic
            </Badge>
            <Badge variant="secondary" className="bg-purple-500/10 text-purple-700">
              📚 Library
            </Badge>
            <Badge variant="secondary" className="bg-orange-500/10 text-orange-700">
              🍽️ Dining
            </Badge>
            <Badge variant="secondary" className="bg-red-500/10 text-red-700">
              🏃 Sports
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Selected Building Details */}
      {selectedBuilding && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">{getBuildingIcon(selectedBuilding.type)}</span>
              {selectedBuilding.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{selectedBuilding.description}</p>
            
            <div>
              <h4 className="font-medium mb-2">Facilities:</h4>
              <div className="flex flex-wrap gap-1">
                {selectedBuilding.facilities.map((facility, index) => (
                  <Badge key={index} variant="outline">
                    {facility}
                  </Badge>
                ))}
              </div>
            </div>

            {selectedBuilding.openingHours && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{selectedBuilding.openingHours}</span>
              </div>
            )}

            {selectedBuilding.contact && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{selectedBuilding.contact}</span>
              </div>
            )}

            <Button className="w-full" variant="outline">
              <Navigation className="h-4 w-4 mr-2" />
              Get Directions
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}