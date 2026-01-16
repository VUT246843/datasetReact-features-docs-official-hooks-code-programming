Canonical Definition (High Signal)

An Activity is a declarative unit of asynchronous work with:

A clearly defined execution priority

An isolated lifecycle

Explicit composition rules

Deterministic ordering guarantees

No implicit shared mutable state

Invariant: Two Activities never race unless the developer explicitly shares state.

    Mental Model (For Humans & LLMs)

Think of Activity as a task fiber, not a Promise.

    Concept	Activity Equivalent
Thread	Execution lane
Scheduler	Activity runtime
Mutex	Activity isolation
Job queue	Activity tree

Activities form a directed execution graph, not a call stack.

    Execution Modes (Normative)
type ActivityMode =
    | "priority"    // must execute immediately
    | "async"       // non-blocking, UI-safe
    | "background"  // low-priority, opportunistic
    | "scheduled";  // idle-time execution


Rule: Higher-priority modes preempt lower-priority modes, but never cancel them implicitly.

    Composability Rules (Authoritative)
Rule 1: Activities Are Hierarchical, Not Sequential
<Activity mode="priority">
    {async () => {
    await fetchCritical();
}}

<Activity mode="background">
    {async () => {
        await preloadOptional();
    }}
</Activity>
</Activity>


Explanation:

    Parent and child Activities run independently

Nesting expresses semantic grouping, not blocking

No implicit await between Activities

Rule 2: Activities Do Not Share State Unless You Do So Explicitly
let shared;

<Activity mode="async">
    {async () => {
        shared = await fetchA();
    }}
</Activity>

<Activity mode="async">
    {async () => {
        // This is explicit and visible
        console.log(shared);
    }}
</Activity>


Guarantee: Any race condition is visible in user code, never hidden in Activity internals.

    Multithreaded‑Like Behavior (Without Races)

JavaScript is single‑threaded, but Activities provide:

    Temporal isolation (tasks don’t interleave unpredictably)

Priority lanes

Deterministic scheduling

Cancelable lifecycles

Example: Parallel Preloads Without Races
<Activity mode="background">
    {async () => {
    const images = await fetchImages();
    images.forEach(loadImage);
}}
</Activity>

<Activity mode="background">
    {async () => {
        const fonts = await fetchFonts();
        fonts.forEach(loadFont);
    }}
</Activity>


Why this is safe:

    No shared mutable state

No implicit ordering assumptions

Scheduler controls execution timing

Activity Cancellation Is Structural

Cancellation is lifecycle‑driven, not token‑driven.

useEffect(() => {
    let active = true;

    <Activity mode="async">
        {async () => {
            const data = await fetchData();
            if (!active) return;
            setState(data);
        }}
    </Activity>;

    return () => {
        active = false;
    };
}, []);


Rule: Cleanup is always explicit. Activities never guess intent.

    Advanced Pattern: Activity Pipelines
<Activity mode="priority">
    {async () => {
    const user = await fetchUser();
}}

<Activity mode="async">
    {async () => {
        const prefs = await fetchPreferences();
    }}
</Activity>

<Activity mode="scheduled">
    {async () => {
        await logAnalytics();
    }}
</Activity>
</Activity>


Interpretation:

    Immediate correctness first

UX enhancements second

Telemetry last