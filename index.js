const zulip = require('zulip-js');
const path = require('path');
const config = require('./config');
const zuliprc = path.resolve(config.zuliprc);

const get_message_content = (rules, stream, topic, sender_full_name, sender_id) => {
    const current_rules = rules.filter(e => e.stream === stream);
    const rule_to_apply = current_rules.find(rule => rule.test_topic(topic));
    if (!rule_to_apply) return;
    const mention_text = `@**${sender_full_name}|${sender_id}**`
    const silent_mention_text = `@_**${sender_full_name}|${sender_id}**`
    const message = rule_to_apply.get_message(mention_text, silent_mention_text, topic);
    return message;
};

zulip({ zuliprc }).then(z => {
    const is_first_message_in_topic = async (event) => {
        if (!event || event.type !== 'message') {
            return false;
        }
        const msg = event.message;
        if (msg.sender_email === z.config.username) {
            return false;
        }
        if (msg.type !== 'stream') return false;
        const stream = msg.display_recipient;
        const topic = msg.subject;
        let narrow = [
            {"operator": "stream", "operand": stream},
            {"operator": "topic", "operand": topic.replace(/#/g, '%23')},
        ];
        const params = {
            num_before: 0,
            num_after: 1,
            anchor: 10,
            narrow,
        };
        const res = await z.messages.retrieve(params);
        if (res.result !== 'success') return false;
        const msgs = res.messages;
        return msgs.length > 0 && msgs[0].id === msg.id;
    };

    const handle_event = async (event) => {
        try {
            if (!await is_first_message_in_topic(event)) {
                return;
            }
            const stream = event.message.display_recipient;
            const topic = event.message.subject;
            const content = get_message_content(config.rules, stream, topic,
                                                event.message.sender_full_name, event.message.sender_id);
            if (!content) {
                return;
            }
            const sendParams = {
                to: stream,
                type: 'stream',
                subject: topic,
                content: content,
            };
            console.log(`topic-minder: Sending message to ${stream} > ${topic}.`);
            z.messages.send(sendParams);
        } catch (e) {
            console.log(e);
        }
    };
    z.callOnEachEvent(handle_event, ['message']);
    console.log(`topic-minder: Listening for ${config.rules.length} rules.`);
});
