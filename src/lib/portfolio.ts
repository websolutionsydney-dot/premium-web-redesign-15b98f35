export type Project = {
  name: string;
  category: string;
  url: string;
  image: string;
};

export const PROJECTS: Project[] = [
  { name: "TFP Tax", category: "Book Keeping", url: "https://www.tfptax.com.au/", image: "https://websolutionsydney.com.au/wp-content/uploads/2023/03/tfp-1.png" },
  { name: "Rebuild Group", category: "Construction / Renovation", url: "https://www.rebuildgroup.com.au/", image: "https://websolutionsydney.com.au/wp-content/uploads/2023/03/rebuild-group-1.png" },
  { name: "Whinbury Hill Equestrian", category: "Horse Riding", url: "https://whinburyhillequestrian.com.au/", image: "https://websolutionsydney.com.au/wp-content/uploads/2023/03/whinbury.png" },
  { name: "Local Electrician", category: "Electrical", url: "https://www.localelectrician.com.au/", image: "https://websolutionsydney.com.au/wp-content/uploads/2023/03/local-electrician.png" },
  { name: "Dingo", category: "Skip Bin / Excavation", url: "https://www.dingo.com.au/", image: "https://websolutionsydney.com.au/wp-content/uploads/2023/03/dingo.png" },
  { name: "Citrus Clean", category: "Carpet Cleaning", url: "https://citrusclean.com.au/", image: "https://websolutionsydney.com.au/wp-content/uploads/2023/03/citrus-clean.png" },
  { name: "Shore Clean", category: "Cleaning", url: "https://shoreclean.net.au/", image: "https://websolutionsydney.com.au/wp-content/uploads/2023/03/shore-clean.png" },
  { name: "Park Beach Plaza", category: "E-Commerce", url: "http://www.parkbeachplaza.com.au/", image: "https://websolutionsydney.com.au/wp-content/uploads/2023/03/park-beach-plaza.png" },
  { name: "Total Colour Painting", category: "Painting", url: "https://totalcolourpainting.com.au/", image: "https://websolutionsydney.com.au/wp-content/uploads/2023/03/total-color.png" },
  { name: "Ju Flooring", category: "Flooring", url: "https://juflooring.com.au/", image: "https://websolutionsydney.com.au/wp-content/uploads/2023/03/jut-flooring.png" },
  { name: "All Shutters & Blinds", category: "Blinds / Shutters", url: "https://allshuttersandblinds.com.au/", image: "https://websolutionsydney.com.au/wp-content/uploads/2023/03/all-shutters.png" },
  { name: "Wynstan", category: "Blinds / Awnings", url: "https://www.wynstan.com.au/", image: "https://websolutionsydney.com.au/wp-content/uploads/2023/03/wysntan.png" },
  { name: "Carnivalland", category: "Amusement / Entertainment", url: "https://carnivalland.com.au/", image: "https://websolutionsydney.com.au/wp-content/uploads/2023/03/carnivalland.png" },
  { name: "Reminisce Photography", category: "Photography", url: "https://reminiscephotography.com.au/", image: "https://websolutionsydney.com.au/wp-content/uploads/2023/03/reminisce.png" },
  { name: "Pool Care", category: "Pool Care", url: "https://poolcarecompany.com.au/", image: "https://websolutionsydney.com.au/wp-content/uploads/2023/03/poolcare.png" },
  { name: "Epic Supply", category: "E-Commerce", url: "https://epicsupply.com.au/", image: "https://websolutionsydney.com.au/wp-content/uploads/2023/03/epicsupply.png" },
  { name: "Iconic Renovations", category: "Renovation", url: "https://iconicrenovationsco.com.au/", image: "https://websolutionsydney.com.au/wp-content/uploads/2023/04/iconic.png" },
  { name: "GT Kitchen & Bathroom", category: "Renovation", url: "https://www.gtkitchenandbathroom.com.au/", image: "https://websolutionsydney.com.au/wp-content/uploads/2023/04/granite-tranform.png" },
  { name: "Call The Electrician", category: "Electrical", url: "https://www.calltheelectrician.com.au/", image: "https://websolutionsydney.com.au/wp-content/uploads/2023/04/Cathleen.png" },
  { name: "SMS Mining", category: "Industrial", url: "https://smsmining.com.au/", image: "https://websolutionsydney.com.au/wp-content/uploads/2023/04/sms.png" },
];

export const CATEGORIES = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.category)))];

export const LOGO_URL = "https://websolutionsydney.com.au/wp-content/uploads/2023/03/logo.png";
export const PHONE = "0420 102 599";
export const PHONE_HREF = "tel:+61420102599";
