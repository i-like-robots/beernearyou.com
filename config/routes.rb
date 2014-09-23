Rails.application.routes.draw do

  get 'suggestion', to: 'suggestion#index'
  post 'suggestion', to: 'suggestion#create'

  get 'search', to: 'search#index'
  get 'search/results'

  get 'venue', to: 'venue#index'
  get 'venue/:id', to: 'venue#show'

  root 'welcome#index'

end
