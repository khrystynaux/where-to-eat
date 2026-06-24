/* ============================================================================
   Where to Eat — restaurant database
   Real dish names + photos from TheMealDB (free, CORS, stable CDN).
   Builds a deterministic database of 24 restaurants per city (6 cuisines x 4),
   then filters down to a guaranteed unique bracket of 8.
   Exposes: window.WTE_DATA = { CITIES, CUISINES, DIETS, BUDGETS, buildPool }
   ============================================================================*/
(function () {
  // --- Dish pools (name + real photo) -------------------------------------
  const M = "https://www.themealdb.com/images/media/meals/";
  const DISHES = {
    Italian: [
      ["Fettuccine Alfredo", "0jv5gx1661040802.jpg"],
      ["Slow-braised Lasagne", "wtsvxx1511296896.jpg"],
      ["Chilli Prawn Linguine", "usywpp1511189717.jpg"],
      ["Osso Buco alla Milanese", "wwuqvt1487345467.jpg"],
      ["Garden Pasta Salad", "wvqpwt1468339226.jpg"],
      ["Chicken Alfredo Primavera", "syqypv1486981727.jpg"],
    ],
    Japanese: [
      ["Pork Katsudon", "d8f6qx1604182128.jpg"],
      ["Tonkatsu & Rice", "lwsnkl1604181187.jpg"],
      ["Chicken Karaage", "tyywsw1505930373.jpg"],
      ["Chef's Sushi Set", "g046bb1663960946.jpg"],
      ["Honey Teriyaki Salmon", "xxyupu1468262513.jpg"],
      ["Katsu Chicken Curry", "vwrpps1503068729.jpg"],
    ],
    Chinese: [
      ["Beef Lo Mein", "1529444830.jpg"],
      ["Chicken Fried Rice", "wuyd2h1765655837.jpg"],
      ["Orange Chicken", "s73ytv1765567838.jpg"],
      ["Beef & Broccoli", "m0p0j81765568742.jpg"],
      ["Egg Drop Soup", "1529446137.jpg"],
      ["Crispy Egg Rolls", "grhn401765687086.jpg"],
    ],
    Thai: [
      ["Pad Thai", "rg9ze01763479093.jpg"],
      ["Pad See Ew", "uuuspp1468263334.jpg"],
      ["Massaman Beef Curry", "tvttqv1504640475.jpg"],
      ["Drunken Noodles", "2wx8cm1763373419.jpg"],
      ["Panang Chicken Curry", "0dhtwr1763371444.jpg"],
      ["Red Curry Kebabs", "prjve31763486864.jpg"],
    ],
    Greek: [
      ["Moussaka", "ctg8jd1585563097.jpg"],
      ["Lamb & Lemon Souvlaki", "rjhf741585564676.jpg"],
      ["Garides Saganaki", "wuvryu1468232995.jpg"],
      ["Lamb Tzatziki Burgers", "k420tj1585565244.jpg"],
      ["Quinoa Greek Salad", "k29viq1585565980.jpg"],
      ["Gigantes Plaki", "b79r6f1585566277.jpg"],
    ],
    Spanish: [
      ["Patatas Bravas", "3m8yae1763257951.jpg"],
      ["Arroz al Horno", "qt4i0n1763256454.jpg"],
      ["Chicken & Chorizo Rice", "fk80jp1763280767.jpg"],
      ["Chorizo & Chickpea Soup", "kggfo91763288633.jpg"],
      ["Chocolate Churros", "erzs951763296201.jpg"],
      ["Arroz con Gambas", "jc6oub1763196663.jpg"],
    ],
    British: [
      ["Beef & Mustard Pie", "sytuqu1511553755.jpg"],
      ["Sausage & Bean Hotpot", "vxuyrx1511302687.jpg"],
      ["Bubble & Squeak", "xusqvw1511638311.jpg"],
      ["Baked Salmon & Fennel", "1548772327.jpg"],
      ["Apple & Blackberry Crumble", "xvsurr1511719182.jpg"],
      ["Bakewell Tart", "wyrqqq1468233628.jpg"],
    ],
    Mexican: [
      ["Cajun Fish Tacos", "uvuyxu1503067369.jpg"],
      ["Chicken Enchiladas", "qtuwxu1468233098.jpg"],
      ["Chickpea Fajitas", "tvtxpq1511464705.jpg"],
      ["Braised Beef Chilli", "uuqvwu1504629254.jpg"],
      ["Baked Chicken Tacos", "ypxvwv1505333929.jpg"],
      ["Stuffed Bell Peppers", "b66myb1683207208.jpg"],
    ],
    Vietnamese: [
      ["Beef Pho", "pbzcrx1763765096.jpg"],
      ["Beef Banh Mi Bowl", "z0ageb1583189517.jpg"],
      ["Bang Bang Prawn Salad", "4xcfai1763765676.jpg"],
      ["Barbecue Pork Buns", "tzsy461763769901.jpg"],
      ["Rice Paper Dumplings", "sfahy01763752319.jpg"],
      ["Salmon Noodle Soup", "ikizdm1763760862.jpg"],
    ],
  };

  // --- Restaurant name pools per cuisine ----------------------------------
  const NAMES = {
    Italian: ["Trattoria Lucia", "Osteria Bloom", "Vino & Vita", "Casa Rosa", "Il Papavero", "Bottega Sole"],
    Japanese: ["Hanabi", "Sakura-tei", "Komorebi", "Aka Izakaya", "Tsuki Ramen", "Umi & Rice"],
    Chinese: ["Golden Lotus", "Red Lantern", "Jade Garden", "Lucky Pearl", "Wok & Bloom", "Double Happiness"],
    Thai: ["Bai Toey", "Lemongrass", "Mango Tree", "Siam Bloom", "Soi Nine", "Basil & Chilli"],
    Greek: ["Meraki", "Olive & Vine", "Thalassa", "Yamas!", "Kefi", "Plaka"],
    Spanish: ["Bodega Sol", "La Rambla", "Tapas & Tinto", "El Patio", "Azulejo", "Brava"],
    British: ["The Bloomsbury", "Copper Kettle", "The Larder", "Pie & Crown", "The Hearth", "Greenwich Table"],
    Mexican: ["Casa Verde", "El Fuego", "La Lucha", "Maíz", "Cantina Luz", "Frida's"],
    Vietnamese: ["Phở Seventy-Nine", "Lotus & Lime", "Hà Nội House", "Banh Bloom", "Saigon Street", "Mây"],
  };

  // --- Cities (cuisine mix + neighborhoods) -------------------------------
  const CITIES = [
    {
      id: "london", name: "London", emojiless: true, country: "UK",
      cuisines: ["British", "Italian", "Japanese", "Thai", "Greek", "Spanish"],
      areas: ["Soho", "Shoreditch", "Camden", "Notting Hill", "Borough", "Hackney", "Covent Garden", "Brixton"],
    },
    {
      id: "newyork", name: "New York", country: "USA",
      cuisines: ["Italian", "Mexican", "Chinese", "Japanese", "Greek", "Spanish"],
      areas: ["SoHo", "West Village", "Williamsburg", "Harlem", "East Village", "Chelsea", "Astoria", "Lower East Side"],
    },
    {
      id: "tokyo", name: "Tokyo", country: "Japan",
      cuisines: ["Japanese", "Italian", "Chinese", "Thai", "Vietnamese", "Spanish"],
      areas: ["Shibuya", "Shinjuku", "Ginza", "Naka-Meguro", "Daikanyama", "Asakusa", "Shimokitazawa", "Ebisu"],
    },
  ];

  // All cuisines a player can pick as a "mood" (union across cities)
  const CUISINES = ["Italian", "Japanese", "Chinese", "Thai", "Greek", "Spanish", "British", "Mexican", "Vietnamese"];

  const DIETS = [
    { id: "none", label: "No restrictions" },
    { id: "vegetarian", label: "Vegetarian" },
    { id: "vegan", label: "Vegan" },
    { id: "halal", label: "Halal" },
    { id: "glutenfree", label: "Gluten-free" },
  ];

  const BUDGETS = [
    { id: "any", label: "Any budget", signs: 3 },
    { id: "1", label: "Easy on the wallet", signs: 1 },
    { id: "2", label: "Mid-range", signs: 2 },
    { id: "3", label: "Treat yourself", signs: 3 },
  ];

  // deterministic pseudo-random from a string seed
  function seed(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return (h >>> 0) / 4294967295;
  }

  // --- Build the full database --------------------------------------------
  function buildDatabase() {
    const all = [];
    CITIES.forEach((city, ci) => {
      city.cuisines.forEach((cuisine, qi) => {
        for (let j = 0; j < 4; j++) {
          const nameIdx = (qi + j + ci) % NAMES[cuisine].length;
          const dishIdx = (j + ci * 2 + qi) % DISHES[cuisine].length;
          const [dishName, dishFile] = DISHES[cuisine][dishIdx];
          const id = city.id + "-" + cuisine + "-" + j;
          const s = seed(id);
          const s2 = seed(id + "x");
          const s3 = seed(id + "y");
          const price = s < 0.34 ? 1 : s < 0.7 ? 2 : 3;
          const rating = Math.round((3.8 + s2 * 1.1) * 10) / 10; // 3.8 - 4.9
          const reviews = 40 + Math.floor(s3 * 860);
          const distance = Math.round((0.3 + s3 * 5.7) * 10) / 10; // 0.3 - 6.0 mi
          const areaIdx = Math.floor(seed(id + "a") * city.areas.length);
          const idx = qi * 4 + j; // 0..23 within city
          const diets = [];
          if (idx % 5 !== 0) diets.push("vegetarian");        // ~19/24
          if (idx % 2 === 0 || idx % 3 === 0) diets.push("vegan"); // ~16/24
          if (idx % 2 === 1 || idx % 5 === 0) diets.push("halal"); // ~14/24
          if (idx % 3 !== 1) diets.push("glutenfree");        // ~16/24
          all.push({
            id, city: city.id, cityName: city.name,
            name: NAMES[cuisine][nameIdx],
            cuisine,
            dish: dishName,
            img: M + dishFile,
            price, rating, reviews, distance,
            area: city.areas[areaIdx],
            diets,
          });
        }
      });
    });
    return all;
  }

  const DB = buildDatabase();

  // simple seeded shuffle for reproducibility within a session run
  function shuffle(arr, s) {
    const a = arr.slice();
    let m = a.length;
    let rnd = s || Math.random();
    while (m) {
      rnd = (rnd * 9301 + 49297) % 233280;
      const i = Math.floor((rnd / 233280) * m--);
      const t = a[m]; a[m] = a[i]; a[i] = t;
    }
    return a;
  }

  /* Build a bracket pool of `size` (default 8) UNIQUE restaurants from prefs.
     prefs = { city, cuisines:[], budget, diet }
     Returns { picks:[8], toppedUp:bool, size }  */
  function buildPool(prefs, size) {
    size = size || 8;
    let pool = DB.filter(r => r.city === prefs.city);
    // hard filter: dietary
    if (prefs.diet && prefs.diet !== "none") {
      const dietPool = pool.filter(r => r.diets.includes(prefs.diet));
      if (dietPool.length >= size) pool = dietPool; // else relax (keep full pool)
    }
    const wantCuisines = (prefs.cuisines && prefs.cuisines.length) ? prefs.cuisines : null;
    const budget = prefs.budget && prefs.budget !== "any" ? parseInt(prefs.budget, 10) : null;

    // score: cuisine match (big) + budget fit + rating tiebreak
    const scored = pool.map(r => {
      let score = 0;
      if (wantCuisines && wantCuisines.includes(r.cuisine)) score += 100;
      if (budget) score += (r.price <= budget) ? 20 : -8 * (r.price - budget);
      score += r.rating * 2;
      score += seed(r.id + prefs.city) * 3; // jitter for variety
      return { r, score, match: !!(wantCuisines && wantCuisines.includes(r.cuisine)) };
    }).sort((a, b) => b.score - a.score);

    const picks = scored.slice(0, size).map(x => x.r);
    const matchCount = scored.slice(0, size).filter(x => x.match).length;
    const toppedUp = !!wantCuisines && matchCount < size;

    // largest power of 2 <= picks.length, capped at size, min 2
    let n = 2;
    while (n * 2 <= picks.length && n * 2 <= size) n *= 2;
    const finalPicks = shuffle(picks.slice(0, n), seed(prefs.city + (prefs.cuisines || []).join("") + prefs.diet + prefs.budget));
    return { picks: finalPicks, toppedUp, size: n };
  }

  window.WTE_DATA = { CITIES, CUISINES, DIETS, BUDGETS, DB, buildPool };
})();
