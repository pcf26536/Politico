let token = fetchToken();
if (!userIsAdmin()) redirectTo(root_dir + templates_dir + user_url);