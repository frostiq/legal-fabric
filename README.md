# Legal Fabric

Smart contracts factory, that helps you create a customized legal agreement between two parties (customer and implementor) for your case.

## Workflow:
1. One of the parties creates the agreement with next parameters:
   * deadline for the agreement
   * reward for the implementer
   * implementor's deposit
   * 3 addresses of oracles, who will audit the work, done by implementer
   * title of agreement
   * description of agreement
2. Implementer sends a deposit to created agreement
3. Customer sends a reward to created agreement
4. When implementer finish his word, oracles approve the agreement
5. In case of oracle's approval, implementer withdraws all balance from the agreement (reward and deposit). In another case, customer withdraws all the balance.
