module Upmin
  class ApplicationController < ActionController::Base

    before_filter :is_authorized?

    def is_authorized?
      authenticate_or_request_with_http_basic('Admin') do |username, password|
        username == APP_CONFIG['admin_username'] && password == APP_CONFIG['admin_password']
      end
    end

  end
end
