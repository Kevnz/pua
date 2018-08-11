import Link from '../src/ui/components/link';
import React from 'react';
import { action } from '@storybook/addon-actions';
import history from '../src/ui/history';
import { linkTo } from '@storybook/addon-links';
import { storiesOf } from '@storybook/react';
storiesOf('Link', module)
  .add('with text', () => (
    <Link href="/linker" history={history}>
      Hello Link
    </Link>
  ))
  .add('with some emoji', () => (
    <Link href="/💯" history={history}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Link>
  ));
