<div align="center">

[![Telegram Group](https://img.shields.io/badge/Group-Telegram-%2333C1FF)](https://t.me/codechatBR)
[![Whatsapp Group](https://img.shields.io/badge/Group-message-%2322BC18)](https://chat.whatsapp.com/HyO8X8K0bAo0bfaeW8bhY5)
![n8n-node-codechat-wapi](https://img.shields.io/npm/v/n8n-nodes-codechat-wapi?label=n8n-nodes-codechat-wapi&logo=codechat)
![License](https://img.shields.io/npm/l/n8n-nodes-codechat-wapi)
[![n8n](https://img.shields.io/badge/n8n-community-F94B72)](https://community.n8n.io/)
![dt](https://img.shields.io/npm/dt/n8n-nodes-codechat-wapi)
![dw](https://img.shields.io/npm/dw/n8n-nodes-codechat-wapi)
![codesize](https://img.shields.io/github/languages/code-size/jrcleber/n8n-codechat-wapi)

</div>

<div align="center"><img src="./assets/cover.png"></div>

# n8n-nodes-codechat-wapi

This is a [N8n](https://community.n8n.io) community node. It allows you to use [WhatsApp Api](https://github.com/code-chat-br/whatsapp-api) which is a stripped down version of the official [CodeChat](https://github.com/code-chat-br) api to communicate with WhatsApp in your workflow.

This node sends the most common types of messages.

# Instalation

1. Go to Settings > Community Nodes, and Click Install a community node.

<div align="center">
	<img src="./assets/settings_community_nodes.png", alt="settings_community_nodes.png">
</div>

2. Enter ```n8n-nodes-codechat-wapi``` in the npm Package Name field. And click Install.

<div align="center">
	<img src="./assets/community_nodes.png", alt="community_nodes">
</div>

3. Once installed, you can use the search bar to add the CodeChat node to your workflow.

<div align="center">
	<img src="./assets/codechat_search_bar.png", alt="codechat_search_bar">
</div>

<div align="center">
	<img src="./assets/resource_send_message.png", alt="resource_send_message">
</div>

# Usage

The node configuration is quite simple, just specify the credentials and use the available operations.

# Credentials

All operations require credentials that are made up of:

1. Instance Name
2. Base URL
3. Authentication that can be of two types: **apikey** or **jwt**, as selected in the [env.yml](https://github.com/code-chat-br/whatsapp-api/blob/main/src/dev-env.yml) file.
	- For jwt pass zero for the expiration parameter. Ex.: EXPIRIN_IN: 0

<div align="center">
	<img src="./assets/codechat_wapi_credentials.png", alt="codechat_wapi_credentials">
</div>

# Resources

This section describes which *WhatsApp API* operations are available on this node.

# Send Message

| Operation           | Method | Credentials required |
| --------------------|--------|----------------------|
| Send Text           | POST   | True                 |
| Send Buttons        | POST   | True                 |
| Send Media          | POST   | True                 |
| Send Location       | POST   | True                 |
| Send Contact        | POST   | True                 |
| Send List           | POST   | True                 |

# Compatibility

Tested on n8n version 0.206.1 and WahtsApp Api version 1.0.0

# Sample Workflow

[workflow-test-codechat-wapi](./workflow-test-codechat-wapi.json)

# License
[MIT](./LICENSE.md)
