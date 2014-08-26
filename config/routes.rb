Rails.application.routes.draw do

  get 'venue', to: 'venue#index'
  get 'venue/:id', to: 'venue#show'

  root 'welcome#index'

end
