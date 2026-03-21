# n8n Workflow Engineer — Quality Checklist

- [ ] Templates checked before custom build
- [ ] All API connections configured and tested
- [ ] Error handling on every workflow (retry + fallback + notification)
- [ ] Logging enabled
- [ ] Happy path tested with test data
- [ ] Error cases tested (API failure, bad data)
- [ ] Edge cases tested (empty inputs, rate limits)
- [ ] Human-in-the-loop for outbound comms (draft mode)
- [ ] Documentation complete (purpose, trigger, connections, monitoring)
- [ ] Execution budget estimated vs client limit
- [ ] No credentials hardcoded — all in credential manager
- [ ] Delivery Architect notified of completion
