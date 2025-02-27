export interface Library {
  id: number;
  title: string;
  slug: string;
  spaceInfo: {
    library: string;
    name: string;
    description: string;
    category: string;
    reservationType: string;
    spaceId: string;
  };
  features: {
    soundLevel: string[];
    spaceFeatures: string[];
    spaceType: string[];
    audienceTypes: string[];
  };
  imageUrl?: string;
}

export const dummyLibraries: Library[] = [
  {
    id: 16612,
    title: "Olin 120B Group Study",
    slug: "olin-120b",
    spaceInfo: {
      library: "Olin Library",
      name: "Olin 120B",
      description: "Group study room. Seats 4. Only available after 6pm M-F. Available all day on weekends.",
      category: "Collaborative Space",
      reservationType: "Reservable",
      spaceId: "183114"
    },
    features: {
      soundLevel: ["Collaborative"],
      spaceFeatures: ["DTEN monitor/Zoom"],
      spaceType: ["Study and Talk with a Group"],
      audienceTypes: ["Faculty", "Graduate", "Staff", "Undergraduate"]
    }
  },
  {
    id: 16613,
    title: "Mann Library Reading Room",
    slug: "mann-reading-room",
    spaceInfo: {
      library: "Mann Library",
      name: "Main Reading Room",
      description: "Quiet study space with individual desks and natural lighting.",
      category: "Quiet Space",
      reservationType: "First Come, First Served",
      spaceId: "183115"
    },
    features: {
      soundLevel: ["Quiet"],
      spaceFeatures: ["Power Outlets", "Natural Lighting"],
      spaceType: ["Individual Study"],
      audienceTypes: ["Undergraduate", "Graduate", "Faculty"]
    },
    imageUrl: "https://library.cornell.edu/wp-content/uploads/2023/05/P1133611-1-scaled-aspect-ratio-453-342.jpg"
  },
  {
    id: 16614,
    title: "Uris Library Cocktail Lounge",
    slug: "uris-cocktail-lounge",
    spaceInfo: {
      library: "Uris Library",
      name: "Cocktail Lounge",
      description: "24/7 underground study space with computer workstations and private carrels.",
      category: "Computer Lab",
      reservationType: "First Come, First Served",
      spaceId: "183116"
    },
    features: {
      soundLevel: ["Quiet"],
      spaceFeatures: ["Computer Workstations", "Printing Services", "24/7 Access"],
      spaceType: ["Individual Study", "Computer Work"],
      audienceTypes: ["Undergraduate", "Graduate"]
    }
  },
  {
    id: 16615,
    title: "Law Library Reading Room",
    slug: "law-reading-room",
    spaceInfo: {
      library: "Law Library",
      name: "Reading Room",
      description: "Classic reading room with wooden tables and green reading lamps.",
      category: "Silent Study",
      reservationType: "First Come, First Served",
      spaceId: "183117"
    },
    features: {
      soundLevel: ["Silent"],
      spaceFeatures: ["Traditional Decor", "Table Lamps"],
      spaceType: ["Individual Study"],
      audienceTypes: ["Law Students", "Graduate", "Faculty"]
    }
  },
  {
    id: 16616,
    title: "Engineering Library Makerspace",
    slug: "engineering-makerspace",
    spaceInfo: {
      library: "Engineering Library",
      name: "Makerspace",
      description: "Creative space with 3D printers, laser cutters, and design workstations.",
      category: "Makerspace",
      reservationType: "Reservation Required",
      spaceId: "183118"
    },
    features: {
      soundLevel: ["Collaborative"],
      spaceFeatures: ["3D Printers", "Laser Cutters", "Design Software"],
      spaceType: ["Creative Work", "Group Projects"],
      audienceTypes: ["Engineering Students", "Faculty", "Staff"]
    }
  },
  {
    id: 16617,
    title: "Mann Library Café",
    slug: "mann-cafe",
    spaceInfo: {
      library: "Mann Library",
      name: "Manndible Café",
      description: "Casual study space with coffee and light refreshments available.",
      category: "Casual Space",
      reservationType: "First Come, First Served",
      spaceId: "183119"
    },
    features: {
      soundLevel: ["Social"],
      spaceFeatures: ["Food Allowed", "Coffee Service", "WiFi"],
      spaceType: ["Casual Study", "Social Space"],
      audienceTypes: ["All Campus"]
    }
  },
  {
    id: 16618,
    title: "Music Library Listening Room",
    slug: "music-listening-room",
    spaceInfo: {
      library: "Music Library",
      name: "Listening Room",
      description: "Private room equipped with high-quality audio equipment for music study.",
      category: "Specialized Space",
      reservationType: "Reservable",
      spaceId: "183120"
    },
    features: {
      soundLevel: ["Variable"],
      spaceFeatures: ["Audio Equipment", "Sound Isolation"],
      spaceType: ["Individual Study", "Music Practice"],
      audienceTypes: ["Music Students", "Faculty"]
    }
  },
  {
    id: 16619,
    title: "Africana Library Conference Room",
    slug: "africana-conference",
    spaceInfo: {
      library: "Africana Library",
      name: "Conference Room",
      description: "Meeting space for group discussions and presentations.",
      category: "Meeting Space",
      reservationType: "Reservable",
      spaceId: "183121"
    },
    features: {
      soundLevel: ["Collaborative"],
      spaceFeatures: ["Projector", "Whiteboard", "Conference Phone"],
      spaceType: ["Group Meetings", "Presentations"],
      audienceTypes: ["All Campus"]
    }
  }
]; 