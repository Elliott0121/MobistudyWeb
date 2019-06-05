export default {
  values: [ 'steps', 'weight', 'height', 'activity', 'heart_rate', 'heart_rate.variability', 'calories', 'distance' ],
  valueToString (v) {
    if (v === 'steps') return 'Steps'
    if (v === 'weight') return 'Weight'
    if (v === 'height') return 'Height'
    if (v === 'activity') return 'Activity'
    if (v === 'heart_rate') return 'Heart rate'
    if (v === 'heart_rate.variability') return 'Heart Rate Variability (iPhones only)'
    if (v === 'calories') return 'Calories'
    if (v === 'distance') return 'Distance'
  },
  stringToValue (s) {
    if (s === 'Steps') return 'steps'
    if (s === 'Weight') return 'weight'
    if (s === 'Height') return 'height'
    if (s === 'Activity') return 'activity'
    if (s === 'Heart rate') return 'heart_rate'
    if (s === 'Heart Rate Variability (iPhones only)') return 'heart_rate.variability'
    if (s === 'Calories') return 'calories'
    if (s === 'Distance') return 'distance'
  },
  allowsAggregated (v) {
    if (v === 'steps') return true
    if (v === 'activity') return true
    if (v === 'calories') return true
    if (v === 'distance') return true
    if (v === 'calories.active') return true
    if (v === 'calories.basal') return true
    if (v === 'duration') return true
    if (v === 'walking') return true
    if (v === 'nutrition') return true
    if (v === 'nutrition.x') return true

    return false
  }
}