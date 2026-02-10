export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const city = (searchParams.get("city") || "bangalore").toLowerCase()
  const category = (searchParams.get("category") || "all").toLowerCase()

  const data = getLocalInsiderData(city, category)

  return Response.json({
    status: "success",
    city,
    category,
    ...data,
  })
}

interface LocalFood {
  id: number
  name: string
  type: string
  description: string
  priceRange: string
  address: string
  knownFor: string
  localSecret: string
  rating: number
  tags: string[]
}

interface Festival {
  id: number
  name: string
  when: string
  description: string
  where: string
  localExperience: string
  cost: string
  insiderTip: string
  tags: string[]
}

interface HiddenSpot {
  id: number
  name: string
  type: string
  description: string
  howToReach: string
  whyHidden: string
  bestTime: string
  cost: string
  localSecret: string
  tags: string[]
}

function getLocalInsiderData(city: string, category: string) {
  const cityData: Record<string, { food: LocalFood[]; festivals: Festival[]; hiddenSpots: HiddenSpot[] }> = {
    bangalore: {
      food: [
        {
          id: 1,
          name: "Vidyarthi Bhavan",
          type: "Breakfast Institution",
          description: "Operating since 1943, this tiny restaurant in Basavanagudi serves one thing perfectly: crispy masala dosa with coconut chutney.",
          priceRange: "Rs 50-120",
          address: "Gandhi Bazaar, Basavanagudi",
          knownFor: "Masala Dosa & Filter Coffee",
          localSecret: "Go before 8 AM on weekdays. The dosa batter is freshest in the first batch. Weekend queues stretch 200 meters.",
          rating: 4.8,
          tags: ["breakfast", "dosa", "heritage"],
        },
        {
          id: 2,
          name: "Nagarjuna",
          type: "Andhra Meals",
          description: "Fiery Andhra-style meals served on banana leaves. The staff keeps piling rice and curry until you physically stop them.",
          priceRange: "Rs 200-350",
          address: "Residency Road",
          knownFor: "Andhra Meals with unlimited refills",
          localSecret: "Ask for 'gunpowder' (podi) separately. Mix it with ghee and rice. This is the real dish, not on the menu.",
          rating: 4.6,
          tags: ["lunch", "spicy", "andhra"],
        },
        {
          id: 3,
          name: "CTR (Central Tiffin Room)",
          type: "Street Food Legend",
          description: "A cramped counter in Malleshwaram that has been making butter-soaked dosas since 1920. No seating, no menu, no nonsense.",
          priceRange: "Rs 60-100",
          address: "Sampige Road, Malleshwaram",
          knownFor: "Benne (Butter) Masala Dosa",
          localSecret: "They close when batter runs out, usually by 12 PM. The set dosa is even better than the masala dosa -- locals order it.",
          rating: 4.7,
          tags: ["breakfast", "butter-dosa", "legacy"],
        },
        {
          id: 4,
          name: "VV Puram Food Street",
          type: "Evening Street Food",
          description: "A 500-meter stretch with 40+ stalls serving everything from paddu to rabdi. Each stall is a family business spanning generations.",
          priceRange: "Rs 30-150 per item",
          address: "VV Puram, near Lalbagh south gate",
          knownFor: "Paddu, Akki Roti, Congress Kadlekai",
          localSecret: "Start from the south end for savory, work north for sweets. The paddu stall near the temple has been there 60 years.",
          rating: 4.5,
          tags: ["street-food", "evening", "variety"],
        },
        {
          id: 5,
          name: "Brahmin's Coffee Bar",
          type: "Morning Ritual",
          description: "Standing-room-only spot where Bangaloreans have started their mornings since 1965. Idli-vada-coffee served at record speed.",
          priceRange: "Rs 40-80",
          address: "Shankarapuram, near Basavanagudi",
          knownFor: "Idli Vada with filter coffee",
          localSecret: "There is no table service and no seating. Eat standing at the granite counter like everyone else. That is the experience.",
          rating: 4.6,
          tags: ["breakfast", "coffee", "standing-only"],
        },
      ],
      festivals: [
        {
          id: 1,
          name: "Kadalekai Parishe (Groundnut Fair)",
          when: "Late November / Early December (Monday after last new moon in Kartik month)",
          description: "Centuries-old groundnut festival at the Bull Temple in Basavanagudi. Farmers bring their first harvest as an offering, then the whole area becomes a massive fair.",
          where: "Bull Temple Road, Basavanagudi",
          localExperience: "Locals buy roasted groundnuts in newspaper cones, watch folk performances, and eat at the food stalls that only appear during this fair.",
          cost: "Free (Rs 50-200 for food and groundnuts)",
          insiderTip: "Go at dusk when the oil lamps are lit around the Bull Temple. The procession with decorated bulls happens after dark.",
          tags: ["harvest", "heritage", "food-fair"],
        },
        {
          id: 2,
          name: "Karaga Festival",
          when: "March/April (during Chaitra month)",
          description: "Bangalore's oldest festival where a priest carries a flower-decorated pot on his head through old city streets all night. The entire old town comes alive.",
          where: "Starts at Dharmaraya Temple, walks through old Bangalore",
          localExperience: "Follow the procession through narrow lanes. Families open their doors offering water and flowers. The energy at 3 AM is electric.",
          cost: "Free",
          insiderTip: "Position yourself near Thigalarpete at midnight. The procession passes through a fire torch corridor there.",
          tags: ["procession", "night-festival", "ancient"],
        },
        {
          id: 3,
          name: "Lalbagh Flower Show",
          when: "Republic Day week (January) and Independence Day week (August)",
          description: "Massive flower exhibition inside the historic Lalbagh Botanical Garden. The Glass House centerpiece features a different theme each year.",
          where: "Lalbagh Botanical Garden",
          localExperience: "Go on opening day morning to see the freshest arrangements. The rose and orchid sections near the lake are where serious gardeners spend hours.",
          cost: "Rs 80 entry",
          insiderTip: "Enter from the south gate (Siddapura gate) -- shorter queue. The north gate queue on weekends is 1+ hour.",
          tags: ["flowers", "garden", "exhibition"],
        },
      ],
      hiddenSpots: [
        {
          id: 1,
          name: "Hesaraghatta Grasslands",
          type: "Open Landscape",
          description: "Vast open grasslands 30 km from the city that look like African savanna. One of the few remaining grassland ecosystems near Bangalore.",
          howToReach: "Drive towards Hesaraghatta, take the left after the lake. No signboard. Ask locals for 'hulli betta.'",
          whyHidden: "No Google listing, no entry gate, no facilities. That is exactly why it is untouched.",
          bestTime: "Sunrise or golden hour. October-February for best grass color.",
          cost: "Free",
          localSecret: "Birdwatchers come here for harriers and grassland pipits you will never see in city parks.",
          tags: ["grassland", "birds", "photography"],
        },
        {
          id: 2,
          name: "Tavarekere Lake Island",
          type: "Secret Lake",
          description: "A small island in the middle of a lake in south Bangalore with a crumbling temple ruin on it. Almost nobody knows about it.",
          howToReach: "Near JP Nagar 8th Phase. Walk along the lake bund from the southeast corner.",
          whyHidden: "The island is only visible from one angle, hidden by reeds. Fishermen access it by coracle.",
          bestTime: "Early morning, winter months when water is low",
          cost: "Free",
          localSecret: "Talk to the fishermen at the south bank. Some will take you to the island on their coracle for Rs 50.",
          tags: ["lake", "ruins", "secret"],
        },
        {
          id: 3,
          name: "Devanahalli Fort Back Trail",
          type: "Forgotten Heritage",
          description: "A crumbling Tipu Sultan-era fort with massive walls and ancient trees growing through the ramparts. The backside trail has no visitors.",
          howToReach: "Drive to Devanahalli town (near airport). The fort is in the center. Walk around to the back wall facing east.",
          whyHidden: "Everyone visits only the front gate. The entire back half of the fort is deserted and atmospheric.",
          bestTime: "Late afternoon for golden light on the stone walls",
          cost: "Free",
          localSecret: "The old stepwell inside the fort behind the Venkataramana temple is the real hidden gem. Almost nobody visits it.",
          tags: ["fort", "history", "photography"],
        },
        {
          id: 4,
          name: "Manchanabele Dam Secret Viewpoint",
          type: "Scenic Viewpoint",
          description: "A cliffside viewpoint above the reservoir that is not part of any trekking trail. Views of the dam with Savandurga hill behind.",
          howToReach: "Drive to Manchanabele Dam. Instead of going to the dam, take the dirt road left before the gate for 2 km.",
          whyHidden: "The dirt road is unmarked and looks like it leads nowhere. Only local shepherds use it.",
          bestTime: "Monsoon (July-September) when the dam overflows",
          cost: "Free",
          localSecret: "During monsoon, the dam overflow creates a waterfall visible from this spot. Locals call it 'mini Niagara.'",
          tags: ["dam", "viewpoint", "monsoon"],
        },
      ],
    },
    delhi: {
      food: [
        {
          id: 6,
          name: "Paranthe Wali Gali",
          type: "Heritage Street Food",
          description: "A narrow lane in Chandni Chowk with shops frying paranthas since the 1870s. Each shop has its own 150-year-old recipe.",
          priceRange: "Rs 50-150",
          address: "Chandni Chowk, Old Delhi",
          knownFor: "Stuffed Paranthas (rabri, mixed dal, paneer)",
          localSecret: "Pt. Kanhaiyalal's shop (the first one) uses a recipe unchanged since 1872. Ask for the 'special mix' parantha -- not on the board.",
          rating: 4.6,
          tags: ["breakfast", "heritage", "old-delhi"],
        },
        {
          id: 7,
          name: "Karim's (Original)",
          type: "Mughlai Legend",
          description: "Founded in 1913 by descendants of Mughal court cooks. The original location is in a lane behind Jama Masjid.",
          priceRange: "Rs 200-500",
          address: "Gali Kababian, Jama Masjid",
          knownFor: "Mutton Burra, Seekh Kebab, Badam Pasanda",
          localSecret: "Go for lunch, not dinner. The fresh batches of kebab come off the coal at noon. The evening ones are reheated.",
          rating: 4.7,
          tags: ["lunch", "mughlai", "non-veg"],
        },
        {
          id: 8,
          name: "Baba Nagpal Corner",
          type: "Street Chaat",
          description: "A tiny counter in Lajpat Nagar serving the most aggressively flavored choley bhature in Delhi. Queue expected.",
          priceRange: "Rs 80-120",
          address: "Lajpat Nagar-II, near Central Market",
          knownFor: "Choley Bhature with spicy pickle",
          localSecret: "The green chutney they serve on the side is the real star. Ask for extra. Also try the lassi from the cart next door.",
          rating: 4.5,
          tags: ["street-food", "spicy", "legendary"],
        },
        {
          id: 9,
          name: "Nathu's Corner",
          type: "Sweets & Chaat",
          description: "Bengali Market institution for fresh sweets and chaat. Families have been coming here for weekend treats since the 1960s.",
          priceRange: "Rs 50-200",
          address: "Bengali Market, Connaught Place",
          knownFor: "Raj Kachori, Rabri Jalebi, Paneer Pakoda",
          localSecret: "Order the Raj Kachori and ask them to make it 'with extra meethi chutney.' The standard ratio is too tangy for most.",
          rating: 4.4,
          tags: ["chaat", "sweets", "family"],
        },
      ],
      festivals: [
        {
          id: 4,
          name: "Phool Walon Ki Sair",
          when: "October (three-day festival)",
          description: "A unique secular festival where flower fans are offered at both a Hindu temple and a Sufi dargah. Procession through Mehrauli streets.",
          where: "Mehrauli, starting from Yogmaya Temple",
          localExperience: "Walk with the procession as flower-decorated pankhas (fans) are carried through centuries-old lanes with qawwali singing.",
          cost: "Free",
          insiderTip: "Follow the procession to the Qutubuddin Bakhtiyar Kaki dargah. The qawwali session there is the emotional peak.",
          tags: ["secular", "procession", "flowers"],
        },
        {
          id: 5,
          name: "Basant Panchami Kite Festival",
          when: "Late January / Early February",
          description: "Old Delhi's rooftops fill with kite flyers for this spring festival. The sky turns into a canvas of color and competition.",
          where: "Old Delhi rooftops, especially Chandni Chowk area",
          localExperience: "Find a rooftop in Old Delhi and join the kite-cutting battles. Families invite neighbors and strangers alike.",
          cost: "Rs 100-300 for kites and string",
          insiderTip: "Buy kites from the narrow gali behind Fatehpuri Masjid. The best manjha (cutting string) comes from the shop with the green door.",
          tags: ["kites", "rooftop", "spring"],
        },
      ],
      hiddenSpots: [
        {
          id: 5,
          name: "Mehrauli Archaeological Park",
          type: "Forgotten Ruins",
          description: "Over 440 ancient monuments scattered across a park that barely any Delhi residents know about. Tombs, mosques, and stepwells from the 12th century onwards.",
          howToReach: "Enter from the gate opposite Qutub Minar parking lot. Walk straight into the park, ignoring the Qutub complex.",
          whyHidden: "Everyone goes to Qutub Minar next door and skips this entirely. It has no ticket counter so people assume there is nothing here.",
          bestTime: "Winter mornings (December-February)",
          cost: "Free",
          localSecret: "The Rajon Ki Baoli stepwell is inside the park. It is 60 feet deep and completely deserted. Better than Agrasen ki Baoli.",
          tags: ["ruins", "history", "stepwell"],
        },
        {
          id: 6,
          name: "Sunder Nursery Night Garden",
          type: "Restored Heritage Garden",
          description: "A recently restored Mughal-era garden complex adjacent to Humayun's Tomb. Much less crowded and arguably more beautiful.",
          howToReach: "Separate entrance from Humayun's Tomb, on the Mathura Road side",
          whyHidden: "Opened only in 2018 after decades of restoration. Most guidebooks still do not list it.",
          bestTime: "Late afternoon into dusk, when the fountains are lit",
          cost: "Rs 20 entry",
          localSecret: "Walk to the far back where the old Mughal bridge remnants are. There is a small amphitheater area that feels like a private garden.",
          tags: ["garden", "mughal", "peaceful"],
        },
      ],
    },
    mumbai: {
      food: [
        {
          id: 10,
          name: "Sardar Pav Bhaji (Original)",
          type: "Street Food Icon",
          description: "The original Tardeo stall that made pav bhaji famous. They use an entire block of butter per plate.",
          priceRange: "Rs 120-200",
          address: "Tardeo Junction, near AC Market",
          knownFor: "Butter Pav Bhaji",
          localSecret: "Order 'special' which has extra butter and paneer mixed in. Go after 7 PM when the fresh batches start.",
          rating: 4.7,
          tags: ["street-food", "dinner", "butter"],
        },
        {
          id: 11,
          name: "Cafe Madras",
          type: "South Indian Heritage",
          description: "A 1940s South Indian joint in Matunga that still serves filter coffee in stainless steel tumblers and idli that melts.",
          priceRange: "Rs 60-150",
          address: "Matunga Circle, King's Circle",
          knownFor: "Filter Coffee, Ghee Idli, Rava Dosa",
          localSecret: "The upstairs room is always empty while people queue downstairs. Ask for upstairs seating directly.",
          rating: 4.5,
          tags: ["breakfast", "south-indian", "heritage"],
        },
        {
          id: 12,
          name: "Mohammed Ali Road Iftar Trail",
          type: "Seasonal Street Food",
          description: "During Ramzan, this road transforms into Mumbai's greatest food festival. Kebabs, malpua, phirni, and falooda from sunset onwards.",
          priceRange: "Rs 100-400",
          address: "Mohammed Ali Road, near Minara Masjid",
          knownFor: "Seekh Kebab, Malpua, Phirni",
          localSecret: "Start from Minara Masjid end and walk south. The best kebab stall has no name -- it is the 4th stall with the coal grill.",
          rating: 4.8,
          tags: ["ramzan", "night-food", "kebab"],
        },
      ],
      festivals: [
        {
          id: 6,
          name: "Ganesh Chaturthi Visarjan",
          when: "September (10-day festival, visarjan on Anant Chaturdashi)",
          description: "The biggest street festival in India. Neighborhood mandals create elaborate Ganesh pandals and the visarjan processions bring the city together.",
          where: "Lalbaugcha Raja (Lalbaug), Girgaon Chowpatty for visarjan",
          localExperience: "Skip the main Lalbaugcha Raja queue (12+ hours). Visit neighborhood mandals in Khetwadi lanes for equally stunning pandals with zero wait.",
          cost: "Free",
          insiderTip: "For visarjan, go to Girgaon Chowpatty at 2 AM, not during the day. The midnight processions are more emotional and less chaotic.",
          tags: ["ganesh", "procession", "community"],
        },
      ],
      hiddenSpots: [
        {
          id: 7,
          name: "Banganga Tank",
          type: "Ancient Sacred Tank",
          description: "A 1000-year-old sacred water tank surrounded by temples, hidden in the middle of Malabar Hill -- Mumbai's richest neighborhood.",
          howToReach: "Walk into Malabar Hill from Walkeshwar Road. The tank is behind the Walkeshwar Temple.",
          whyHidden: "Surrounded by high-rises on all sides, invisible from any main road. Most Mumbaikars have never been here.",
          bestTime: "Early morning for the light reflecting off the water",
          cost: "Free",
          localSecret: "During the annual Banganga Festival (January), classical musicians perform on the steps of the tank at night. It is hauntingly beautiful.",
          tags: ["ancient", "sacred", "hidden"],
        },
        {
          id: 8,
          name: "Sewri Flamingo Point",
          type: "Wildlife Secret",
          description: "Thousands of flamingos visit the Sewri mudflats every winter. A pink horizon in the middle of industrial Mumbai.",
          howToReach: "Sewri Jetty, near the container terminal. Walk past the jetty towards the mudflats.",
          whyHidden: "Located in an industrial zone that nobody visits recreationally. The flamingos arrive silently and leave by March.",
          bestTime: "December to February, early morning for best viewing",
          cost: "Free",
          localSecret: "Bring binoculars. The flamingos stay 200-300 meters from shore. The best viewing is from the broken wall at the jetty's end.",
          tags: ["flamingos", "wildlife", "photography"],
        },
      ],
    },
    goa: {
      food: [
        {
          id: 13,
          name: "Ritz Classic",
          type: "Goan Home-Style",
          description: "A Panjim institution since the 1970s. Goan Catholic and Hindu food served the way local families cook it at home.",
          priceRange: "Rs 150-350",
          address: "18th June Road, Panjim",
          knownFor: "Fish Thali, Pork Vindaloo, Bebinca",
          localSecret: "Go for the lunch thali, not dinner. The fish changes daily based on market catch. Thursday is kingfish day.",
          rating: 4.6,
          tags: ["goan-food", "thali", "local"],
        },
        {
          id: 14,
          name: "Vinayak Family Restaurant",
          type: "Local Fish Joint",
          description: "A no-frills place in Assagao where the fried fish is so good that Goan chefs eat here on their days off.",
          priceRange: "Rs 200-400",
          address: "Assagao, near the church",
          knownFor: "Rava Fried Fish, Sol Kadi, Fish Curry Rice",
          localSecret: "Ask for the 'morning catch fried' -- they will tell you what came in from Anjuna that morning and fry it to order.",
          rating: 4.5,
          tags: ["fish", "local-joint", "fried"],
        },
      ],
      festivals: [
        {
          id: 7,
          name: "Shigmo (Goan Holi)",
          when: "March (5-day festival during full moon of Phalgun month)",
          description: "Goa's version of Holi with elaborate float parades, folk dances, and street performances. Each village has its own unique celebration.",
          where: "Panjim float parade, but village celebrations in Ponda and Marcel are more authentic",
          localExperience: "Skip the Panjim parade. Go to Marcel or Shiroda village shigmo for raw, unscripted folk performances with local families.",
          cost: "Free",
          insiderTip: "The 'romta mel' (roaming groups) in villages go house to house singing and dancing. Join them -- they welcome everyone.",
          tags: ["folk", "dance", "spring"],
        },
        {
          id: 8,
          name: "Feast of St. Francis Xavier",
          when: "December 3rd (with weeks of events before)",
          description: "Massive Catholic feast at Old Goa's Basilica of Bom Jesus. The relics of St. Francis Xavier are displayed every 10 years, but the annual feast is itself grand.",
          where: "Basilica of Bom Jesus, Old Goa",
          localExperience: "The novena (9 days of prayer before the feast) has evening processions with candles through Old Goa. The atmosphere is deeply moving.",
          cost: "Free",
          insiderTip: "Come 2-3 days before December 3rd for the smaller, more intimate gatherings. The feast day itself is extremely crowded.",
          tags: ["catholic", "heritage", "spiritual"],
        },
      ],
      hiddenSpots: [
        {
          id: 9,
          name: "Butterfly Beach",
          type: "Secret Beach",
          description: "A tiny crescent beach accessible only by boat or a steep forest trail from Palolem. No shacks, no vendors, no crowd.",
          howToReach: "Boat from Palolem (Rs 300 return) or a 30-min forest hike from the Palolem south end",
          whyHidden: "No road access. The forest trail is unmarked and steep. Most tourists do not know it exists.",
          bestTime: "Morning, any season",
          cost: "Rs 300 for boat, free if you hike",
          localSecret: "If you hike, the trail starts behind the last house at Palolem's south end. Ask the house owner -- she will point the way.",
          tags: ["beach", "secret", "nature"],
        },
      ],
    },
  }

  const data = cityData[city] || cityData.bangalore

  if (category === "all") {
    return {
      food: data.food,
      festivals: data.festivals,
      hiddenSpots: data.hiddenSpots,
    }
  }
  if (category === "food") return { food: data.food, festivals: [], hiddenSpots: [] }
  if (category === "festivals") return { food: [], festivals: data.festivals, hiddenSpots: [] }
  if (category === "hidden") return { food: [], festivals: [], hiddenSpots: data.hiddenSpots }

  return { food: data.food, festivals: data.festivals, hiddenSpots: data.hiddenSpots }
}
