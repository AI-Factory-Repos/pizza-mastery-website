const recipes = [
  {
    _id: 'margherita-ny-style',
    name: 'NY-Style Margherita Pizza',
    description: 'The classic New York-style Margherita with a thin, hand-tossed crust that folds in half, topped with San Marzano tomato sauce, fresh mozzarella, and fragrant basil leaves. Crispy on the outside, chewy on the inside — the quintessential slice.',
    pizza_type: 'Margherita',
    style: 'NY-Style',
    prep_time: 90,
    cook_time: 12,
    difficulty: 'Intermediate',
    image_url: '/images/recipes/margherita-ny-style.jpg',
    ingredients: [
      { name: 'Bread flour', amount: '500', unit: 'g' },
      { name: 'Active dry yeast', amount: '7', unit: 'g' },
      { name: 'Warm water (75°F)', amount: '325', unit: 'ml' },
      { name: 'Olive oil', amount: '2', unit: 'tbsp' },
      { name: 'Salt', amount: '10', unit: 'g' },
      { name: 'Sugar', amount: '5', unit: 'g' },
      { name: 'San Marzano crushed tomatoes', amount: '400', unit: 'g' },
      { name: 'Garlic cloves, minced', amount: '3', unit: 'cloves' },
      { name: 'Fresh mozzarella, torn', amount: '250', unit: 'g' },
      { name: 'Fresh basil leaves', amount: '20', unit: 'leaves' },
      { name: 'Extra-virgin olive oil (finishing)', amount: '2', unit: 'tbsp' },
      { name: 'Sea salt flakes', amount: '1', unit: 'tsp' },
      { name: 'Black pepper', amount: '0.5', unit: 'tsp' }
    ]
  },
  {
    _id: 'margherita-deep-dish',
    name: 'Deep Dish Margherita Pizza',
    description: 'A Chicago-style deep dish Margherita layered in reverse — mozzarella first, then chunky crushed tomatoes, crowned with fresh basil. The buttery, almost biscuit-like crust cradles a molten, bubbling interior that is pure comfort food at its finest.',
    pizza_type: 'Margherita',
    style: 'Deep Dish',
    prep_time: 120,
    cook_time: 35,
    difficulty: 'Advanced',
    image_url: '/images/recipes/margherita-deep-dish.jpg',
    ingredients: [
      { name: 'All-purpose flour', amount: '450', unit: 'g' },
      { name: 'Cornmeal', amount: '60', unit: 'g' },
      { name: 'Active dry yeast', amount: '7', unit: 'g' },
      { name: 'Warm water (80°F)', amount: '300', unit: 'ml' },
      { name: 'Unsalted butter, melted', amount: '90', unit: 'g' },
      { name: 'Olive oil (for pan)', amount: '3', unit: 'tbsp' },
      { name: 'Salt', amount: '10', unit: 'g' },
      { name: 'Sugar', amount: '5', unit: 'g' },
      { name: 'Low-moisture mozzarella, sliced', amount: '400', unit: 'g' },
      { name: 'San Marzano whole tomatoes, hand-crushed', amount: '800', unit: 'g' },
      { name: 'Garlic cloves, minced', amount: '4', unit: 'cloves' },
      { name: 'Dried oregano', amount: '1', unit: 'tsp' },
      { name: 'Fresh basil leaves', amount: '15', unit: 'leaves' },
      { name: 'Pecorino Romano, grated', amount: '50', unit: 'g' },
      { name: 'Olive oil', amount: '2', unit: 'tbsp' }
    ]
  },
  {
    _id: 'pepperoni-ny-style',
    name: 'NY-Style Pepperoni Pizza',
    description: 'The undisputed king of the New York pizza shop. A massive, foldable slice loaded with cupped, crispy-edged pepperoni that pools with spiced oil as it bakes. The thin crust is charred at the edges and perfectly chewy beneath the generous cheese pull.',
    pizza_type: 'Pepperoni',
    style: 'NY-Style',
    prep_time: 90,
    cook_time: 14,
    difficulty: 'Intermediate',
    image_url: '/images/recipes/pepperoni-ny-style.jpg',
    ingredients: [
      { name: 'Bread flour', amount: '500', unit: 'g' },
      { name: 'Active dry yeast', amount: '7', unit: 'g' },
      { name: 'Warm water (75°F)', amount: '325', unit: 'ml' },
      { name: 'Olive oil', amount: '2', unit: 'tbsp' },
      { name: 'Salt', amount: '10', unit: 'g' },
      { name: 'Sugar', amount: '5', unit: 'g' },
      { name: 'Crushed tomatoes', amount: '400', unit: 'g' },
      { name: 'Tomato paste', amount: '2', unit: 'tbsp' },
      { name: 'Garlic powder', amount: '1', unit: 'tsp' },
      { name: 'Dried oregano', amount: '1', unit: 'tsp' },
      { name: 'Red pepper flakes', amount: '0.5', unit: 'tsp' },
      { name: 'Low-moisture mozzarella, shredded', amount: '300', unit: 'g' },
      { name: 'Pepperoni slices', amount: '60', unit: 'slices' },
      { name: 'Grated Parmesan', amount: '30', unit: 'g' }
    ]
  },
  {
    _id: 'pepperoni-deep-dish',
    name: 'Deep Dish Pepperoni Pizza',
    description: 'A Chicago deep dish showstopper built for pepperoni lovers. Layers of cheese and generous pepperoni are locked beneath a thick, robust tomato sauce in a tall, buttery crust. Every slice is a hearty, indulgent meal that requires a knife and fork.',
    pizza_type: 'Pepperoni',
    style: 'Deep Dish',
    prep_time: 120,
    cook_time: 40,
    difficulty: 'Advanced',
    image_url: '/images/recipes/pepperoni-deep-dish.jpg',
    ingredients: [
      { name: 'All-purpose flour', amount: '450', unit: 'g' },
      { name: 'Cornmeal', amount: '60', unit: 'g' },
      { name: 'Active dry yeast', amount: '7', unit: 'g' },
      { name: 'Warm water (80°F)', amount: '300', unit: 'ml' },
      { name: 'Unsalted butter, melted', amount: '90', unit: 'g' },
      { name: 'Olive oil (for pan)', amount: '3', unit: 'tbsp' },
      { name: 'Salt', amount: '10', unit: 'g' },
      { name: 'Sugar', amount: '5', unit: 'g' },
      { name: 'Low-moisture mozzarella, sliced', amount: '400', unit: 'g' },
      { name: 'Pepperoni slices', amount: '80', unit: 'slices' },
      { name: 'Crushed tomatoes', amount: '800', unit: 'g' },
      { name: 'Garlic cloves, minced', amount: '4', unit: 'cloves' },
      { name: 'Italian seasoning', amount: '2', unit: 'tsp' },
      { name: 'Fennel seeds', amount: '0.5', unit: 'tsp' },
      { name: 'Grated Parmesan', amount: '50', unit: 'g' },
      { name: 'Red pepper flakes', amount: '0.5', unit: 'tsp' }
    ]
  },
  {
    _id: 'bbq-chicken-ny-style',
    name: 'NY-Style BBQ Chicken Pizza',
    description: 'A California-meets-New York creation with a crispy thin crust topped with smoky BBQ sauce, tender pulled chicken, red onion, and a blend of mozzarella and smoked Gouda. Finished with fresh cilantro for a bright, bold slice that breaks all the classic rules — beautifully.',
    pizza_type: 'BBQ Chicken',
    style: 'NY-Style',
    prep_time: 100,
    cook_time: 14,
    difficulty: 'Intermediate',
    image_url: '/images/recipes/bbq-chicken-ny-style.jpg',
    ingredients: [
      { name: 'Bread flour', amount: '500', unit: 'g' },
      { name: 'Active dry yeast', amount: '7', unit: 'g' },
      { name: 'Warm water (75°F)', amount: '325', unit: 'ml' },
      { name: 'Olive oil', amount: '2', unit: 'tbsp' },
      { name: 'Salt', amount: '10', unit: 'g' },
      { name: 'Sugar', amount: '5', unit: 'g' },
      { name: 'Chicken breasts', amount: '400', unit: 'g' },
      { name: 'Smoky BBQ sauce', amount: '200', unit: 'ml' },
      { name: 'Brown sugar', amount: '1', unit: 'tbsp' },
      { name: 'Apple cider vinegar', amount: '1', unit: 'tbsp' },
      { name: 'Low-moisture mozzarella, shredded', amount: '200', unit: 'g' },
      { name: 'Smoked Gouda, shredded', amount: '100', unit: 'g' },
      { name: 'Red onion, thinly sliced', amount: '1', unit: 'medium' },
      { name: 'Fresh cilantro', amount: '15', unit: 'g' },
      { name: 'Pickled jalapeños (optional)', amount: '20', unit: 'slices' }
    ]
  },
  {
    _id: 'bbq-chicken-deep-dish',
    name: 'Deep Dish BBQ Chicken Pizza',
    description: 'A towering, deeply satisfying deep dish loaded with smoky BBQ chicken, caramelized onions, and a double-cheese blend in a golden cornmeal crust. The BBQ sauce replaces the traditional tomato, creating a rich, sticky, sweet and tangy interior that redefines the deep dish experience.',
    pizza_type: 'BBQ Chicken',
    style: 'Deep Dish',
    prep_time: 130,
    cook_time: 42,
    difficulty: 'Advanced',
    image_url: '/images/recipes/bbq-chicken-deep-dish.jpg',
    ingredients: [
      { name: 'All-purpose flour', amount: '450', unit: 'g' },
      { name: 'Cornmeal', amount: '60', unit: 'g' },
      { name: 'Active dry yeast', amount: '7', unit: 'g' },
      { name: 'Warm water (80°F)', amount: '300', unit: 'ml' },
      { name: 'Unsalted butter, melted', amount: '90', unit: 'g' },
      { name: 'Olive oil (for pan)', amount: '3', unit: 'tbsp' },
      { name: 'Salt', amount: '10', unit: 'g' },
      { name: 'Sugar', amount: '5', unit: 'g' },
      { name: 'Chicken thighs, boneless skinless', amount: '500', unit: 'g' },
      { name: 'Smoky BBQ sauce', amount: '250', unit: 'ml' },
      { name: 'Worcestershire sauce', amount: '1', unit: 'tbsp' },
      { name: 'Garlic powder', amount: '1', unit: 'tsp' },
      { name: 'Smoked paprika', amount: '1', unit: 'tsp' },
      { name: 'Low-moisture mozzarella, sliced', amount: '350', unit: 'g' },
      { name: 'Smoked Gouda, shredded', amount: '150', unit: 'g' },
      { name: 'Red onion, caramelized', amount: '2', unit: 'medium' },
      { name: 'Fresh cilantro', amount: '20', unit: 'g' },
      { name: 'Green onions, sliced', amount: '4', unit: 'stalks' }
    ]
  }
];

