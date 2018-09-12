set :application, 'brendari'
set :repo_url, 'git@github.com:infernalmaster/brendari_rails.git'
set :deploy_to, '/home/deploy/brendari'
set :chruby_ruby, 'ruby-2.3.3'
set :nginx_use_ssl, true
set :puma_init_active_record, true
set :linked_files, fetch(:linked_files, []).push('config/mongoid.yml', 'config/secrets.yml')
set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'public/system')
set :keep_releases, 5
