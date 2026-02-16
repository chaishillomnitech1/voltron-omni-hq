import { getLatestGitHubEventTime, saveGitHubEvent } from '../db-helpers';
import { sendEmailNotification, createGitHubEventEmailTemplate } from '../_core/email';

interface GitHubEventPayload {
  id: string;
  type: string;
  actor: { login: string };
  repo: { name: string; url: string };
  payload: {
    commits?: Array<{ message: string }>;
    pull_request?: { title: string };
    issue?: { title: string };
    release?: { tag_name: string };
  };
  created_at: string;
}

export async function checkGitHubEvents(): Promise<void> {
  const githubToken = process.env.GITHUB_TOKEN;
  const notificationEmail = process.env.NOTIFICATION_EMAIL;

  if (!githubToken) {
    console.warn('[GitHub Watcher] Token not configured');
    return;
  }

  if (!notificationEmail) {
    console.warn('[GitHub Watcher] Notification email not configured');
    return;
  }

  try {
    const response = await fetch('https://api.github.com/user/events', {
      headers: {
        Authorization: `token ${githubToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      console.warn('[GitHub Watcher] API request failed:', response.status);
      return;
    }

    const events: GitHubEventPayload[] = await response.json();
    const lastEventTime = await getLatestGitHubEventTime();

    for (const event of events) {
      const eventTime = new Date(event.created_at).getTime();

      // Skip if we've already processed this event
      if (eventTime <= lastEventTime) continue;

      // Map event type
      let eventType: 'push' | 'pull_request' | 'issue' | 'release' = 'push';
      if (event.type === 'PullRequestEvent') eventType = 'pull_request';
      if (event.type === 'IssuesEvent') eventType = 'issue';
      if (event.type === 'ReleaseEvent') eventType = 'release';

      // Extract title and description
      let title = 'New event';
      let description: string | undefined;

      if (event.payload.commits?.[0]) {
        title = event.payload.commits[0].message.split('\n')[0];
        description = event.payload.commits[0].message;
      } else if (event.payload.pull_request) {
        title = event.payload.pull_request.title;
      } else if (event.payload.issue) {
        title = event.payload.issue.title;
      } else if (event.payload.release) {
        title = `Release ${event.payload.release.tag_name}`;
      }

      const eventData = {
        id: `gh-${event.id}`,
        repository: event.repo.name,
        eventType,
        author: event.actor.login,
        title,
        description,
        url: event.repo.url.replace('api.github.com/repos', 'github.com'),
      };

      // Save to database
      await saveGitHubEvent(eventData);

      // Send email notification
      const emailHtml = createGitHubEventEmailTemplate(eventData);
      const emailSent = await sendEmailNotification(
        notificationEmail,
        `[Voltron] New GitHub Event: ${eventData.repository}`,
        emailHtml
      );

      if (emailSent) {
        console.log(`[GitHub Watcher] Notification sent for ${eventData.repository}`);
      }
    }
  } catch (error) {
    console.error('[GitHub Watcher] Error:', error);
  }
}

/**
 * Start the GitHub watcher job
 * Runs every 5 minutes to check for new events
 */
export function startGitHubWatcher(): NodeJS.Timer {
  console.log('[GitHub Watcher] Started (checking every 5 minutes)');

  // Run immediately on startup
  checkGitHubEvents().catch(console.error);

  // Then run every 5 minutes
  return setInterval(() => {
    checkGitHubEvents().catch(console.error);
  }, 5 * 60 * 1000);
}
