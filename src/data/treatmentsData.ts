import { TreatmentInfo } from '../types';

export const TREATMENTS_DATA: TreatmentInfo[] = [
  {
    id: 'treatment-tomato-early-blight',
    diseaseName: 'Tomato Early Blight',
    affectedCrops: ['Tomato', 'Potato', 'Eggplant'],
    category: 'Fungal',
    severity: 'Moderate',
    symptoms: [
      'Concentric dark brown to black rings (target-like pattern) on older lower leaves',
      'Yellow halos surrounding the necrotic spots',
      'Premature leaf defoliation starting from bottom upwards',
      'Dark sunken lesions on stems and fruit stem end'
    ],
    immediateActions: [
      'Remove and safely discard severely spotted lower leaves using clean pruners',
      'Do not compost infected plant debris; dispose of it away from cultivation rows',
      'Avoid overhead watering that splashes soil fungi onto lower foliage',
      'Mulch soil around tomato bases with clean straw or plastic to create a soil splash barrier'
    ],
    agriculturalPractices: [
      'Maintain at least 45 to 60 cm spacing between plants to enhance air circulation and speed up morning leaf drying',
      'Stake or trellis tomato vines to keep all foliage off damp soil',
      'Practice a minimum 3-year crop rotation with non-solanaceous crops (e.g., corn, beans, brassicas)',
      'Water strictly at ground level or via drip irrigation early in the morning'
    ],
    preventionSteps: [
      'Select certified disease-free seeds and certified resistant cultivars',
      'Disinfect pruning tools with 70% isopropyl alcohol or diluted disinfectant between beds',
      'Apply preventive organic copper-based or bio-fungicide sprays prior to anticipated humid rainy spells',
      'Thoroughly remove all post-harvest crop residues before winter/dry season'
    ],
    safetyPrecautions: [
      'Always read and adhere strictly to product container labels for any authorized protective spray',
      'Wear protective gloves, eye goggles, and a clean respirator/mask when mixing agricultural sprays',
      'Observe the mandatory Pre-Harvest Interval (PHI) before picking fruit for consumption or sale',
      'Store all crop protection products in original labelled containers out of reach of children and livestock'
    ],
    expertAdvice: 'Contact your local agricultural extension agent or agronomist if yellowing spreads past 30% of foliage within 48 hours despite initial sanitation.'
  },
  {
    id: 'treatment-potato-late-blight',
    diseaseName: 'Potato Late Blight',
    affectedCrops: ['Potato', 'Tomato'],
    category: 'Fungal',
    severity: 'Severe',
    symptoms: [
      'Water-soaked pale green to dark brown irregular lesions on leaves and stems',
      'White cottony fungal down on leaf undersides during moist or humid mornings',
      'Rapidly collapsing blackened foliage with a foul damp smell in severe outbreaks',
      'Brown, dry, granular rot extending below the tuber skin'
    ],
    immediateActions: [
      'Immediately isolate infected patches and inspect neighbouring rows',
      'Prune and bag severely infected vines on dry days to prevent windborne spore spread',
      'Cease overhead sprinkler irrigation immediately; switch to furrow or drip',
      'Hill up soil around potato ridges to shield developing tubers from washing spores'
    ],
    agriculturalPractices: [
      'Ensure proper drainage to eliminate puddles and stagnant moisture in furrows',
      'Allow ample space between planting ridges (75–90 cm) for brisk wind drying',
      'Destroy any volunteer potato plants or cull piles around field borders before planting season'
    ],
    preventionSteps: [
      'Plant exclusively certified disease-tested seed potatoes',
      'Select cultivars with verified resistance to local Phytophthora infestans strains',
      'Apply preventive bio-protective or approved contact fungicides before heavy fog and rain',
      'Cut and destroy haulms (vines) 10–14 days before harvest to harden skins and prevent tuber infection'
    ],
    safetyPrecautions: [
      'Never apply chemical treatments in windy conditions to prevent drift to adjacent water sources',
      'Follow strictly recommended re-entry intervals (REI) before working in treated plots',
      'Keep protective equipment washed and clean after each field operation'
    ],
    expertAdvice: 'Late Blight spreads extremely fast under cool wet weather (15–22°C). Alert your regional agricultural officer immediately if widespread stem rot is seen.'
  },
  {
    id: 'treatment-rice-blast',
    diseaseName: 'Rice Blast',
    affectedCrops: ['Rice'],
    category: 'Fungal',
    severity: 'Severe',
    symptoms: [
      'Spindle or diamond-shaped lesions with grayish-white centers and dark brown borders on leaves',
      'Collar rot at the junction of leaf blade and sheath',
      'Neck blast causing panicles to turn white, break, and drop grains before filling (blank heads)',
      'Premature lodging of the rice crop in nutrient-heavy areas'
    ],
    immediateActions: [
      'Immediately drain standing water temporarily (if in early tillering) to reduce leaf moisture',
      'Halt all excessive top-dressing with quick-release nitrogenous fertilizers',
      'Inspect flag leaves and panicle emergence daily for diamond-shaped lesions',
      'Apply recommended protective bio-formulations or registered blast sprays at boot leaf stage'
    ],
    agriculturalPractices: [
      'Avoid high density seedling transplantation; ensure standard row spacing',
      'Apply balanced potassium and silicon fertilizer to strengthen cellular leaf resistance',
      'Maintain clean bunds free of weed grasses that harbor Pyricularia oryzae spores'
    ],
    preventionSteps: [
      'Treat rice seeds with recommended hot water soaking or certified biocontrol inoculants before sowing',
      'Plant diverse blast-resistant paddy varieties suited to your ecological zone',
      'Burn or compost stubble safely away from seedbeds after harvest'
    ],
    safetyPrecautions: [
      'Never spray near aquaculture channels or fish ponds linked to paddy fields',
      'Ensure spray applicators wear waterproof rubber boots, aprons, and face shields',
      'Comply with certified withholding periods before harvesting rice grains'
    ],
    expertAdvice: 'Panicle neck blast can cause total yield loss. Seek urgent guidance from local rice research station scientists upon detecting neck lesions.'
  },
  {
    id: 'treatment-corn-leaf-blight',
    diseaseName: 'Northern Corn Leaf Blight',
    affectedCrops: ['Corn', 'Field Corn', 'Sweet Corn'],
    category: 'Fungal',
    severity: 'Moderate',
    symptoms: [
      'Long, elliptical cigar-shaped grayish-green to tan lesions (2.5 to 15 cm long) on leaves',
      'Lesions that develop dark fuzzy fungal spores during periods of high humidity',
      'Extensive leaf scorching starting on bottom leaves and progressing to the ear leaf',
      'Reduced cob filling and stunted grain weight'
    ],
    immediateActions: [
      'Scout lower leaves across multiple zones of the field to determine infection percentage',
      'Ensure soil drainage is unobstructed in low-lying field hollows',
      'Avoid entering damp fields in the morning to prevent dragging fungal spores to healthy rows'
    ],
    agriculturalPractices: [
      'Practice 2-year crop rotation with non-host crops such as soybeans, pulses, or sunflower',
      'Deep till crop debris after harvest to accelerate decomposition of overwintering fungi',
      'Balance soil nitrogen and potassium levels to promote strong stalk and leaf cuticle growth'
    ],
    preventionSteps: [
      'Choose corn hybrids with proven multi-gene resistance to Exserohilum turcicum',
      'Plant at uniform recommended plant populations to avoid overly dense microclimates',
      'Monitor early vegetative stages (V8 to silking) for timely preventive field care'
    ],
    safetyPrecautions: [
      'Do not apply foliar sprays during peak midday heat to prevent leaf scorch and user heat exhaustion',
      'Dispose of wash-water away from irrigation ditches and groundwater borewells'
    ],
    expertAdvice: 'If lesions appear on or above the ear leaf before tassel emergence, consult an agronomist regarding economic threshold intervention.'
  },
  {
    id: 'treatment-apple-scab',
    diseaseName: 'Apple Scab',
    affectedCrops: ['Apple', 'Pear'],
    category: 'Fungal',
    severity: 'Moderate',
    symptoms: [
      'Olive-green to velvety dark brown circular spots on foliage',
      'Puckered, curled, and prematurely yellowing leaves that drop in mid-season',
      'Corky, rough, cracked lesions on apple fruit surfaces making fruit unmarketable',
      'Stunted terminal shoot growth and twig lesions'
    ],
    immediateActions: [
      'Rake and destroy fallen orchard leaves in autumn to eliminate primary spore reservoirs',
      'Prune dense canopy branches during dormancy to let sunlight and drying winds penetrate',
      'Apply approved dormant lime sulfur or protective horticultural mineral oils before bud break'
    ],
    agriculturalPractices: [
      'Maintain an open-vase or central leader tree structure with adequate branch spacing',
      'Shred fallen autumn leaves with a flail mower or spray 5% urea to hasten leaf breakdown',
      'Avoid overhead orchard sprinkler systems; use under-tree micro-sprinklers'
    ],
    preventionSteps: [
      'Plant scab-resistant apple varieties (e.g., Enterprise, Liberty, Prima, GoldRush)',
      'Track spring wetness hours after rain to predict Venturia inaequalis spore discharge',
      'Apply preventative protective organic sprays at green tip through petal fall'
    ],
    safetyPrecautions: [
      'Never spray blooming trees to protect honeybees and native orchard pollinators',
      'Wear protective eye gear when spraying high tree branches'
    ],
    expertAdvice: 'Orchard disease management relies on early spring prevention. Consult your horticultural extension agent for local scab degree-day alerts.'
  },
  {
    id: 'treatment-pepper-bacterial-spot',
    diseaseName: 'Pepper Bacterial Spot',
    affectedCrops: ['Pepper', 'Tomato'],
    category: 'Bacterial',
    severity: 'Moderate',
    symptoms: [
      'Small, circular, water-soaked dark brown spots on leaves with faint yellow margins',
      'Lesions that turn necrotic, crack in the center, and cause significant leaf drop',
      'Raised rough, wart-like brown spots on pepper fruit surfaces',
      'Sunscald on exposed fruit resulting from defoliation'
    ],
    immediateActions: [
      'Never touch or weed around pepper plants while leaves are wet with dew or rain',
      'Immediately remove and destroy heavily infested seedlings from nursery trays',
      'Switch immediately to ground furrow or drip irrigation to keep canopy dry'
    ],
    agriculturalPractices: [
      'Enforce 2-year rotation with non-solanaceous crops such as cereals or legumes',
      'Apply straw mulch between beds to limit rain splash transmission of bacteria',
      'Maintain balanced nitrogen fertilization to avoid lush, tender foliage that easily infects'
    ],
    preventionSteps: [
      'Plant only certified pathogen-free pepper seeds and inspected nursery seedlings',
      'Hot-water treat seeds (50°C for 25 minutes) before sowing if seed source is untested',
      'Apply preventative copper bactericide combined with mancozeb as recommended by local authorities'
    ],
    safetyPrecautions: [
      'Adhere strictly to personal protective equipment (PPE) guidelines during copper handling',
      'Avoid repeated excessive copper applications to prevent soil heavy-metal accumulation'
    ],
    expertAdvice: 'Bacterial spot can rapidly destroy nursery stock. Consult an agricultural plant clinic if seedlings show water-soaked spots on cotyledons.'
  },
  {
    id: 'treatment-healthy-maintenance',
    diseaseName: 'Healthy Crop (No Disease Detected)',
    affectedCrops: ['Tomato', 'Potato', 'Rice', 'Wheat', 'Corn', 'Apple', 'Pepper', 'Cucumber'],
    category: 'Healthy Management',
    severity: 'None',
    symptoms: [
      'Vibrant green, uniform leaf coloration without chlorotic yellowing or necrotic spots',
      'Strong, turgid stem growth and healthy vascular tissue',
      'Clean root structure with vigorous white root tips and healthy flowering/fruiting',
      'Normal leaf expansion and natural plant architecture'
    ],
    immediateActions: [
      'Continue current balanced irrigation routine; avoid waterlogging or drought stress',
      'Maintain regular scouting schedule (inspect plant tops, undersides, and stems weekly)',
      'Keep field borders and row middles free of invasive weeds that harbor insects and viral vectors'
    ],
    agriculturalPractices: [
      'Apply well-rotted organic compost or balanced bio-fertilizer according to soil test recommendations',
      'Mulch root zones to conserve soil moisture, regulate root temperature, and prevent soil splash',
      'Ensure good airflow through appropriate spacing and timely suckering/pruning'
    ],
    preventionSteps: [
      'Install yellow sticky traps or pheromone traps to monitor pest populations before they cause damage',
      'Rotate crops annually to break persistent soilborne disease cycles',
      'Record rainfall and temperature to anticipate weather conditions favorable to local fungi'
    ],
    safetyPrecautions: [
      'Regularly sanitize farm equipment, pruners, and seedling trays to maintain clean biosecurity',
      'Store harvested produce in cool, dry, ventilated crates away from direct sunlight'
    ],
    expertAdvice: 'Maintain proactive farm records and contact your local agricultural extension service for seasonal pest forecasts and soil health testing.'
  }
];

export function getTreatmentForDisease(diseaseName: string, cropHint?: string): TreatmentInfo {
  const normalized = diseaseName.toLowerCase();
  
  const found = TREATMENTS_DATA.find(t => 
    normalized.includes(t.diseaseName.toLowerCase()) || 
    t.diseaseName.toLowerCase().includes(normalized)
  );

  if (found) return found;

  // Check by crop match if disease not found
  if (cropHint) {
    const cropMatch = TREATMENTS_DATA.find(t => 
      t.affectedCrops.some(c => c.toLowerCase() === cropHint.toLowerCase())
    );
    if (cropMatch) return cropMatch;
  }

  // Fallback to general healthy or first
  return TREATMENTS_DATA[0];
}
