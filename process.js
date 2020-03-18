const get_message_content = (rules, stream, topic, sender_full_name, sender_id) => {
    const current_rules = rules.filter(e => e.stream === stream);
    const rule_to_apply = current_rules.find(rule => rule.test_topic(topic));
    if (!rule_to_apply) return;
    const mention_text = `@**${sender_full_name}|${sender_id}**`
    const silent_mention_text = `@_**${sender_full_name}|${sender_id}**`
    const message = rule_to_apply.get_message(mention_text, silent_mention_text, topic);
    return message;
};

module.exports = get_message_content;