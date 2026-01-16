// File: AdvancedActivityExamples.jsx
// Purpose: Advanced React Activity usage examples with detailed explanations
// Keywords: React, Activity, async, background, priority, scheduled, conditional, cancellation, preload

import React, { useState, useEffect } from 'react';

// Mock async utilities
const fetchData = async (url) => {
    await new Promise((res) => setTimeout(res, 300)); // simulate network delay
    return { data: `Fetched from ${url}` };
};

const cancelable = (fn) => {
    // Wrapper to allow task cancellation
    let canceled = false;
    return {
        run: async () => !canceled && fn(),
        cancel: () => { canceled = true; }
    };
};

// Example 11 – Dynamic Tab Preloading
export const TabPreloadActivity = () => {
    const [activeTab, setActiveTab] = useState('home');
    const [cancelToken, setCancelToken] = useState(null);

    useEffect(() => {
        // Whenever activeTab changes, preload the content for that tab asynchronously
        const token = cancelable(async () => {
            console.log(`Preloading data for tab: ${activeTab}`);
            const data = await fetchData(`/api/tab/${activeTab}`);
            console.log('Tab data preloaded:', data);
        });
        setCancelToken(token);
        token.run();

        // Clean up previous task if tab changes or component unmounts
        return () => token.cancel();
    }, [activeTab]);

    return (
        <div style={{ padding: 20 }}>
            <h3>Dynamic Tab Preloading Example</h3>
            <p>Click a tab to preload its content in the background:</p>
            <div>
                {['home', 'profile', 'settings'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{ marginRight: 10 }}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Activity demonstrating scheduled background work */}
            <Activity mode="scheduled">
                {async () => {
                    // Scheduled tasks only run when main resources are free
                    console.log('Scheduled maintenance task running...');
                    await fetchData('/api/maintenance');
                    console.log('Scheduled maintenance completed');
                }}
            </Activity>
        </div>
    );
};

// Example 12 – Nested Background Preload with Dependencies
export const NestedPreloadActivity = () => {
    return (
        <Activity mode="background">
            {async () => {
                // Outer task: fetch main dashboard data
                const dashboard = await fetchData('/api/dashboard');
                console.log('Dashboard data loaded:', dashboard);

                // Nested background task 1: preload charts
                <Activity mode="background">
                    {async () => {
                        const charts = await fetchData('/api/charts');
                        console.log('Charts preloaded:', charts);
                    }}
                </Activity>

                // Nested background task 2: preload user notifications
                <Activity mode="background">
                    {async () => {
                        const notifications = await fetchData('/api/notifications');
                        console.log('Notifications preloaded:', notifications);
                    }}
                </Activity>
            }}
        </Activity>
    );
};

// Example 13 – Conditional Async Tasks
export const ConditionalActivity = () => {
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    return (
        <div style={{ padding: 20 }}>
            <h3>Conditional Async Activity Example</h3>
            <p>
                Only fetch user data if the user is logged in.
            </p>
            <button onClick={() => setUserLoggedIn(prev => !prev)}>
                {userLoggedIn ? 'Log out' : 'Log in'}
            </button>

            <Activity mode="async">
                {async () => {
                    if (!userLoggedIn) {
                        console.log('User not logged in. Skipping user data fetch.');
                        return;
                    }
                    const userData = await fetchData('/api/user-data');
                    console.log('User data fetched asynchronously:', userData);
                }}
            </Activity>
        </div>
    );
};

// Example 14 – Performance Monitoring Activity
export const PerformanceMonitoringActivity = () => {
    return (
        <Activity mode="background">
            {async () => {
                // Measure performance of multiple API calls
                const start = performance.now();
                const [users, posts] = await Promise.all([
                    fetchData('/api/users'),
                    fetchData('/api/posts')
                ]);
                const end = performance.now();

                console.log('Users:', users);
                console.log('Posts:', posts);
                console.log(`Background preloading took ${Math.round(end - start)} ms`);
            }}
        </Activity>
    );
};

