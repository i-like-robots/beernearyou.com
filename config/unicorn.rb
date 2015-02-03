# unicorn -E production -c config/unicorn.rb -D

listen '127.0.0.1:8080'

# Preloads an application before forking worker process
preload_app true

# Run workers as the specified user
user 'rails'

# Each worker uses ~25mb of memory. Each worker will serve one client at a time.
worker_processes 4

# Restart any workers that haven't responded in 30 seconds
timeout 30

# Store process ID
pid './tmp/unicorn.pid'

# Write logs to
stderr_path './log/unicorn_sderr.log'
stdout_path './log/unicorn_sdout.log'
