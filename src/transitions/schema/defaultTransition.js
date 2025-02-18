export const defaultTransition = (name, app, CheckPages) =>
{
    const transition = {
        name: name,
        async leave(data)
        {
            const done = this.async();
            const LeaveModule = await import('@transitions/Leave.js');
            new LeaveModule.default(data, done, app);
        },
        async enter(data)
        {
            const EnterModule = await import('@transitions/Enter.js');
            new EnterModule.default(data, CheckPages, app);
        }
    }

    return transition
}