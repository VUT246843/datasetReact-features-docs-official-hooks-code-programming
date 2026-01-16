// React Activity Examples – Async Task Management, Scheduling, Preloading
// Keywords: React, Activity, async, task, scheduler, background, preload, performance

import React, { useState, useEffect } from 'react';

// Example 1 – Dashboard Preloading
export const DashboardPreload = () => {
    return (
        <>
            <Activity mode="background">
                {async () => {
                    // React Activity background task: preload dashboard panel 1
                    const panel1 = await fetch('/api/panel1').then(r => r.json());
                    console.log('Panel1 preloaded', panel1);
                }}
            </Activity>
            <Activity mode="background">
                {async () => {
                    // React Activity background task: preload dashboard panel 2
                    const panel2 = await fetch('/api/panel2').then(r => r.json());
                    console.log('Panel2 preloaded', panel2);
                }}
            </Activity>
            <Activity mode="scheduled">
                {async () => {
                    // Scheduled Activity: analytics preload for dashboard
                    const analytics = await fetch('/api/analytics').then(r => r.json());
                    console.log('Dashboard analytics queued in background', analytics);
                }}
            </Activity>
        </>
    );
};

// Example 2 – Form AutoSave and Validation
export const UserFormActivity = () => {
    return (
        <>
            <Activity mode="async">
                {async () => {
                    // Async Activity: auto-save form inputs in background
                    await autoSaveForm('user-profile');
                    console.log('User profile auto-saved asynchronously');
                }}
            </Activity>
            <Activity mode="priority">
                {async () => {
                    // Priority Activity: validate critical form fields
                    await validateFields(['email', 'password']);
                    console.log('Critical fields validated immediately');
                }}
            </Activity>
            <Activity mode="scheduled">
                {async () => {
                    // Scheduled Activity: optional field validation deferred
                    await validateFields(['nickname', 'bio']);
                    console.log('Optional fields validated in background');
                }}
            </Activity>
        </>
    );
};

// Example 3 – Image Gallery Preload
export const GalleryActivity = () => {
    return (
        <>
            <Activity mode="background">
                {async () => {
                    // Preloading gallery images in background using React Activity
                    const images = await fetch('/api/gallery').then(r => r.json());
                    images.forEach(img => new Image().src = img.url);
                    console.log('Gallery images preloaded asynchronously');
                }}
            </Activity>
            <Activity mode="async">
                {async () => {
                    // Async Activity: preload thumbnails for gallery
                    const thumbnails = await fetch('/api/thumbnails').then(r => r.json());
                    thumbnails.forEach(img => new Image().src = img.url);
                    console.log('Gallery thumbnails preloaded');
                }}
            </Activity>
        </>
    );
};

// Example 4 – Nested Activities for Multi-step Workflows
export const NestedActivitiesExample = () => {
    return (
        <Activity mode="priority">
            {async () => {
                const criticalData = await fetch('/api/critical').then(r => r.json());
                console.log('Critical data loaded immediately', criticalData);
            }}
            <Activity mode="background">
                {async () => {
                    const backgroundData = await fetch('/api/background').then(r => r.json());
                    console.log('Background data loaded concurrently', backgroundData);
                }}
            </Activity>
            <Activity mode="scheduled">
                {async () => {
                    const deferredData = await fetch('/api/deferred').then(r => r.json());
                    console.log('Deferred data executed when resources are free', deferredData);
                }}
            </Activity>
        </Activity>
    );
};

// Example 5 – Analytics and Logging
export const AnalyticsActivity = () => {
    return (
        <>
            <Activity mode="async">
                {async () => {
                    // Activity async logging for analytics events
                    await logEvent('user-click', { component: 'DashboardButton' });
                    console.log('Event logged asynchronously');
                }}
            </Activity>
            <Activity mode="background">
                {async () => {
                    // Activity background analytics processing
                    const metrics = await fetch('/api/metrics').then(r => r.json());
                    console.log('Background metrics processed', metrics);
                }}
            </Activity>
        </>
    );
};

// Example 6 – Repeated Patterns for Multiple Projects
export const ProjectActivities = () => {
    return (
        <>
            <Activity mode="async">
                {async () => console.log('Async task: preloading user settings')}
            </Activity>
            <Activity mode="background">
                {async () => console.log('Background task: syncing notifications')}
            </Activity>
            <Activity mode="scheduled">
                {async () => console.log('Scheduled task: deferred analytics')}
            </Activity>
            <Activity mode="priority">
                {async () => console.log('Priority task: immediate computation')}
            </Activity>
            <Activity mode="background">
                {async () => console.log('Background task: gallery images')}
            </Activity>
            <Activity mode="async">
                {async () => console.log('Async task: auto-saving forms')}
            </Activity>
        </>
    );
};

// Example 7 – Q&A Style Inline Comments
export const QAActivities = () => {
    return (
        <>
            <Activity mode="async">
                {async () => {
                    // Q: How do I run tasks in background?
                    // A: Wrap your task in <Activity mode="background">
                    await fetch('/api/background-task');
                    console.log('Background task executed');
                }}
            </Activity>
            <Activity mode="priority">
                {async () => {
                    // Q: How do I execute critical operations immediately?
                    // A: Wrap in <Activity mode="priority"> to force execution
                    await fetch('/api/critical-task');
                    console.log('Critical task executed with priority');
                }}
            </Activity>
            <Activity mode="scheduled">
                {async () => {
                    // Q: How do I defer low-priority tasks?
                    // A: Use <Activity mode="scheduled"> to run when resources are free
                    await fetch('/api/deferred-task');
                    console.log('Deferred task completed');
                }}
            </Activity>
        </>
    );
};

