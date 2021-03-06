export const submissionInfo = [
  'Submission must be in English language.',
  "We don't accept anything related to adult contents.",
  'We review and approve/reject submissions.',
  'We might edit submissions info to be consistent.',
];

interface IMessage {
  [key: string]: {
    text: string;
    title: string;
    type: 'error' | 'success' | 'pending';
  };
}

export const getAuthMessages = (payload: string): IMessage => ({
  error: {
    text: payload || "Couldn't login. Please try again later.",
    title: 'Error',
    type: 'error',
  },
  success: {
    text: 'You have logged in successfully.',
    title: `Welcome ${payload}.`,
    type: 'success',
  },
});

export const getSubmitEntryMessages = (
  error?: string,
  reject_reason?: string
): IMessage => ({
  active: {
    text: 'Entry is already submitted and approved.',
    title: 'Already exists',
    type: 'success',
  },
  error: {
    text: error,
    title: 'Error',
    type: 'error',
  },
  pending: {
    text:
      'Entry is already submitted and is waiting for review. ' +
      'Please check back later.',
    title: 'Under review',
    type: 'pending',
  },
  rejected: {
    text: `Submissions has been rejected. ${
      reject_reason ? ` Reason: "${reject_reason}"` : ''
    }`,
    title: 'Rejected',
    type: 'error',
  },
  success: {
    text:
      'Entry has been submitted successfully and is now waiting for review.',
    title: 'Submitted',
    type: 'success',
  },
});

export const reportMessages: IMessage = {
  error: {
    text: "Couldn't submit the report. Try again later.",
    title: 'Error',
    type: 'error',
  },
  success: {
    text: 'Submitted the report successfully.',
    title: 'Reported',
    type: 'success',
  },
};

export const reportOptions: string[] = [
  'Information is wrong',
  'No longer exists',
  'No longer working (bot)',
  'Not English',
  'Adult/Spam content',
  'Other',
];

export const reportReviewOptions: string[] = [
  'Spam/Advertisement',
  'Not English',
];