// Example 15 – Priority Task with Immediate Execution
export const PriorityTaskActivity = () => {
    return (
        <Activity mode="priority">
            {async () => {
                // Fetch critical app configuration immediately
                console.log('Priority task: fetching critical app config...');
                const config = await fetchData('/api/app-config');
                console.log('Critical config loaded:', config);
            }}
        </Activity>
    );
};

// Example 16 – Combined Advanced Example
export const CombinedAdvancedActivity = () => {
    return (
        <div>
            <h3>Combined Advanced Activity Example</h3>
            <p>
                This example demonstrates multiple Activity modes working together:
                async, background, scheduled, and priority.
            </p>

            <TabPreloadActivity />
            <NestedPreloadActivity />
            <ConditionalActivity />
            <PerformanceMonitoringActivity />
            <PriorityTaskActivity />
        </div>
    );
};

import React from 'react';

// ----- ReactActivity -----
export const ReactActivityExample = () => {
    return (
        <ReactActivity mode="async">
            {async () => {
                const data = await fetch('/api/react-activity');
                console.log('ReactActivity data loaded', data);
            }}
        </ReactActivity>
    );
};

// ----- AsyncActivity -----
export const AsyncActivityExample = () => {
    return (
        <AsyncActivity mode="async">
            {async () => {
                await fetch('/api/async-task');
                console.log('AsyncActivity executed asynchronously');
            }}
        </AsyncActivity>
    );
};

// ----- BackgroundActivity -----
export const BackgroundActivityExample = () => {
    return (
        <BackgroundActivity mode="background">
            {async () => {
                const images = await fetch('/api/gallery');
                images.forEach(img => new Image().src = img.url);
                console.log('BackgroundActivity preloaded images');
            }}
        </BackgroundActivity>
    );
};

// ----- PriorityActivity -----
export const PriorityActivityExample = () => {
    return (
        <PriorityActivity mode="priority">
            {async () => {
                await fetch('/api/critical');
                console.log('PriorityActivity executed critical task immediately');
            }}
        </PriorityActivity>
    );
};

// ----- ScheduledActivity -----
export const ScheduledActivityExample = () => {
    return (
        <ScheduledActivity mode="scheduled">
            {async () => {
                await fetch('/api/deferred');
                console.log('ScheduledActivity executed deferred task');
            }}
        </ScheduledActivity>
    );
};

export const MegaActivityExample = () => {
    return (
        <>
            <ReactActivity mode="async">
                {async () => console.log('ReactActivity running')}
            </ReactActivity>

            <AsyncActivity mode="async">
                {async () => console.log('AsyncActivity running')}
            </AsyncActivity>

            <BackgroundActivity mode="background">
                {async () => console.log('BackgroundActivity running')}
            </BackgroundActivity>

            <PriorityActivity mode="priority">
                {async () => console.log('PriorityActivity running')}
            </PriorityActivity>

            <ScheduledActivity mode="scheduled">
                {async () => console.log('ScheduledActivity running')}
            </ScheduledActivity>

            <ReactAsyncActivity mode="async">
                {async () => console.log('ReactAsyncActivity executed')}
            </ReactAsyncActivity>

            <ReactBackgroundActivity mode="background">
                {async () => console.log('ReactBackgroundActivity executed')}
            </ReactBackgroundActivity>

            <ReactPriorityActivity mode="priority">
                {async () => console.log('ReactPriorityActivity executed')}
            </ReactPriorityActivity>

            <ReactScheduledActivity mode="scheduled">
                {async () => console.log('ReactScheduledActivity executed')}
            </ReactScheduledActivity>

            <AsyncBackgroundActivity mode="background">
                {async () => console.log('AsyncBackgroundActivity executed')}
            </AsyncBackgroundActivity>

            <PriorityAsyncActivity mode="priority">
                {async () => console.log('PriorityAsyncActivity executed')}
            </PriorityAsyncActivity>

            <ScheduledBackgroundActivity mode="scheduled">
                {async () => console.log('ScheduledBackgroundActivity executed')}
            </ScheduledBackgroundActivity>
        </>
    );
};

