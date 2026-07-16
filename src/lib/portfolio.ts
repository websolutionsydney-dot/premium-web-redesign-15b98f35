export type Project = {
  name: string;
  category: string;
  url: string;
  image: string;
};

export const PROJECTS: Project[] = [
  { name: "TFP Tax", category: "Book Keeping", url: "https://www.tfptax.com.au/", image: "https://image.thum.io/get/width/800/crop/600/noanimate/https://www.tfptax.com.au/" },
  { name: "Rebuild Group", category: "Construction / Renovation", url: "https://www.rebuildgroup.com.au/", image: "https://image.thum.io/get/width/800/crop/600/noanimate/https://www.rebuildgroup.com.au/" },
  { name: "Whinbury Hill Equestrian", category: "Horse Riding", url: "https://whinburyhillequestrian.com.au/", image: "https://image.thum.io/get/width/800/crop/600/noanimate/https://whinburyhillequestrian.com.au/" },
  { name: "Local Electrician", category: "Electrical", url: "https://www.localelectrician.com.au/", image: "https://image.thum.io/get/width/800/crop/600/noanimate/https://www.localelectrician.com.au/" },
  { name: "Dingo", category: "Skip Bin / Excavation", url: "https://www.dingo.com.au/", image: "https://image.thum.io/get/width/800/crop/600/noanimate/https://www.dingo.com.au/" },
  { name: "Citrus Clean", category: "Carpet Cleaning", url: "https://citrusclean.com.au/", image: "https://image.thum.io/get/width/800/crop/600/noanimate/https://citrusclean.com.au/" },
  { name: "Shore Clean", category: "Cleaning", url: "https://shoreclean.net.au/", image: "https://image.thum.io/get/width/800/crop/600/noanimate/https://shoreclean.net.au/" },
  { name: "Park Beach Plaza", category: "E-Commerce", url: "http://www.parkbeachplaza.com.au/", image: "https://image.thum.io/get/width/800/crop/600/noanimate/http://www.parkbeachplaza.com.au/" },
  { name: "Total Colour Painting", category: "Painting", url: "https://totalcolourpainting.com.au/", image: "https://image.thum.io/get/width/800/crop/600/noanimate/https://totalcolourpainting.com.au/" },
  { name: "Ju Flooring", category: "Flooring", url: "https://juflooring.com.au/", image: "https://image.thum.io/get/width/800/crop/600/noanimate/https://juflooring.com.au/" },
  { name: "All Shutters & Blinds", category: "Blinds / Shutters", url: "https://allshuttersandblinds.com.au/", image: "https://image.thum.io/get/width/800/crop/600/noanimate/https://allshuttersandblinds.com.au/" },
  { name: "Wynstan", category: "Blinds / Awnings", url: "https://www.wynstan.com.au/", image: "https://image.thum.io/get/width/800/crop/600/noanimate/https://www.wynstan.com.au/" },
  { name: "Carnivalland", category: "Amusement / Entertainment", url: "https://carnivalland.com.au/", image: "https://image.thum.io/get/width/800/crop/600/noanimate/https://carnivalland.com.au/" },
  { name: "Reminisce Photography", category: "Photography", url: "https://reminiscephotography.com.au/", image: "https://image.thum.io/get/width/800/crop/600/noanimate/https://reminiscephotography.com.au/" },
  { name: "Pool Care", category: "Pool Care", url: "https://poolcarecompany.com.au/", image: "https://image.thum.io/get/width/800/crop/600/noanimate/https://poolcarecompany.com.au/" },
  { name: "Epic Supply", category: "E-Commerce", url: "https://epicsupply.com.au/", image: "https://image.thum.io/get/width/800/crop/600/noanimate/https://epicsupply.com.au/" },
  { name: "Iconic Renovations", category: "Renovation", url: "https://iconicrenovationsco.com.au/", image: "https://image.thum.io/get/width/800/crop/600/noanimate/https://iconicrenovationsco.com.au/" },
  { name: "GT Kitchen & Bathroom", category: "Renovation", url: "https://www.gtkitchenandbathroom.com.au/", image: "https://image.thum.io/get/width/800/crop/600/noanimate/https://www.gtkitchenandbathroom.com.au/" },
  { name: "Call The Electrician", category: "Electrical", url: "https://www.calltheelectrician.com.au/", image: "https://image.thum.io/get/width/800/crop/600/noanimate/https://www.calltheelectrician.com.au/" },
  { name: "SMS Mining", category: "Industrial", url: "https://smsmining.com.au/", image: "https://image.thum.io/get/width/800/crop/600/noanimate/https://smsmining.com.au/" },
];

export const CATEGORIES = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.category)))];

export const LOGO_URL = "/logo.png";
export const PHONE = "0420 102 599";
export const PHONE_HREF = "tel:+61420102599";
export const EMAIL = "ryan@websolutionsydney.com.au";
export const EMAIL_HREF = "mailto:ryan@websolutionsydney.com.au";

