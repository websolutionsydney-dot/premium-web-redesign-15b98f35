export type Design = {
  name: string;
  url: string;
  tags?: string[];
  demo?: boolean;
};

export type DesignCategory = {
  name: string;
  slug: string;
  blurb: string;
  designs: Design[];
};

const nameFromUrl = (u: string) => {
  try {
    const h = new URL(u).hostname.replace(/^www\./, "").replace(/\.com\.au$|\.com$|\.au$|\.net\.au$|\.eco$/g, "");
    return h.split(".")[0].split("-").map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(" ");
  } catch {
    return u;
  }
};

const d = (url: string, extra?: Partial<Design>): Design => ({
  name: extra?.name ?? nameFromUrl(url),
  url,
  ...extra,
});

export const DESIGN_CATEGORIES: DesignCategory[] = [
  {
    name: "AI-Powered Sites",
    slug: "ai",
    blurb: "Websites enhanced with AI chatbots, smart forms and Google Reviews integrations.",
    designs: [
      d("https://www.mastertechelectrical.com/", { tags: ["AI Chatbot"] }),
      d("https://podcomtelecommunications.com.au/", { tags: ["AI Chatbot"] }),
      d("https://www.airxperts.com.au/", { tags: ["AI Chatbot"] }),
      d("https://marketing4tradies.com.au/", { tags: ["AI Chatbot"] }),
      d("https://paana.com.au/contact/", { tags: ["AI Chatbot", "Smart Form"], name: "Paana" }),
      d("https://daynight-electrical.com.au/", { tags: ["Google Reviews"] }),
      d("https://powerhubelectrical.com.au/", { tags: ["Google Reviews", "reCAPTCHA"] }),
      d("https://visionconstructiongroup.com.au/", { tags: ["Google Reviews", "Click to Call"] }),
      d("https://www.highlandcraftrenovations.com.au/", { tags: ["Click to Call"] }),
      d("https://thomascrokerconstructions.com.au/home/", { tags: ["AI Chatbot", "Pop-up Form"], name: "Thomas Croker Constructions" }),
    ],
  },
  {
    name: "E-Commerce & Catalogues",
    slug: "ecommerce",
    blurb: "Shopping cart and product catalogue builds.",
    designs: [
      d("http://www.parkbeachplaza.com.au/", { name: "Park Beach Plaza" }),
      d("https://www.westendmazda.com.au/", { name: "West End Mazda" }),
      d("https://epicsupply.com.au/", { name: "Epic Supply" }),
    ],
  },
  {
    name: "Dynamic Sites",
    slug: "dynamic",
    blurb: "Custom-coded dynamic websites with CMS-driven content.",
    designs: [
      d("https://glenco.com.au/"),
      d("https://www.rebuildgroup.com.au/", { name: "Rebuild Group" }),
      d("https://futureelectrics.com.au/", { name: "Future Electrics" }),
      d("http://www.palframanhouserestumpingbrisbane.com/", { name: "Palframan House Restumping" }),
      d("http://www.ikerb.com.au/", { name: "iKerb" }),
      d("http://www.morgandickson.com.au/", { name: "Morgan Dickson" }),
      d("https://crockweld.com.au/", { name: "Crockweld" }),
      d("https://www.tfptax.com.au/", { name: "TFP Tax" }),
      d("https://www.localelectrician.com.au/", { name: "Local Electrician" }),
      d("https://www.calltheelectrician.com.au/", { name: "Call The Electrician" }),
    ],
  },
  {
    name: "Painting",
    slug: "painting",
    blurb: "Painters and decorators across Australia.",
    designs: [
      d("https://quinnspainting.com.au/"),
      d("https://bestpaintinganddecorating.com.au/"),
      d("https://secretharbourpainting.com.au/"),
      d("https://hamiltonspainting.com.au/"),
      d("https://websolutionsydney.com.au/demo/painting/", { name: "Painting Template", demo: true }),
    ],
  },
  {
    name: "Amusement, Games & Entertainment",
    slug: "entertainment",
    blurb: "Party hire, amusements and event entertainment.",
    designs: [
      d("https://billsamusements.com.au/", { name: "Bill's Amusements" }),
      d("https://carnivalland.com.au/"),
      d("https://affordablerides.com.au/"),
      d("https://allsideshowalleyamusements.com.au/", { name: "All Sideshow Alley Amusements" }),
      d("http://www.boomerangcraftsmenaustralia.com.au/", { name: "Boomerang Craftsmen Australia" }),
      d("https://arcadegameaustralia.com.au/", { name: "Arcade Game Australia" }),
    ],
  },
  {
    name: "Photography",
    slug: "photography",
    blurb: "Photographers and media studios.",
    designs: [
      d("https://www.watsonmedia.com.au/", { name: "Watson Media" }),
      d("https://ajmphoto.com.au/", { name: "AJM Photo" }),
      d("https://reminiscephotography.com.au/"),
    ],
  },
  {
    name: "Furniture & Interiors",
    slug: "furniture",
    blurb: "Wardrobe, furniture and interior design brands.",
    designs: [
      d("https://stylishwardrobes.com.au/"),
      d("https://websolutionsydney.com.au/demo/furniture/", { name: "Furniture Template", demo: true }),
      d("https://websolutionsydney.com.au/demo/interiordesign/", { name: "Interior Design Template", demo: true }),
      d("https://websolutionsydney.com.au/demo/windowsdoorservices/", { name: "Windows & Doors Template", demo: true }),
    ],
  },
  {
    name: "Cleaning & Pest Control",
    slug: "cleaning",
    blurb: "Carpet cleaning, home cleaning and pest control.",
    designs: [
      d("https://www.realdealservices.com.au/", { name: "Real Deal Services" }),
      d("https://shoreclean.net.au/"),
      d("https://www.mmcleaningspecialist.com.au/", { name: "MM Cleaning Specialist" }),
      d("https://www.absolutedomestics.com.au/"),
      d("https://citrusclean.com.au/"),
    ],
  },
  {
    name: "Renovation & Construction Trades",
    slug: "renovation",
    blurb: "Renovation, patios, scaffolding, tiling and concreting.",
    designs: [
      d("http://www.ultimatepergolas.com.au/"),
      d("https://newcastlepatiocoversandpergolas.com.au/", { name: "Newcastle Patio Covers & Pergolas" }),
      d("https://bigriverscaffoldingsolutions.com.au/", { name: "Big River Scaffolding Solutions" }),
      d("https://www.websolutionsydney.com.au/demo/bathroom&kitchenrenovation/", { name: "Bathroom & Kitchen Reno Template", demo: true }),
      d("https://websolutionsydney.com.au/demo/screens&windows/", { name: "Screens & Windows Template", demo: true }),
      d("https://websolutionsydney.com.au/demo/concretepumping/", { name: "Concrete Pumping Template", demo: true }),
      d("https://websolutionsydney.com.au/demo/tiling&waterproofing/", { name: "Tiling & Waterproofing Template", demo: true }),
      d("https://websolutionsydney.com.au/demo/brickcleaningspecialists/", { name: "Brick Cleaning Template", demo: true }),
    ],
  },
  {
    name: "Excavation & Demolition",
    slug: "excavation",
    blurb: "Skip bin, excavation, demolition and rubbish removal.",
    designs: [
      d("https://www.pkmearthmoving.com.au/", { name: "PKM Earthmoving" }),
      d("https://smsmining.com.au/", { name: "SMS Mining" }),
      d("https://ajaxcontractors.com.au/"),
      d("https://www.dingo.com.au/", { name: "Dingo" }),
      d("https://websolutionsydney.com.au/demo/sydneyskipbins/", { name: "Sydney Skip Bins Template", demo: true }),
      d("https://websolutionsydney.com.au/demo/rubbishremoval/", { name: "Rubbish Removal Template", demo: true }),
      d("https://websolutionsydney.com.au/demo/housedemolitions/", { name: "House Demolitions Template", demo: true }),
    ],
  },
  {
    name: "Building & Architecture",
    slug: "building",
    blurb: "Builders, architects and property maintenance.",
    designs: [
      d("https://www.prostylebuilding.com.au/", { name: "Prostyle Building" }),
      d("https://davidreidhomestamworth.com.au/", { name: "David Reid Homes Tamworth" }),
      d("https://websolutionsydney.com.au/demo/construction/", { name: "Construction Template", demo: true }),
      d("https://websolutionsydney.com.au/demo/architecture/", { name: "Architecture Template", demo: true }),
    ],
  },
  {
    name: "Flooring",
    slug: "flooring",
    blurb: "Timber, laminate and specialty flooring.",
    designs: [
      d("https://timberflooringspecialist.com.au/", { name: "Timber Flooring Specialist" }),
      d("https://websolutionsydney.com.au/demo/timberflooring/", { name: "Timber Flooring Template", demo: true }),
      d("http://icfwa.com.au/", { name: "ICF WA" }),
    ],
  },
  {
    name: "Welding & Metal Fabrication",
    slug: "welding",
    designs: [
      d("https://crockweld.com.au/", { name: "Crockweld" }),
      d("https://www.websolutionsydney.com.au/demo/welding&metalfabrication/", { name: "Welding Template", demo: true }),
      d("https://websolutionsydney.com.au/demo/metalfabrication/", { name: "Metal Fabrication Template", demo: true }),
    ],
    blurb: "Welders, metal fabricators and industrial trades.",
  },
  {
    name: "Specialty Trades",
    slug: "specialty",
    blurb: "Stone masonry, carpentry, plumbing, joinery and restumping.",
    designs: [
      d("https://mastersbricklayingandstonemasonry.com.au/", { name: "Masters Bricklaying & Stone Masonry", tags: ["Stone Masonry"] }),
      d("https://azcarpentry.com.au/", { name: "AZ Carpentry", tags: ["Carpentry"] }),
      d("https://derwentplumbing.com.au/", { name: "Derwent Plumbing", tags: ["Plumbing"] }),
      d("http://www.palframanhouserestumpingbrisbane.com/", { name: "Palframan House Restumping", tags: ["Restumping"] }),
      d("https://houserestumpingqld.com.au/", { name: "House Restumping QLD", tags: ["Restumping"] }),
      d("https://nakjoinery.com.au/", { name: "NAK Joinery", tags: ["Joinery"] }),
    ],
  },
  {
    name: "Electrical",
    slug: "electrical",
    blurb: "Residential, commercial and specialty electricians.",
    designs: [
      d("https://glenco.com.au/"),
      d("https://www.calltheelectrician.com.au/", { name: "Call The Electrician" }),
      d("https://www.futureelectrics.com.au/", { name: "Future Electrics" }),
      d("https://www.avdigitaltvservices.com.au/", { name: "AV Digital TV Services" }),
      d("https://www.localelectrician.com.au/", { name: "Local Electrician" }),
      d("https://websolutionsydney.com.au/demo/electrical/", { name: "Electrical Template", demo: true }),
    ],
  },
  {
    name: "Lifestyle & Services",
    slug: "lifestyle",
    blurb: "Horse riding, driving schools, bookkeeping, recycling and backpackers.",
    designs: [
      d("https://whinburyhillequestrian.com.au/", { name: "Whinbury Hill Equestrian", tags: ["Horse Riding"] }),
      d("https://www.tfptax.com.au/", { name: "TFP Tax", tags: ["Bookkeeping"] }),
      d("https://pianosrecycled.eco/", { name: "Pianos Recycled", tags: ["Recycling"] }),
      d("http://homehillbackpackers.com.au/", { name: "Home Hill Backpackers", tags: ["Backpacker"] }),
      d("http://melsds.com.au/", { name: "Mel's Driving School", tags: ["Driving School"] }),
      d("https://websolutionsydney.com.au/demo/drivingschool/", { name: "Driving School Template", tags: ["Driving School"], demo: true }),
      d("https://kcjpropertyrestorations.com.au/", { name: "KCJ Property Restorations", tags: ["Property Management"] }),
    ],
  },
  {
    name: "Landscaping",
    slug: "landscaping",
    blurb: "Landscape design and outdoor works.",
    designs: [
      d("http://www.ikerb.com.au/", { name: "iKerb" }),
    ],
  },
];

export const thumbFor = (url: string) =>
  `https://image.thum.io/get/width/900/crop/700/noanimate/${url}`;

export const ALL_DESIGNS_COUNT = DESIGN_CATEGORIES.reduce((n, c) => n + c.designs.length, 0);
