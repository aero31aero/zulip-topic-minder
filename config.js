module.exports = {
    rules: [
        {
            stream: 'bot testing',
            test_topic: function(topic) {
                return /^\s*#\d+\s*$/.test(topic)
            },
            get_message: function(mention_text, silent_mention_text) {
                let msg = `Heads up ${silent_mention_text}, `;
                msg += `to ensure that this topic is easier to search for later, `;
                msg += `the topic name should contain a short description of the issue you mentioned.`;
                msg += '\n\nFor example, `#12345` could be rewritten as `#12345 pgroonga migration failure`. '
                msg += 'Please edit the topic accordingly. ';
                msg += '*(This is an automated message)*';
                return msg;
            }
        },
        {
            stream: 'test here',
            test_topic: function(topic) {
                return /^twitter:/.test(topic)
            },
            get_message: function(mention_text, silent_mention_text) {
                let msg = `Heads up ${mention_text}, `;
                msg += `I noticed you are talking about twitter. Please move the conversation to #**twitter**. `;
                msg += '(*This is an automated message*).';
                return msg;
            }
        }
    ],
    zuliprc: 'topicrc',
};
