module.exports = {
    rules: [
        {
            stream: 'code review',
            test_topic: function (topic) {
                return /^\s*#\d+\s*$/.test(topic)
            },
            get_message: function (mention_text, silent_mention_text) {
                let msg = `Hi ${mention_text}, thanks for posting here! `;
                msg += `To ensure that this topic is easier to find later, `;
                msg += `we follow the convention to have the topic name contain a short description of the issue as well. `;
                msg += 'For example, `#12345` could be rewritten as `#12345 pgroonga migration failure`. '
                msg += 'Please edit the topic accordingly.';
                msg += '\n\n*(This is an automated message)*.';
                return msg;
            },
        },
        {
            stream: 'test here',
            test_topic: function (topic) {
                return /^\s*#\d+\s*$/.test(topic)
            },
            get_message: function (mention_text, silent_mention_text) {
                let msg = `Hi ${silent_mention_text}, thanks for posting here! `;
                msg += `To ensure that this topic is easier to find later, `;
                msg += `we follow the convention to have the topic name contain a short description of the issue as well. `;
                msg += 'For example, `#12345` could be rewritten as `#12345 pgroonga migration failure`. '
                msg += 'Please edit the topic accordingly.';
                msg += '\n\n*(This is an automated message)*.';
                return msg;
            },
        },
        {
            stream: 'test here',
            test_topic: function (topic) {
                return /^twitter:/.test(topic)
            },
            get_message: function (mention_text, silent_mention_text, topic) {
                topic = topic.replace('twitter:', '').trim();
                let msg = `Heads up ${mention_text}, `;
                msg += `I noticed you are talking about twitter. Please move the conversation to #**twitter>${topic}**. `;
                msg += '\n\n(*This is an automated message*).';
                return msg;
            },
        },
        {
            stream: 'test here',
            test_topic: function (topic) {
                return /^hackernews:/.test(topic)
            },
            get_message: function (mention_text, silent_mention_text, topic) {
                topic = topic.replace('hackernews:', '').trim();
                let msg = `Heads up ${mention_text}, `;
                msg += `I noticed you are talking about hackernews. Please move the conversation to #**hacker news>${topic}**. `;
                msg += '\n\n(*This is an automated message*).';
                return msg;
            },
        },
    ],
    zuliprc: 'zuliprc',
};
