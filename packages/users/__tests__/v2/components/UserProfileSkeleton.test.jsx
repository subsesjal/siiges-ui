import React from 'react';
import { render, screen } from '@testing-library/react';
import UserProfileSkeleton from '../../../v2/components/UserProfileSkeleton';

describe('UserProfileSkeleton', () => {
  it('renders without crashing', () => {
    const { container } = render(<UserProfileSkeleton />);
    expect(container).toBeTruthy();
  });

  it('renders skeleton elements', () => {
    const { container } = render(<UserProfileSkeleton />);
    // MUI Skeleton renders span elements
    const skeletons = container.querySelectorAll('span.MuiSkeleton-root');
    expect(skeletons.length).toBeGreaterThan(0);
  });
});
