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

export function getLibraryImage(library: Library): string {
  return library.imageUrl || `https://picsum.photos/${library.id}?blur=2`;
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
    id: 16608,
    title: "Olin 120A Group Study",
    slug: "olin-120a",
    spaceInfo: {
      library: "Olin Library",
      name: "Olin 120A Group Study",
      description: "Group study room. Seats 4. Only available after 6pm M-F. Available all day on weekends.",
      category: "Collaborative Space",
      reservationType: "Reservable",
      spaceId: "183113"
    },
    features: {
      soundLevel: ["Collaborative"],
      spaceFeatures: ["DTEN monitor/Zoom"],
      spaceType: ["Study and Talk with a Group"],
      audienceTypes: ["Undergraduate", "Graduate", "Staff", "Faculty"]
    }
  },
  {
    id: 9516,
    title: "Mann Library Serenity Room",
    slug: "serenity",
    spaceInfo: {
      library: "Mann Library",
      name: "2nd Floor",
      description: "Room 282",
      category: "Interfaith Serenity Room",
      reservationType: "By request",
      spaceId: ""
    },
    features: {
      soundLevel: ["Quiet"],
      spaceFeatures: ["Lounge seating"],
      spaceType: [],
      audienceTypes: ["Faculty", "Graduate", "Undergraduate"]
    },
    imageUrl: "https://library.cornell.edu/wp-content/uploads/2023/05/P1133611-1-scaled-aspect-ratio-453-342.jpg"
  },
  {
    id: 8629,
    title: "Kroch B59 Cho Room",
    slug: "kroch-b59",
    spaceInfo: {
      library: "Kroch Asia Collections",
      name: "Cho Room",
      description: "Kroch B59",
      category: "Conference Room",
      reservationType: "By request",
      spaceId: ""
    },
    features: {
      soundLevel: ["Collaborative"],
      spaceFeatures: [],
      spaceType: ["Present or Teach"],
      audienceTypes: ["Graduate", "Faculty"]
    },
    imageUrl: "https://library.cornell.edu/wp-content/uploads/2023/02/cho-room-aspect-ratio-453-342.jpg"
  },
  {
    id: 8628,
    title: "Kroch B60 Rawson Reading Room",
    slug: "kroch-b60",
    spaceInfo: {
      library: "Kroch Asia Collections",
      name: "Rawson Reading Room",
      description: "Kroch B60",
      category: "Open Study",
      reservationType: "No reservation",
      spaceId: ""
    },
    features: {
      soundLevel: ["Quiet"],
      spaceFeatures: [],
      spaceType: ["Study or Work Alone"],
      audienceTypes: ["Undergraduate", "Graduate", "Staff", "Faculty"]
    },
    imageUrl: "https://library.cornell.edu/wp-content/uploads/2023/02/rawson-reading-room-aspect-ratio-453-342.jpg"
  },
  {
    id: 8627,
    title: "Severinghaus Asia Reading Room",
    slug: "kroch-severinghaus",
    spaceInfo: {
      library: "Kroch Asia Collections",
      name: "1st Floor",
      description: "Severinghaus Asia Reading Room",
      category: "Open Study",
      reservationType: "No reservation",
      spaceId: ""
    },
    features: {
      soundLevel: ["Quiet"],
      spaceFeatures: [],
      spaceType: ["Study or Work Alone"],
      audienceTypes: ["Undergraduate", "Graduate", "Staff", "Faculty"]
    },
    imageUrl: "https://library.cornell.edu/wp-content/uploads/2023/02/sevringhaus-reading-room-aspect-ratio-453-342.jpg"
  },
  {
    id: 8626,
    title: "Uris 4B04 Cocktail Lounge Study Room",
    slug: "uris-4b04",
    spaceInfo: {
      library: "Uris Library",
      name: "Level 4B",
      description: "Uris 4B04 Cocktail Lounge Study Room. This room is located in the Cocktail Lounge of Uris Library. A dry erase board is available for use; markers are available to be checked-out at the Olin Circulation Desk during open hours.",
      category: "Group Study",
      reservationType: "Reservable",
      spaceId: "5649"
    },
    features: {
      soundLevel: ["Collaborative"],
      spaceFeatures: [],
      spaceType: ["Study and Talk with a Group"],
      audienceTypes: ["Graduate", "Undergraduate"]
    },
    imageUrl: "https://library.cornell.edu/wp-content/uploads/2022/11/picture_of_the_cocktail_lounge_group_study_rooms-scaled-aspect-ratio-453-342-1.jpeg"
  },
  {
    id: 8625,
    title: "Uris 4B03 Cocktail Lounge Study Room",
    slug: "uris-4b03",
    spaceInfo: {
      library: "Uris Library",
      name: "Level 4B",
      description: "Uris 4B03 Cocktail Lounge Study Room. This room is located in the Cocktail Lounge of Uris Library. A dry erase board is available for use; markers are available to be checked-out at the Olin Circulation Desk during open hours.",
      category: "Group Study",
      reservationType: "Reservable",
      spaceId: "5648"
    },
    features: {
      soundLevel: ["Collaborative"],
      spaceFeatures: [],
      spaceType: ["Study and Talk with a Group"],
      audienceTypes: ["Graduate", "Undergraduate"]
    },
    imageUrl: "https://library.cornell.edu/wp-content/uploads/2022/11/picture_of_the_cocktail_lounge_group_study_rooms-scaled-aspect-ratio-453-342-3.jpeg"
  },
  {
    id: 8624,
    title: "Uris 4B02 Cocktail Lounge Study Room",
    slug: "uris-4b02",
    spaceInfo: {
      library: "Uris Library",
      name: "Level 4B",
      description: "Uris 4B02 Cocktail Lounge Study Room. This room is located in the Cocktail Lounge of Uris Library. A dry erase board is available for use; markers are available to be checked-out at the Olin Circulation Desk during open hours.",
      category: "Group Study",
      reservationType: "Reservable",
      spaceId: "5647"
    },
    features: {
      soundLevel: ["Collaborative"],
      spaceFeatures: [],
      spaceType: ["Study and Talk with a Group"],
      audienceTypes: ["Graduate", "Undergraduate"]
    },
    imageUrl: "https://library.cornell.edu/wp-content/uploads/2022/11/picture_of_the_cocktail_lounge_group_study_rooms-scaled-aspect-ratio-453-342-2.jpeg"
  },
  {
    id: 8623,
    title: "Uris Cocktail Lounge Open Study",
    slug: "uris-cocktail-lounge",
    spaceInfo: {
      library: "Uris Library",
      name: "Level 4B",
      description: "Cocktail Lounge",
      category: "Open Study",
      reservationType: "No reservation",
      spaceId: ""
    },
    features: {
      soundLevel: ["Quiet"],
      spaceFeatures: [],
      spaceType: ["Study or Work Alone"],
      audienceTypes: ["Undergraduate", "Graduate", "Staff", "Faculty", "Visitor"]
    },
    imageUrl: "https://library.cornell.edu/wp-content/uploads/2023/05/P1133523-scaled-aspect-ratio-453-342.jpg"
  }
]; 