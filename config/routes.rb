Rails.application.routes.draw do

  get 'search', to: 'search#index'
  get 'search/nearby'

  get 'venue', to: 'venue#index'
  get 'venue/:id', to: 'venue#show'

  root 'welcome#index'

end