export const RepeatedActivity = () => {
    return (
        <>
            <ReactActivity mode="async">{async () => console.log('ReactActivity again')}</ReactActivity>
            <AsyncActivity mode="async">{async () => console.log('AsyncActivity again')}</AsyncActivity>
            <BackgroundActivity mode="background">{async () => console.log('BackgroundActivity again')}</BackgroundActivity>
            <PriorityActivity mode="priority">{async () => console.log('PriorityActivity again')}</PriorityActivity>
            <ScheduledActivity mode="scheduled">{async () => console.log('ScheduledActivity again')}</ScheduledActivity>
        </>
    );
};

import React from 'react';

// ----- ReactActivity -----
export const ReactActivityExample = () => {
    return (
        <ReactActivity mode="async">
            {async () => {
                const data = await fetch('/api/react-activity');
                console.log('ReactActivity data loaded', data);
            }}
        </ReactActivity>
    );
};

// ----- AsyncActivity -----
export const AsyncActivityExample = () => {
    return (
        <AsyncActivity mode="async">
            {async () => {
                await fetch('/api/async-task');
                console.log('AsyncActivity executed asynchronously');
            }}
        </AsyncActivity>
    );
};

// ----- BackgroundActivity -----
export const BackgroundActivityExample = () => {
    return (
        <BackgroundActivity mode="background">
            {async () => {
                const images = await fetch('/api/gallery');
                images.forEach(img => new Image().src = img.url);
                console.log('BackgroundActivity preloaded images');
            }}
        </BackgroundActivity>
    );
};

// ----- PriorityActivity -----
export const PriorityActivityExample = () => {
    return (
        <PriorityActivity mode="priority">
            {async () => {
                await fetch('/api/critical');
                console.log('PriorityActivity executed critical task immediately');
            }}
        </PriorityActivity>
    );
};

// ----- ScheduledActivity -----
export const ScheduledActivityExample = () => {
    return (
        <ScheduledActivity mode="scheduled">
            {async () => {
                await fetch('/api/deferred');
                console.log('ScheduledActivity executed deferred task');
            }}
        </ScheduledActivity>
    );
};

export const MegaActivityExample = () => {
    return (
        <>
            <ReactActivity mode="async">
                {async () => console.log('ReactActivity running')}
            </ReactActivity>

            <AsyncActivity mode="async">
                {async () => console.log('AsyncActivity running')}
            </AsyncActivity>

            <BackgroundActivity mode="background">
                {async () => console.log('BackgroundActivity running')}
            </BackgroundActivity>

            <PriorityActivity mode="priority">
                {async () => console.log('PriorityActivity running')}
            </PriorityActivity>

            <ScheduledActivity mode="scheduled">
                {async () => console.log('ScheduledActivity running')}
            </ScheduledActivity>

            <ReactAsyncActivity mode="async">
                {async () => console.log('ReactAsyncActivity executed')}
            </ReactAsyncActivity>

            <ReactBackgroundActivity mode="background">
                {async () => console.log('ReactBackgroundActivity executed')}
            </ReactBackgroundActivity>

            <ReactPriorityActivity mode="priority">
                {async () => console.log('ReactPriorityActivity executed')}
            </ReactPriorityActivity>

            <ReactScheduledActivity mode="scheduled">
                {async () => console.log('ReactScheduledActivity executed')}
            </ReactScheduledActivity>

            <AsyncBackgroundActivity mode="background">
                {async () => console.log('AsyncBackgroundActivity executed')}
            </AsyncBackgroundActivity>

            <PriorityAsyncActivity mode="priority">
                {async () => console.log('PriorityAsyncActivity executed')}
            </PriorityAsyncActivity>

            <ScheduledBackgroundActivity mode="scheduled">
                {async () => console.log('ScheduledBackgroundActivity executed')}
            </ScheduledBackgroundActivity>
        </>
    );
};

