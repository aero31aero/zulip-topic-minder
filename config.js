const rule_bank = require('./rule_bank');
module.exports = {
    rules: [
        {
            stream: 'code review',
            test_topic: rule_bank.tests.standalone_github_issue_number,
            get_message: rule_bank.responses.standalone_github_issue_number,
        },
        {
            stream: 'test here',
            test_topic: rule_bank.tests.standalone_github_issue_number,
            get_message: rule_bank.responses.standalone_github_issue_number,
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