const steps = [
  // Margherita NY-Style Steps
  {
    step_number: 1,
    title: 'Activate the Yeast',
    description: 'Combine warm water (75°F/24°C) and sugar in a large bowl. Sprinkle yeast over the surface and let stand for 8–10 minutes until foamy and fragrant. If the yeast does not foam, discard and start again with fresh yeast.',
    image_url: '/images/steps/activate-yeast.jpg',
    recipe_id: 'margherita-ny-style'
  },
  {
    step_number: 2,
    title: 'Mix and Knead the Dough',
    description: 'Add bread flour, salt, and olive oil to the yeast mixture. Mix until a shaggy dough forms, then turn out onto a lightly floured surface. Knead for 10–12 minutes until smooth, elastic, and passes the windowpane test — stretch a small piece thin enough to see light through without tearing.',
    image_url: '/images/steps/knead-dough.jpg',
    recipe_id: 'margherita-ny-style'
  },
  {
    step_number: 3,
    title: 'Cold Ferment the Dough',
    description: 'Divide dough into two equal balls. Coat lightly with olive oil, place in separate zip-lock bags or covered bowls, and refrigerate for at least 24 hours (up to 72 hours). Cold fermentation develops complex flavour and improves texture dramatically.',
    image_url: '/images/steps/cold-ferment.jpg',
    recipe_id: 'margherita-ny-style'
  },
  {
    step_number: 4,
    title: 'Prepare the San Marzano Sauce',
    description: 'Drain San Marzano tomatoes and crush by hand into a bowl. Stir in minced garlic, a pinch of salt, black pepper, and 1 tbsp olive oil. Do not cook the sauce — the raw tomato flavour brightens during baking. Taste and adjust seasoning.',
    image_url: '/images/steps/tomato-sauce.jpg',
    recipe_id: 'margherita-ny-style'
  },
  {
    step_number: 5,
    title: 'Shape the Pizza',
    description: 'Remove dough from refrigerator 2 hours before baking. Place a pizza stone or steel in the oven and preheat to maximum temperature (500–550°F/260–290°C) for at least 1 hour. On a lightly floured surface, stretch the dough ball by hand into a 16–18 inch round, working from the centre outward. Maintain a thicker edge for the crust.',
    image_url: '/images/steps/shape-pizza.jpg',
    recipe_id: 'margherita-ny-style'
  },
  {
    step_number: 6,
    title: 'Assemble and Bake',
    description: 'Transfer stretched dough to a well-floured pizza peel. Spread a thin, even layer of tomato sauce leaving a 1-inch border. Tear fresh mozzarella over the sauce. Slide onto the hot stone and bake 10–12 minutes until crust is blistered and golden and cheese is bubbling with light brown spots.',
    image_url: '/images/steps/bake-pizza.jpg',
    recipe_id: 'margherita-ny-style'
  },
  {
    step_number: 7,
    title: 'Finish and Serve',
    description: 'Remove from oven and immediately scatter fresh basil leaves over the surface. Drizzle with extra-virgin olive oil and sprinkle with sea salt flakes. Let rest 2 minutes, then slice into 8 large NY-style triangles. Fold and enjoy.',
    image_url: '/images/steps/finish-serve.jpg',
    recipe_id: 'margherita-ny-style'
  },

  // Margherita Deep Dish Steps
  {
    step_number: 1,
    title: 'Make the Buttery Cornmeal Dough',
    description: 'Dissolve sugar in warm water, sprinkle yeast, and let bloom 8 minutes. Combine flour and cornmeal in a large bowl. Add the yeast mixture, melted butter, and salt. Mix until combined, then knead 8 minutes until smooth. The dough will be slightly softer than NY-style dough.',
    image_url: '/images/steps/cornmeal-dough.jpg',
    recipe_id: 'margherita-deep-dish'
  },
  {
    step_number: 2,
    title: 'First Rise',
    description: 'Shape dough into a ball, place in an oiled bowl, and cover with plastic wrap. Let rise in a warm spot for 1.5–2 hours until doubled in size. For best results, refrigerate overnight after the first rise.',
    image_url: '/images/steps/first-rise.jpg',
    recipe_id: 'margherita-deep-dish'
  },
  {
    step_number: 3,
    title: 'Prepare the Chunky Tomato Sauce',
    description: 'Hand-crush whole San Marzano tomatoes into a saucepan. Add minced garlic, dried oregano, olive oil, salt, and pepper. Simmer over medium-low heat for 20 minutes until slightly thickened. The sauce should be chunky and robust — this is what tops the pizza, so flavour matters.',
    image_url: '/images/steps/chunky-sauce.jpg',
    recipe_id: 'margherita-deep-dish'
  },
  {
    step_number: 4,
    title: 'Press Dough into the Pan',
    description: 'Generously coat a 12-inch deep-dish pan with olive oil. Press and stretch the dough to cover the bottom and up the sides at least 2 inches high. The dough should be about 1/4 inch thick on the bottom. Let rest 20 minutes while the oven preheats to 425°F (220°C).',
    image_url: '/images/steps/press-pan.jpg',
    recipe_id: 'margherita-deep-dish'
  },
  {
    step_number: 5,
    title: 'Layer the Cheese First',
    description: 'Place sliced low-moisture mozzarella in an even layer covering the entire bottom of the dough. This is the critical deep dish technique — cheese goes on first to prevent the crust from becoming soggy under the heavy sauce.',
    image_url: '/images/steps/cheese-layer.jpg',
    recipe_id: 'margherita-deep-dish'
  },
  {
    step_number: 6,
    title: 'Add Sauce and Bake',
    description: 'Ladle the chunky tomato sauce evenly over the cheese layer. Sprinkle grated Pecorino Romano over the top. Bake at 425°F for 30–35 minutes until the crust is deep golden brown and the sauce is bubbling vigorously. Tent with foil at the 25-minute mark if the top is browning too fast.',
    image_url: '/images/steps/deep-dish-bake.jpg',
    recipe_id: 'margherita-deep-dish'
  },
  {
    step_number: 7,
    title: 'Rest, Garnish, and Slice',
    description: 'Let the pizza rest in the pan for 10 minutes — this is non-negotiable, as the interior is molten and needs time to set. Scatter fresh basil leaves over the sauce. Run a knife around the edge, then lift out and slice into wedges. Serve with a fork and knife.',
    image_url: '/images/steps/deep-dish-slice.jpg',
    recipe_id: 'margherita-deep-dish'
  },

  // Pepperoni NY-Style Steps
  {
    step_number: 1,
    title: 'Prepare the NY Pizza Dough',
    description: 'Dissolve sugar in 325ml warm water (75°F). Sprinkle yeast and let foam for 8 minutes. Mix in bread flour, salt, and olive oil until a cohesive dough forms. Knead 10–12 minutes until silky smooth. Cold ferment in refrigerator for 24–72 hours for optimal flavour and chew.',
    image_url: '/images/steps/ny-dough.jpg',
    recipe_id: 'pepperoni-ny-style'
  },
  {
    step_number: 2,
    title: 'Build the Pepperoni Sauce',
    description: 'Combine crushed tomatoes, tomato paste, garlic powder, dried oregano, and red pepper flakes. Season with salt. This sauce is more concentrated than a Margherita sauce to stand up to the bold pepperoni. Mix well and let the flavours marry for at least 30 minutes.',
    image_url: '/images/steps/pepperoni-sauce.jpg',
    recipe_id: 'pepperoni-ny-style'
  },
  {
    step_number: 3,
    title: 'Temper the Dough and Preheat',
    description: 'Remove dough from refrigerator 2 hours before baking. Place a pizza stone or steel on the top rack of the oven and preheat to 500–550°F (260–290°C) for at least 1 hour. The intense heat is essential for that NY-style undercrust char.',
    image_url: '/images/steps/preheat-stone.jpg',
    recipe_id: 'pepperoni-ny-style'
  },
  {
    step_number: 4,
    title: 'Stretch and Top the Dough',
    description: 'On a floured surface, stretch dough to a 16-inch round. Transfer to a floured peel. Spread a thin layer of sauce to the edge. Add a generous, even layer of shredded mozzarella. Lay pepperoni slices edge-to-edge across the entire pizza — they will cup and crisp in the oven.',
    image_url: '/images/steps/top-pepperoni.jpg',
    recipe_id: 'pepperoni-ny-style'
  },
  {
    step_number: 5,
    title: 'Bake Until Blistered',
    description: 'Slide the pizza onto the hot stone. Bake 12–14 minutes until the crust edge is deeply golden with char spots and the pepperoni edges are crispy and curled upward, forming small cups filled with spiced oil. The cheese should be fully melted with some browned bubbles.',
    image_url: '/images/steps/bake-pepperoni.jpg',
    recipe_id: 'pepperoni-ny-style'
  },
  {
    step_number: 6,
    title: 'Finish with Parmesan and Serve',
    description: 'Transfer to a wire rack and grate Parmesan over the top immediately. Let cool 2 minutes, then cut into 8 large slices. Serve with a shaker of red pepper flakes and dried oregano on the side. Fold the slice in half lengthwise for the authentic NY eating experience.',
    image_url: '/images/steps/serve-pepperoni.jpg',
    recipe_id: 'pepperoni-ny-style'
  },

  // Pepperoni Deep Dish Steps
  {
    step_number: 1,
    title: 'Make the Deep Dish Dough',
    description: 'Bloom yeast in warm water with sugar for 8 minutes. Combine flour, cornmeal, and salt in a large bowl. Add yeast mixture and melted butter. Mix and knead 8 minutes until smooth and slightly tacky. Oil the bowl, cover, and let rise 1.5–2 hours at room temperature.',
    image_url: '/images/steps/deep-dish-dough.jpg',
    recipe_id: 'pepperoni-deep-dish'
  },
  {
    step_number: 2,
    title: 'Prepare the Robust Tomato Sauce',
    description: 'Sauté minced garlic in olive oil over medium heat for 1 minute. Add crushed tomatoes, Italian seasoning, fennel seeds, and red pepper flakes. Season generously with salt and pepper. Simmer 25 minutes, stirring occasionally, until reduced and intensely flavourful. Cool before using.',
    image_url: '/images/steps/robust-sauce.jpg',
    recipe_id: 'pepperoni-deep-dish'
  },
  {
    step_number: 3,
    title: 'Press Dough and Pre-Layer',
    description: 'Oil a 12-inch deep-dish pan thoroughly. Press dough up the sides to create a 2-inch wall. Lay sliced mozzarella across the entire base. Add half the pepperoni directly on the cheese layer — this inner pepperoni layer adds flavour throughout the pizza rather than just on top.',
    image_url: '/images/steps/pre-layer.jpg',
    recipe_id: 'pepperoni-deep-dish'
  },
  {
    step_number: 4,
    title: 'Add Remaining Toppings',
    description: 'Spoon the cooled tomato sauce generously over the pepperoni-cheese layer. Arrange the remaining pepperoni slices in a single layer on top of the sauce. Sprinkle grated Parmesan over everything. Preheat oven to 425°F (220°C) while the assembled pizza rests 15 minutes.',
    image_url: '/images/steps/assemble-deep-dish.jpg',
    recipe_id: 'pepperoni-deep-dish'
  },
  {
    step_number: 5,
    title: 'Bake Low and Slow',
    description: 'Bake at 425°F for 35–40 minutes until the crust is a deep golden brown all the way around, the top pepperoni is crispy, and the internal cheese is fully melted. Insert a knife at the edge — if it comes out hot with no raw dough, it is done. Rest 10 minutes before cutting.',
    image_url: '/images/steps/bake-deep-dish-pep.jpg',
    recipe_id: 'pepperoni-deep-dish'
  },
  {
    step_number: 6,
    title: 'Unmold and Serve',
    description: 'Run a butter knife around the entire edge of the pan to loosen the crust. Using a wide spatula, carefully lift a wedge from the pan onto a plate. The deep dish should hold its shape with cheese pulling into strings. Serve with extra napkins — this is a glorious, messy experience.',
    image_url: '/images/steps/unmold-serve.jpg',
    recipe_id: 'pepperoni-deep-dish'
  },

  // BBQ Chicken NY-Style Steps
  {
    step_number: 1,
    title: 'Prepare the BBQ Chicken',
    description: 'Season chicken breasts with salt, pepper, and a pinch of smoked paprika. Grill or bake at 375°F (190°C) for 20–25 minutes until cooked through. Let cool slightly, then shred or chop into bite-sized pieces. Toss with half the BBQ sauce, brown sugar, and apple cider vinegar. The chicken should be saucy but not drenched.',
    image_url: '/images/steps/bbq-chicken-prep.jpg',
    recipe_id: 'bbq-chicken-ny-style'
  },
  {
    step_number: 2,
    title: 'Prepare the NY Dough',
    description: 'Bloom yeast in 325ml warm water (75°F) with sugar for 8 minutes. Add bread flour, salt, and olive oil. Knead 10–12 minutes until smooth and elastic. Cold ferment in the refrigerator for 24–72 hours. Remove 2 hours before baking and allow to come to room temperature.',
    image_url: '/images/steps/bbq-ny-dough.jpg',
    recipe_id: 'bbq-chicken-ny-style'
  },
  {
    step_number: 3,
    title: 'Prep Toppings and Preheat',
    description: 'Slice red onion very thinly into half-moons. Place pizza stone or steel on the top oven rack and preheat to 500–550°F (260–290°C) for at least 1 hour. Mix shredded mozzarella and smoked Gouda together. The Gouda adds a smokiness that complements the BBQ sauce beautifully.',
    image_url: '/images/steps/bbq-toppings-prep.jpg',
    recipe_id: 'bbq-chicken-ny-style'
  },
  {
    step_number: 4,
    title: 'Stretch and Sauce the Dough',
    description: 'On a lightly floured surface, stretch dough by hand to a 16-inch round. Transfer to a floured pizza peel. Spread the remaining BBQ sauce across the surface, leaving a 1-inch crust border. The BBQ sauce is the base — apply it with more coverage than you would a tomato sauce.',
    image_url: '/images/steps/bbq-sauce-base.jpg',
    recipe_id: 'bbq-chicken-ny-style'
  },
  {
    step_number: 5,
    title: 'Add Toppings and Bake',
    description: 'Scatter the mixed cheese blend evenly over the BBQ sauce. Distribute the BBQ chicken over the cheese. Scatter red onion slices over the top. Slide onto the hot stone and bake 12–14 minutes until the crust is golden with char spots, the cheese is fully melted, and the onions have softened and caramelised slightly.',
    image_url: '/images/steps/bbq-bake.jpg',
    recipe_id: 'bbq-chicken-ny-style'
  },
  {
    step_number: 6,
    title: 'Garnish with Cilantro and Serve',
    description: 'Remove from oven and immediately scatter fresh cilantro leaves across the pizza. Add pickled jalapeños if using. Slice into 8 large triangles and serve immediately. The contrast of hot, smoky pizza against the fresh herb and tangy jalapeño is what makes this pizza memorable.',
    image_url: '/images/steps/bbq-garnish.jpg',
    recipe_id: 'bbq-chicken-ny-style'
  },

  // BBQ Chicken Deep Dish Steps
  {
    step_number: 1,
    title: 'Cook and Shred the Chicken Thighs',
    description: 'Season chicken thighs with garlic powder, smoked paprika, salt, and pepper. Sear in an oven-safe pan over high heat 3 minutes per side for colour, then bake at 375°F (190°C) for 20 minutes. Shred with two forks. Toss shredded chicken with Worcestershire sauce and 150ml BBQ sauce. Reserve remaining sauce for the top.',
    image_url: '/images/steps/bbq-chicken-thigh.jpg',
    recipe_id: 'bbq-chicken-deep-dish'
  },
  {
    step_number: 2,
    title: 'Caramelise the Onions',
    description: 'Slice red onions into thin half-moons. Cook in a heavy pan with 1 tbsp butter and a pinch of salt over medium-low heat for 30–40 minutes, stirring every 5 minutes, until deeply golden and sweet. Do not rush this step — true caramelisation transforms the onions into a jammy, sweet complement to the smoky BBQ flavours.',
    image_url: '/images/steps/caramelise-onions.jpg',
    recipe_id: 'bbq-chicken-deep-dish'
  },
  {
    step_number: 3,
    title: 'Make and Rise the Cornmeal Dough',
    description: 'Bloom yeast in warm water with sugar for 8 minutes. Mix flour, cornmeal, and salt. Add yeast mixture and melted butter. Knead 8 minutes until smooth. Place in an oiled bowl, cover, and let rise 1.5–2 hours until doubled. The cornmeal dough should be golden and slightly nutty-smelling.',
    image_url: '/images/steps/bbq-dd-dough.jpg',
    recipe_id: 'bbq-chicken-deep-dish'
  },
  {
    step_number: 4,
    title: 'Build the Deep Dish Layers',
    description: 'Heavily oil a 12-inch deep-dish pan. Press dough across the bottom and up the sides (2 inches high). Layer sliced mozzarella across the base. Add the BBQ chicken evenly. Scatter caramelised onions over the chicken. Sprinkle smoked Gouda over everything.',
    image_url: '/images/steps/bbq-dd-layers.jpg',
    recipe_id: 'bbq-chicken-deep-dish'
  },
  {
    step_number: 5,
    title: 'Top with BBQ Sauce and Bake',
    description: 'Pour the reserved BBQ sauce generously over the layered toppings — this replaces the traditional tomato sauce and will caramelise on top during baking. Preheat oven to 400°F (205°C). Bake for 38–42 minutes until the crust is deeply golden, the sauce is bubbling and slightly charred at the edges, and the cheese is fully melted throughout.',
    image_url: '/images/steps/bbq-dd-bake.jpg',
    recipe_id: 'bbq-chicken-deep-dish'
  },
  {
    step_number: 6,
    title: 'Rest and Garnish',
    description: 'Allow the pizza to rest in the pan for 10–12 minutes. The BBQ sauce will thicken and the interior will set into sliceable layers. Scatter fresh cilantro and sliced green onions over the top. Unmold carefully and cut into wedges. Serve with extra BBQ sauce and a green salad to cut through the richness.',
    image_url: '/images/steps/bbq-dd-serve.jpg',
    recipe_id: 'bbq-chicken-deep-dish'
  }
];

module.exports = { recipes, steps };
