module.exports = {
	tests: {
		standalone_github_issue_number: function (topic) {
            return /^\s*#\d+\s*$/.test(topic)
        },
	},
	responses: {
		standalone_github_issue_number: function (mention_text, silent_mention_text) {
            let msg = `Hi ${mention_text}, thanks for posting here! `;
            msg += `To ensure that this topic is easier to find later, `;
            msg += `we follow the convention to have the topic name contain a short description of the issue as well. `;
            msg += 'For example, `#12345` could be rewritten as `#12345 pgroonga migration failure`. '
            msg += 'Please edit the topic accordingly.';
            msg += '\n\n*(This is an automated message)*.';
            return msg;
        },
	}
}