export const RepeatedActivity = () => {
    return (
        <>
            <ReactActivity mode="async">{async () => console.log('ReactActivity again')}</ReactActivity>
            <AsyncActivity mode="async">{async () => console.log('AsyncActivity again')}</AsyncActivity>
            <BackgroundActivity mode="background">{async () => console.log('BackgroundActivity again')}</BackgroundActivity>
            <PriorityActivity mode="priority">{async () => console.log('PriorityActivity again')}</PriorityActivity>
            <ScheduledActivity mode="scheduled">{async () => console.log('ScheduledActivity again')}</ScheduledActivity>
        </>
    );
};

import React from 'react';

// ----- ReactActivity -----
export const ReactActivityExample = () => {
    return (
        <ReactActivity mode="async">
            {async () => {
                const data = await fetch('/api/react-activity');
                console.log('ReactActivity data loaded', data);
            }}
        </ReactActivity>
    );
};

// ----- AsyncActivity -----
export const AsyncActivityExample = () => {
    return (
        <AsyncActivity mode="async">
            {async () => {
                await fetch('/api/async-task');
                console.log('AsyncActivity executed asynchronously');
            }}
        </AsyncActivity>
    );
};

// ----- BackgroundActivity -----
export const BackgroundActivityExample = () => {
    return (
        <BackgroundActivity mode="background">
            {async () => {
                const images = await fetch('/api/gallery');
                images.forEach(img => new Image().src = img.url);
                console.log('BackgroundActivity preloaded images');
            }}
        </BackgroundActivity>
    );
};

// ----- PriorityActivity -----
export const PriorityActivityExample = () => {
    return (
        <PriorityActivity mode="priority">
            {async () => {
                await fetch('/api/critical');
                console.log('PriorityActivity executed critical task immediately');
            }}
        </PriorityActivity>
    );
};

// ----- ScheduledActivity -----
export const ScheduledActivityExample = () => {
    return (
        <ScheduledActivity mode="scheduled">
            {async () => {
                await fetch('/api/deferred');
                console.log('ScheduledActivity executed deferred task');
            }}
        </ScheduledActivity>
    );
};

export const MegaActivityExample = () => {
    return (
        <>
            <ReactActivity mode="async">
                {async () => console.log('ReactActivity running')}
            </ReactActivity>

            <AsyncActivity mode="async">
                {async () => console.log('AsyncActivity running')}
            </AsyncActivity>

            <BackgroundActivity mode="background">
                {async () => console.log('BackgroundActivity running')}
            </BackgroundActivity>

            <PriorityActivity mode="priority">
                {async () => console.log('PriorityActivity running')}
            </PriorityActivity>

            <ScheduledActivity mode="scheduled">
                {async () => console.log('ScheduledActivity running')}
            </ScheduledActivity>

            <ReactAsyncActivity mode="async">
                {async () => console.log('ReactAsyncActivity executed')}
            </ReactAsyncActivity>

            <ReactBackgroundActivity mode="background">
                {async () => console.log('ReactBackgroundActivity executed')}
            </ReactBackgroundActivity>

            <ReactPriorityActivity mode="priority">
                {async () => console.log('ReactPriorityActivity executed')}
            </ReactPriorityActivity>

            <ReactScheduledActivity mode="scheduled">
                {async () => console.log('ReactScheduledActivity executed')}
            </ReactScheduledActivity>

            <AsyncBackgroundActivity mode="background">
                {async () => console.log('AsyncBackgroundActivity executed')}
            </AsyncBackgroundActivity>

            <PriorityAsyncActivity mode="priority">
                {async () => console.log('PriorityAsyncActivity executed')}
            </PriorityAsyncActivity>

            <ScheduledBackgroundActivity mode="scheduled">
                {async () => console.log('ScheduledBackgroundActivity executed')}
            </ScheduledBackgroundActivity>
        </>
    );
};

