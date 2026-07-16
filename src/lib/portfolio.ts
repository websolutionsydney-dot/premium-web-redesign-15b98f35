export type Project = {
  name: string;
  category: string;
  url: string;
  image: string;
};

export const PROJECTS: Project[] = [
  { name: "TFP Tax", category: "Book Keeping", url: "https://www.tfptax.com.au/", image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fwww.tfptax.com.au%2F?w=800&h=600" },
  { name: "Rebuild Group", category: "Construction / Renovation", url: "https://www.rebuildgroup.com.au/", image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fwww.rebuildgroup.com.au%2F?w=800&h=600" },
  { name: "Whinbury Hill Equestrian", category: "Horse Riding", url: "https://whinburyhillequestrian.com.au/", image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fwhinburyhillequestrian.com.au%2F?w=800&h=600" },
  { name: "Local Electrician", category: "Electrical", url: "https://www.localelectrician.com.au/", image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fwww.localelectrician.com.au%2F?w=800&h=600" },
  { name: "Dingo", category: "Skip Bin / Excavation", url: "https://www.dingo.com.au/", image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fwww.dingo.com.au%2F?w=800&h=600" },
  { name: "Citrus Clean", category: "Carpet Cleaning", url: "https://citrusclean.com.au/", image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fcitrusclean.com.au%2F?w=800&h=600" },
  { name: "Shore Clean", category: "Cleaning", url: "https://shoreclean.net.au/", image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fshoreclean.net.au%2F?w=800&h=600" },
  { name: "Park Beach Plaza", category: "E-Commerce", url: "http://www.parkbeachplaza.com.au/", image: "https://s.wordpress.com/mshots/v1/http%3A%2F%2Fwww.parkbeachplaza.com.au%2F?w=800&h=600" },
  { name: "Total Colour Painting", category: "Painting", url: "https://totalcolourpainting.com.au/", image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Ftotalcolourpainting.com.au%2F?w=800&h=600" },
  { name: "Ju Flooring", category: "Flooring", url: "https://juflooring.com.au/", image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fjuflooring.com.au%2F?w=800&h=600" },
  { name: "All Shutters & Blinds", category: "Blinds / Shutters", url: "https://allshuttersandblinds.com.au/", image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fallshuttersandblinds.com.au%2F?w=800&h=600" },
  { name: "Wynstan", category: "Blinds / Awnings", url: "https://www.wynstan.com.au/", image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fwww.wynstan.com.au%2F?w=800&h=600" },
  { name: "Carnivalland", category: "Amusement / Entertainment", url: "https://carnivalland.com.au/", image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fcarnivalland.com.au%2F?w=800&h=600" },
  { name: "Reminisce Photography", category: "Photography", url: "https://reminiscephotography.com.au/", image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Freminiscephotography.com.au%2F?w=800&h=600" },
  { name: "Pool Care", category: "Pool Care", url: "https://poolcarecompany.com.au/", image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fpoolcarecompany.com.au%2F?w=800&h=600" },
  { name: "Epic Supply", category: "E-Commerce", url: "https://epicsupply.com.au/", image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fepicsupply.com.au%2F?w=800&h=600" },
  { name: "Iconic Renovations", category: "Renovation", url: "https://iconicrenovationsco.com.au/", image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Ficonicrenovationsco.com.au%2F?w=800&h=600" },
  { name: "GT Kitchen & Bathroom", category: "Renovation", url: "https://www.gtkitchenandbathroom.com.au/", image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fwww.gtkitchenandbathroom.com.au%2F?w=800&h=600" },
  { name: "Call The Electrician", category: "Electrical", url: "https://www.calltheelectrician.com.au/", image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fwww.calltheelectrician.com.au%2F?w=800&h=600" },
  { name: "SMS Mining", category: "Industrial", url: "https://smsmining.com.au/", image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fsmsmining.com.au%2F?w=800&h=600" },
];

export const CATEGORIES = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.category)))];

export const LOGO_URL = "/logo.png";
export const PHONE = "0420 102 599";
export const PHONE_HREF = "tel:+61420102599";
export const EMAIL = "ryan@websolutionsydney.com.au";
export const EMAIL_HREF = "mailto:ryan@websolutionsydney.com.au";

