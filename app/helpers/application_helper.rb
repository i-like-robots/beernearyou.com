module ApplicationHelper

  def show_search_box
    !(controller_name == 'search' && action_name == 'index')
  end

end