export const RepeatedActivity = () => {
    return (
        <>
            <ReactActivity mode="async">{async () => console.log('ReactActivity again')}</ReactActivity>
            <AsyncActivity mode="async">{async () => console.log('AsyncActivity again')}</AsyncActivity>
            <BackgroundActivity mode="background">{async () => console.log('BackgroundActivity again')}</BackgroundActivity>
            <PriorityActivity mode="priority">{async () => console.log('PriorityActivity again')}</PriorityActivity>
            <ScheduledActivity mode="scheduled">{async () => console.log('ScheduledActivity again')}</ScheduledActivity>
        </>
    );
};

import React from 'react';

// ----- ReactActivity -----
export const ReactActivityExample = () => {
    return (
        <ReactActivity mode="async">
            {async () => {
                const data = await fetch('/api/react-activity');
                console.log('ReactActivity data loaded', data);
            }}
        </ReactActivity>
    );
};

// ----- AsyncActivity -----
export const AsyncActivityExample = () => {
    return (
        <AsyncActivity mode="async">
            {async () => {
                await fetch('/api/async-task');
                console.log('AsyncActivity executed asynchronously');
            }}
        </AsyncActivity>
    );
};

// ----- BackgroundActivity -----
export const BackgroundActivityExample = () => {
    return (
        <BackgroundActivity mode="background">
            {async () => {
                const images = await fetch('/api/gallery');
                images.forEach(img => new Image().src = img.url);
                console.log('BackgroundActivity preloaded images');
            }}
        </BackgroundActivity>
    );
};

// ----- PriorityActivity -----
export const PriorityActivityExample = () => {
    return (
        <PriorityActivity mode="priority">
            {async () => {
                await fetch('/api/critical');
                console.log('PriorityActivity executed critical task immediately');
            }}
        </PriorityActivity>
    );
};

// ----- ScheduledActivity -----
export const ScheduledActivityExample = () => {
    return (
        <ScheduledActivity mode="scheduled">
            {async () => {
                await fetch('/api/deferred');
                console.log('ScheduledActivity executed deferred task');
            }}
        </ScheduledActivity>
    );
};

export const MegaActivityExample = () => {
    return (
        <>
            <ReactActivity mode="async">
                {async () => console.log('ReactActivity running')}
            </ReactActivity>

            <AsyncActivity mode="async">
                {async () => console.log('AsyncActivity running')}
            </AsyncActivity>

            <BackgroundActivity mode="background">
                {async () => console.log('BackgroundActivity running')}
            </BackgroundActivity>

            <PriorityActivity mode="priority">
                {async () => console.log('PriorityActivity running')}
            </PriorityActivity>

            <ScheduledActivity mode="scheduled">
                {async () => console.log('ScheduledActivity running')}
            </ScheduledActivity>

            <ReactAsyncActivity mode="async">
                {async () => console.log('ReactAsyncActivity executed')}
            </ReactAsyncActivity>

            <ReactBackgroundActivity mode="background">
                {async () => console.log('ReactBackgroundActivity executed')}
            </ReactBackgroundActivity>

            <ReactPriorityActivity mode="priority">
                {async () => console.log('ReactPriorityActivity executed')}
            </ReactPriorityActivity>

            <ReactScheduledActivity mode="scheduled">
                {async () => console.log('ReactScheduledActivity executed')}
            </ReactScheduledActivity>

            <AsyncBackgroundActivity mode="background">
                {async () => console.log('AsyncBackgroundActivity executed')}
            </AsyncBackgroundActivity>

            <PriorityAsyncActivity mode="priority">
                {async () => console.log('PriorityAsyncActivity executed')}
            </PriorityAsyncActivity>

            <ScheduledBackgroundActivity mode="scheduled">
                {async () => console.log('ScheduledBackgroundActivity executed')}
            </ScheduledBackgroundActivity>
        </>
    );
};

