module VenueHelper

  def formatted_opening_hours(timeframe)
    hours = timeframe['open'].map do |open|
      open['renderedTime']
    end

    "#{timeframe['days']}: #{hours.join(', ')}"
  end

end
