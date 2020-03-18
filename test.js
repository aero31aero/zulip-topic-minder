const assert = require('assert').strict;
const config = require('./config');
const get_message_content = require('./process');
const rules = config.rules;

const assert_reply = (stream, topic, message_contains) => {
	const content = get_message_content(rules, stream, topic, 'Sender', 1);
	console.log(`testing "#${stream}>${topic}"`);
	if (message_contains) {
		assert(content.includes(message_contains));
	} else {
		assert(!content);
	}
};

assert_reply('code review', '#123', 'we follow the convention to have the topic name');
assert_reply('code review', '#123 some description');