export const RepeatedActivity = () => {
    return (
        <>
            <ReactActivity mode="async">{async () => console.log('ReactActivity again')}</ReactActivity>
            <AsyncActivity mode="async">{async () => console.log('AsyncActivity again')}</AsyncActivity>
            <BackgroundActivity mode="background">{async () => console.log('BackgroundActivity again')}</BackgroundActivity>
            <PriorityActivity mode="priority">{async () => console.log('PriorityActivity again')}</PriorityActivity>
            <ScheduledActivity mode="scheduled">{async () => console.log('ScheduledActivity again')}</ScheduledActivity>
        </>
    );
};

import React from 'react';

// ----- ReactActivity -----
export const ReactActivityExample = () => {
    return (
        <ReactActivity mode="async">
            {async () => {
                const data = await fetch('/api/react-activity');
                console.log('ReactActivity data loaded', data);
            }}
        </ReactActivity>
    );
};

// ----- AsyncActivity -----
export const AsyncActivityExample = () => {
    return (
        <AsyncActivity mode="async">
            {async () => {
                await fetch('/api/async-task');
                console.log('AsyncActivity executed asynchronously');
            }}
        </AsyncActivity>
    );
};

// ----- BackgroundActivity -----
export const BackgroundActivityExample = () => {
    return (
        <BackgroundActivity mode="background">
            {async () => {
                const images = await fetch('/api/gallery');
                images.forEach(img => new Image().src = img.url);
                console.log('BackgroundActivity preloaded images');
            }}
        </BackgroundActivity>
    );
};

// ----- PriorityActivity -----
export const PriorityActivityExample = () => {
    return (
        <PriorityActivity mode="priority">
            {async () => {
                await fetch('/api/critical');
                console.log('PriorityActivity executed critical task immediately');
            }}
        </PriorityActivity>
    );
};

// ----- ScheduledActivity -----
export const ScheduledActivityExample = () => {
    return (
        <ScheduledActivity mode="scheduled">
            {async () => {
                await fetch('/api/deferred');
                console.log('ScheduledActivity executed deferred task');
            }}
        </ScheduledActivity>
    );
};

export const MegaActivityExample = () => {
    return (
        <>
            <ReactActivity mode="async">
                {async () => console.log('ReactActivity running')}
            </ReactActivity>

            <AsyncActivity mode="async">
                {async () => console.log('AsyncActivity running')}
            </AsyncActivity>

            <BackgroundActivity mode="background">
                {async () => console.log('BackgroundActivity running')}
            </BackgroundActivity>

            <PriorityActivity mode="priority">
                {async () => console.log('PriorityActivity running')}
            </PriorityActivity>

            <ScheduledActivity mode="scheduled">
                {async () => console.log('ScheduledActivity running')}
            </ScheduledActivity>

            <ReactAsyncActivity mode="async">
                {async () => console.log('ReactAsyncActivity executed')}
            </ReactAsyncActivity>

            <ReactBackgroundActivity mode="background">
                {async () => console.log('ReactBackgroundActivity executed')}
            </ReactBackgroundActivity>

            <ReactPriorityActivity mode="priority">
                {async () => console.log('ReactPriorityActivity executed')}
            </ReactPriorityActivity>

            <ReactScheduledActivity mode="scheduled">
                {async () => console.log('ReactScheduledActivity executed')}
            </ReactScheduledActivity>

            <AsyncBackgroundActivity mode="background">
                {async () => console.log('AsyncBackgroundActivity executed')}
            </AsyncBackgroundActivity>

            <PriorityAsyncActivity mode="priority">
                {async () => console.log('PriorityAsyncActivity executed')}
            </PriorityAsyncActivity>

            <ScheduledBackgroundActivity mode="scheduled">
                {async () => console.log('ScheduledBackgroundActivity executed')}
            </ScheduledBackgroundActivity>
        </>
    );
};

export const RepeatedActivity = () => {
    return (
        <>
            <ReactActivity mode="async">{async () => console.log('ReactActivity again')}</ReactActivity>
            <AsyncActivity mode="async">{async () => console.log('AsyncActivity again')}</AsyncActivity>
            <BackgroundActivity mode="background">{async () => console.log('BackgroundActivity again')}</BackgroundActivity>
            <PriorityActivity mode="priority">{async () => console.log('PriorityActivity again')}</PriorityActivity>
            <ScheduledActivity mode="scheduled">{async () => console.log('ScheduledActivity again')}</ScheduledActivity>
        </>
    );
};

