import { SeasonalTask } from '../types';

export const SEASONAL_TASKS: SeasonalTask[] = [
  // Hiking
  {
    id: 'st-h1',
    mode: 'hiking',
    month: 'October',
    stage: 'mid',
    title: 'Peak Deciduous Canopy & Leaf Fall',
    details: 'Beech and Sugar Maple crowns shedding; trail tread covered in leaf duff. Watch for hidden wet granite and slick tree roots.',
    idealConditions: 'Dry afternoons; 45°F - 62°F with low humidity',
  },
  {
    id: 'st-h2',
    mode: 'hiking',
    month: 'November',
    stage: 'early',
    title: 'Sub-Alpine Rime Ice & First Snowpack',
    details: 'Above 3,500 ft elevation, summit cairns develop rime ice. Daylight drops rapidly—carry primary & backup light source.',
    idealConditions: 'Traction microspikes required above tree line',
  },
  {
    id: 'st-h3',
    mode: 'hiking',
    month: 'April - May',
    stage: 'early',
    title: 'Spring Thaw & High Water Crossings',
    details: 'Snowmelt engorges mountain streams. Ephemeral waterfalls peak. Avoid muddy trails to protect fragile subalpine soil.',
    idealConditions: 'Check daily USGS stream gauge levels before crossing',
  },

  // Gardening
  {
    id: 'st-g1',
    mode: 'gardening',
    month: 'October',
    stage: 'mid',
    title: 'Hardneck Garlic Planting & Bed Mulching',
    details: 'Sow individual cloves 2-3 inches deep, pointed tip up, spaced 6 inches apart. Cover with 4 inches of shredded straw mulch before hard freeze.',
    idealConditions: 'Soil temperature between 45°F and 50°F',
  },
  {
    id: 'st-g2',
    mode: 'gardening',
    month: 'October',
    stage: 'late',
    title: 'Cold Frame Brassica Transition',
    details: 'Erect cold frames over winter spinach, tatsoi, and kale. Sweetness increases as sugars concentrate after mild frosts.',
    idealConditions: 'Ventilate lids on sunny days exceeding 55°F',
  },
  {
    id: 'st-g3',
    mode: 'gardening',
    month: 'March - April',
    stage: 'early',
    title: 'Indoor Seed Starting & Soil Prep',
    details: 'Start nightshades (peppers, tomatoes) 6-8 weeks before last spring frost date. Test soil temperature with dial probe.',
    idealConditions: 'Heat mat set to 75°F for seedling germination',
  },

  // Birding
  {
    id: 'st-b1',
    mode: 'birding',
    month: 'October',
    stage: 'mid',
    title: 'Waterfowl Arrival & Sparrow Fallout',
    details: 'Fox sparrows, Lincoln sparrows, and white-throated sparrows foraging in low brambles. Northern pintails and ring-necked ducks landing on valley lakes.',
    idealConditions: 'Overcast mornings after cold front passage',
  },
  {
    id: 'st-b2',
    mode: 'birding',
    month: 'November',
    stage: 'early',
    title: 'Winter Irruptive Finch Movements',
    details: 'Watch pine and spruce cones for Pine Siskins, Red Crossbills, and Evening Grosbeaks shifting south from boreal forests.',
    idealConditions: 'Early morning cone canopy surveys',
  },
  {
    id: 'st-b3',
    mode: 'birding',
    month: 'May',
    stage: 'mid',
    title: 'Neotropical Migrant Warbler Peak',
    details: 'Over 25 wood-warbler species passing through flowering oak canopies. Dawn chorus peaks between 5:30 AM and 8:00 AM.',
    idealConditions: 'Warm south winds following night migration',
  },
];
