module Upmin
  class ApplicationController < ActionController::Base

    before_filter :is_authorized?

    def is_authorized?
      authenticate_or_request_with_http_basic('Admin') do |user, pass|
        user == ENV['ADMIN_USERNAME'] && pass == ENV['ADMIN_PASSWORD']
      end
    end

  end
end