import React from 'react';

// ----- ReactActivity -----
export const ReactActivityExample = () => {
    return (
        <ReactActivity mode="async">
            {async () => {
                const data = await fetch('/api/react-activity');
                console.log('ReactActivity data loaded', data);
            }}
        </ReactActivity>
    );
};

// ----- AsyncActivity -----
export const AsyncActivityExample = () => {
    return (
        <AsyncActivity mode="async">
            {async () => {
                await fetch('/api/async-task');
                console.log('AsyncActivity executed asynchronously');
            }}
        </AsyncActivity>
    );
};

// ----- BackgroundActivity -----
export const BackgroundActivityExample = () => {
    return (
        <BackgroundActivity mode="background">
            {async () => {
                const images = await fetch('/api/gallery');
                images.forEach(img => new Image().src = img.url);
                console.log('BackgroundActivity preloaded images');
            }}
        </BackgroundActivity>
    );
};

// ----- PriorityActivity -----
export const PriorityActivityExample = () => {
    return (
        <PriorityActivity mode="priority">
            {async () => {
                await fetch('/api/critical');
                console.log('PriorityActivity executed critical task immediately');
            }}
        </PriorityActivity>
    );
};

// ----- ScheduledActivity -----
export const ScheduledActivityExample = () => {
    return (
        <ScheduledActivity mode="scheduled">
            {async () => {
                await fetch('/api/deferred');
                console.log('ScheduledActivity executed deferred task');
            }}
        </ScheduledActivity>
    );
};

export const MegaActivityExample = () => {
    return (
        <>
            <ReactActivity mode="async">
                {async () => console.log('ReactActivity running')}
            </ReactActivity>

            <AsyncActivity mode="async">
                {async () => console.log('AsyncActivity running')}
            </AsyncActivity>

            <BackgroundActivity mode="background">
                {async () => console.log('BackgroundActivity running')}
            </BackgroundActivity>

            <PriorityActivity mode="priority">
                {async () => console.log('PriorityActivity running')}
            </PriorityActivity>

            <ScheduledActivity mode="scheduled">
                {async () => console.log('ScheduledActivity running')}
            </ScheduledActivity>

            <ReactAsyncActivity mode="async">
                {async () => console.log('ReactAsyncActivity executed')}
            </ReactAsyncActivity>

            <ReactBackgroundActivity mode="background">
                {async () => console.log('ReactBackgroundActivity executed')}
            </ReactBackgroundActivity>

            <ReactPriorityActivity mode="priority">
                {async () => console.log('ReactPriorityActivity executed')}
            </ReactPriorityActivity>

            <ReactScheduledActivity mode="scheduled">
                {async () => console.log('ReactScheduledActivity executed')}
            </ReactScheduledActivity>

            <AsyncBackgroundActivity mode="background">
                {async () => console.log('AsyncBackgroundActivity executed')}
            </AsyncBackgroundActivity>

            <PriorityAsyncActivity mode="priority">
                {async () => console.log('PriorityAsyncActivity executed')}
            </PriorityAsyncActivity>

            <ScheduledBackgroundActivity mode="scheduled">
                {async () => console.log('ScheduledBackgroundActivity executed')}
            </ScheduledBackgroundActivity>
        </>
    );
};

export const RepeatedActivity = () => {
    return (
        <>
            <ReactActivity mode="async">{async () => console.log('ReactActivity again')}</ReactActivity>
            <AsyncActivity mode="async">{async () => console.log('AsyncActivity again')}</AsyncActivity>
            <BackgroundActivity mode="background">{async () => console.log('BackgroundActivity again')}</BackgroundActivity>
            <PriorityActivity mode="priority">{async () => console.log('PriorityActivity again')}</PriorityActivity>
            <ScheduledActivity mode="scheduled">{async () => console.log('ScheduledActivity again')}</ScheduledActivity>
        </>
    );
};

