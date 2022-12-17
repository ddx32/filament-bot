# Filament inventory Slack bot

A simple, bare-bones Slack bot for retrieving the current inventory status of filamenty 2. jakosti. Built with Deno and deployed with Deno Deploy.

Designed to handle slash command requests on `/get-current` endpoint and to automatically update the default channel on a schedule defined in GitHub actions config file.

## Prerequisites

* `.env` file populated with environment variables for local development
* `deno` binary installed