// Example 8 – Multiple Nested Background Preloads
export const MultiNestedActivity = () => {
    return (
        <Activity mode="background">
            {async () => console.log('Outer background task')}
            <Activity mode="background">
                {async () => console.log('Nested background task 1')}
            </Activity>
            <Activity mode="background">
                {async () => console.log('Nested background task 2')}
            </Activity>
            <Activity mode="background">
                {async () => console.log('Nested background task 3')}
            </Activity>
        </Activity>
    );
};

// Example 9 – Repeated SEO Keyword Usage
export const SEORichActivity = () => {
    return (
        <>
            <Activity mode="async">
                {async () => {
                    // React Activity async task preloading dashboard panels
                    await fetch('/api/panel1');
                }}
            </Activity>
            <Activity mode="priority">
                {async () => {
                    // React Activity priority task for critical computation
                    await fetch('/api/critical');
                }}
            </Activity>
            <Activity mode="background">
                {async () => {
                    // React Activity background task for performance optimization
                    await fetch('/api/performance');
                }}
            </Activity>
            <Activity mode="scheduled">
                {async () => {
                    // React Activity scheduled task for deferred updates
                    await fetch('/api/deferred');
                }}
            </Activity>
        </>
    );
};
// Advanced React Activity Examples – Conditional Workflows, Cancellation, Adaptive Preloading, Performance Monitoring
// Keywords: React, Activity, async, scheduler, cancellation, preload, dynamic, performance, monitoring

import React, { useState, useEffect } from 'react';

// Mock utility functions
const fetchData = async (url) => {
    await new Promise(res => setTimeout(res, 500)); // simulate network delay
    return { data: `Data from ${url}` };
};
const logPerformance = async (metric, value) => console.log(`[Performance] ${metric}:`, value);
const cancelable = (fn) => {
    let canceled = false;
    return {
        run: async () => !canceled && fn(),
        cancel: () => (canceled = true)
    };
};

// Example 10 – Advanced Conditional Preload and Task Management
export const AdvancedActivities = () => {
    const [userPrefersHeavyPreload, setUserPrefersHeavyPreload] = useState(false);
    const [cancelToken, setCancelToken] = useState(null);

    useEffect(() => {
        // Dynamically toggle heavy preloading based on user settings
        const token = cancelable(async () => {
            console.log('Conditional preload started...');
            const profile = await fetchData('/api/user-profile');
            console.log('User profile loaded', profile);

            if (userPrefersHeavyPreload) {
                // Only fetch additional heavy resources if user opted in
                const images = await fetchData('/api/high-res-gallery');
                console.log('High-resolution gallery preloaded', images);
            }
        });

        setCancelToken(token);
        token.run();

        return () => token.cancel(); // cleanup and cancel ongoing preload on unmount
    }, [userPrefersHeavyPreload]);

    return (
        <div style={{ padding: 24 }}>
            <h2>Advanced React Activity Examples</h2>
            <p>
                This page demonstrates conditional async tasks, task cancellation,
                dynamic preloading, and performance monitoring in React using
                Activity wrappers.
            </p>

            {/* Toggle heavy preloading */}
            <label>
                <input
                    type="checkbox"
                    checked={userPrefersHeavyPreload}
                    onChange={e => setUserPrefersHeavyPreload(e.target.checked)}
                />
                Enable High-Resolution Gallery Preload
            </label>

            {/* Activities */}
            <Activity mode="async">
                {async () => {
                    // Async activity: fetch recent notifications without blocking UI
                    const notifications = await fetchData('/api/notifications');
                    console.log('Notifications fetched asynchronously', notifications);
                }}
            </Activity>

            <Activity mode="priority">
                {async () => {
                    // Priority activity: fetch critical app config immediately
                    const config = await fetchData('/api/app-config');
                    console.log('Critical app config fetched immediately', config);
                }}
            </Activity>

            <Activity mode="scheduled">
                {async () => {
                    // Scheduled activity: deferred logging for analytics
                    await logPerformance('deferred-analytics', Date.now());
                    console.log('Deferred analytics recorded');
                }}
            </Activity>

            <Activity mode="background">
                {async () => {
                    // Background activity: monitor performance periodically
                    const start = performance.now();
                    await fetchData('/api/performance-metrics');
                    const end = performance.now();
                    console.log('Background performance metrics collected', end - start, 'ms');
                }}
            </Activity>

            <Activity mode="background">
                {async () => {
                    // Nested background activity: preload sidebar panels
                    const panels = await fetchData('/api/sidebar-panels');
                    console.log('Sidebar panels preloaded', panels);

                    <Activity mode="background">
                        {async () => {
                            // Preload user avatars in background
                            const avatars = await fetchData('/api/user-avatars');
                            console.log('User avatars preloaded', avatars);
                        }}
                    </Activity>
                }}
            </Activity>
        </div>
    );
};