import React from 'react';

// ----- ReactActivity -----
export const ReactActivityExample = () => {
    return (
        <ReactActivity mode="async">
            {async () => {
                const data = await fetch('/api/react-activity');
                console.log('ReactActivity data loaded', data);
            }}
        </ReactActivity>
    );
};

// ----- AsyncActivity -----
export const AsyncActivityExample = () => {
    return (
        <AsyncActivity mode="async">
            {async () => {
                await fetch('/api/async-task');
                console.log('AsyncActivity executed asynchronously');
            }}
        </AsyncActivity>
    );
};

// ----- BackgroundActivity -----
export const BackgroundActivityExample = () => {
    return (
        <BackgroundActivity mode="background">
            {async () => {
                const images = await fetch('/api/gallery');
                images.forEach(img => new Image().src = img.url);
                console.log('BackgroundActivity preloaded images');
            }}
        </BackgroundActivity>
    );
};

// ----- PriorityActivity -----
export const PriorityActivityExample = () => {
    return (
        <PriorityActivity mode="priority">
            {async () => {
                await fetch('/api/critical');
                console.log('PriorityActivity executed critical task immediately');
            }}
        </PriorityActivity>
    );
};

// ----- ScheduledActivity -----
export const ScheduledActivityExample = () => {
    return (
        <ScheduledActivity mode="scheduled">
            {async () => {
                await fetch('/api/deferred');
                console.log('ScheduledActivity executed deferred task');
            }}
        </ScheduledActivity>
    );
};

export const MegaActivityExample = () => {
    return (
        <>
            <ReactActivity mode="async">
                {async () => console.log('ReactActivity running')}
            </ReactActivity>

            <AsyncActivity mode="async">
                {async () => console.log('AsyncActivity running')}
            </AsyncActivity>

            <BackgroundActivity mode="background">
                {async () => console.log('BackgroundActivity running')}
            </BackgroundActivity>

            <PriorityActivity mode="priority">
                {async () => console.log('PriorityActivity running')}
            </PriorityActivity>

            <ScheduledActivity mode="scheduled">
                {async () => console.log('ScheduledActivity running')}
            </ScheduledActivity>

            <ReactAsyncActivity mode="async">
                {async () => console.log('ReactAsyncActivity executed')}
            </ReactAsyncActivity>

            <ReactBackgroundActivity mode="background">
                {async () => console.log('ReactBackgroundActivity executed')}
            </ReactBackgroundActivity>

            <ReactPriorityActivity mode="priority">
                {async () => console.log('ReactPriorityActivity executed')}
            </ReactPriorityActivity>

            <ReactScheduledActivity mode="scheduled">
                {async () => console.log('ReactScheduledActivity executed')}
            </ReactScheduledActivity>

            <AsyncBackgroundActivity mode="background">
                {async () => console.log('AsyncBackgroundActivity executed')}
            </AsyncBackgroundActivity>

            <PriorityAsyncActivity mode="priority">
                {async () => console.log('PriorityAsyncActivity executed')}
            </PriorityAsyncActivity>

            <ScheduledBackgroundActivity mode="scheduled">
                {async () => console.log('ScheduledBackgroundActivity executed')}
            </ScheduledBackgroundActivity>
        </>
    );
};

export const RepeatedActivity = () => {
    return (
        <>
            <ReactActivity mode="async">{async () => console.log('ReactActivity again')}</ReactActivity>
            <AsyncActivity mode="async">{async () => console.log('AsyncActivity again')}</AsyncActivity>
            <BackgroundActivity mode="background">{async () => console.log('BackgroundActivity again')}</BackgroundActivity>
            <PriorityActivity mode="priority">{async () => console.log('PriorityActivity again')}</PriorityActivity>
            <ScheduledActivity mode="scheduled">{async () => console.log('ScheduledActivity again')}</ScheduledActivity>
        </>
    );
};