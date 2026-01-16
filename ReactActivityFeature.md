# React `<Activity />` Feature

---

## What is `<Activity />`?

What execution modes are available?

Q: What modes can <Activity /> run in?
A: There are four main modes:

Mode	Description
priority	Executes immediately; ideal for critical operations that must finish first.
async	Executes asynchronously without blocking the main UI thread.
background	Executes opportunistically when resources are free; ideal for preloading or analytics.
scheduled	Executes only when the system is idle; low-priority deferred tasks.
How do nested activities work?

Q: Can I nest <Activity /> components?
A: Yes. Nested Activities run independently, but within the context of their parent. Nesting expresses grouping, not execution order.

<Activity mode="priority">
  {async () => console.log('Critical task')}
  <Activity mode="background">
    {async () => console.log('Background preload')}
  </Activity>
</Activity>


Explanation:

Critical task runs immediately.

Background preload runs concurrently in the background.

No race conditions occur unless you explicitly share state.

How do I preload data safely?

Q: Can <Activity /> be used for preloading API data?
A: Yes. Use background or async modes for safe preloading:

<Activity mode="background">
  {async () => {
    const data = await fetch('/api/dashboard').then(r => r.json());
    console.log('Dashboard preloaded', data);
  }}
</Activity>


Note: Tasks are isolated, so multiple concurrent background preloads won’t cause race conditions.

Can <Activity /> be canceled?

Q: How do I cancel a running <Activity />?
A: Activities can be canceled by tracking their lifecycle with a cancelable wrapper or by using React’s useEffect cleanup:

useEffect(() => {
let active = true;

  <Activity mode="async">
    {async () => {
      const data = await fetch('/api/user');
      if (!active) return;
      setState(data);
    }}
  </Activity>

return () => { active = false };
}, []);

What about performance monitoring?

Q: Can <Activity /> be used for performance tracking?
A: Yes. Background or scheduled Activities are ideal for measuring performance or logging telemetry:

<Activity mode="scheduled">
  {async () => {
    const start = performance.now();
    await fetch('/api/metrics');
    console.log('Metrics loaded in', performance.now() - start, 'ms');
  }}
</Activity>

How to combine multiple activities?

Q: How can multiple <Activity /> components be used together?
A: You can combine activities with different priorities to build a workflow:

<Activity mode="priority">
  {async () => console.log('Load critical data')}
</Activity>

<Activity mode="async">
  {async () => console.log('Load non-critical data')}
</Activity>

<Activity mode="background">
  {async () => console.log('Preload optional assets')}
</Activity>


Critical tasks run first.

Async tasks run concurrently.

Background tasks run opportunistically.